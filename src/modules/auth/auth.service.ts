import { db } from "../../db/knex.js";
import { passwordUtils } from "../../utils/password.js";
import { jwtUtils } from "../../utils/jwt.js";
import type { SignupRetailRequest, LoginRequest, AdminLoginRequest, WholesaleApplicationRequest } from "./auth.validation.js";
import { sendApprovalEmail } from "../../utils/mailer.js";
import { sendRejectionEmail } from "../../utils/mailer.js";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role: "retail" | "wholesale";
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UserRecord extends User {
  password_hash: string;
}

export interface WholesaleApplication {
  id: number;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  business_type: string;
  monthly_volume: number;
  source: string | null;
  status: "pending" | "approved" | "rejected";
  rejection_reason: string | null;
  user_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface InsertIdRow {
  id: number;
}

interface AdminRecord extends Admin {
  password_hash: string;
}

export interface SalesRep {
  id: number;
  rep_id: string;
  name: string;
  email: string;
  commission_rate: number;
  role: "sales_rep";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SalesRepRecord extends SalesRep {
  password_hash: string;
}

export const authService = {
  getUserPublicColumns() {
    return [
      "id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "company",
      "role",
      "is_approved",
      "is_active",
      "created_at",
      "updated_at"
    ];
  },

  getAdminPublicColumns() {
    return [
      "id",
      "first_name",
      "last_name",
      "email",
      "created_at",
      "updated_at"
    ];
  },

  getSalesRepPublicColumns() {
    return [
      "id",
      "rep_id",
      "name",
      "email",
      "commission_rate",
      "role",
      "is_active",
      "created_at",
      "updated_at"
    ];
  },

  // Helper: Store refresh token
  async storeRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await db("refresh_tokens").insert({
      user_id: userId,
      token: refreshToken,
      expires_at: expiresAt
    });
  },

  async storeAdminRefreshToken(adminId: number, refreshToken: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db("admin_refresh_tokens").insert({
      admin_id: adminId,
      token: refreshToken,
      expires_at: expiresAt
    });
  },

  async storeSalesRepRefreshToken(repId: number, refreshToken: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db("sales_rep_refresh_tokens").insert({
      rep_id: repId,
      token: refreshToken,
      expires_at: expiresAt
    });
  },

  // Helper: Generate tokens for user
  async generateTokensForUser(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      isApproved: user.is_approved
    };

    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    // Store refresh token in database
    await this.storeRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  },

  async generateTokensForAdmin(admin: Admin): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      userId: admin.id,
      email: admin.email,
      role: "admin" as const,
      isApproved: true
    };

    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    await this.storeAdminRefreshToken(admin.id, refreshToken);

    return { accessToken, refreshToken };
  },

  async generateTokensForRep(rep: SalesRep): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      userId: rep.id,
      email: rep.email,
      role: "sales_rep" as const,
      isApproved: true
    };

    const accessToken = jwtUtils.generateAccessToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken(payload);

    await this.storeSalesRepRefreshToken(rep.id, refreshToken);

    return { accessToken, refreshToken };
  },

  // Retail signup
  async signupRetail(data: SignupRetailRequest): Promise<{ user: User }> {
    // Check if user already exists
    const existingUser = await db("users").where("email", data.email).first();
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Hash password
    const passwordHash = await passwordUtils.hashPassword(data.password);

    // Create user
    const [userId] = await db("users")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        password_hash: passwordHash,
        role: "retail",
        is_approved: true // Retail users are auto-approved
      });

    // Fetch created user
    const user = await db("users")
      .select(this.getUserPublicColumns())
      .where("id", userId)
      .first() as User;

    return { user };
  },

  // Login
  async login(data: LoginRequest): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    // Find user by email and role
    const user = await db("users")
      .where("email", data.email)
      .where("role", data.role)
      .first() as UserRecord | undefined;

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await passwordUtils.comparePassword(
      data.password,
      user.password_hash
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Check if user is active
    if (!user.is_active) {
      throw new Error("Your account has been deactivated. Please contact administrator.");
    }

    // Check if wholesale user is approved
    if (user.role === "wholesale" && !user.is_approved) {
      throw new Error("Your wholesale account is pending approval");
    }

    // Generate both tokens
    const { accessToken, refreshToken } = await this.generateTokensForUser(user);

    const safeUser = await db("users")
      .select(this.getUserPublicColumns())
      .where("id", user.id)
      .first() as User;

    return { user: safeUser, accessToken, refreshToken };
  },

  async adminLogin(data: AdminLoginRequest): Promise<{ admin: Admin; accessToken: string; refreshToken: string }> {
    const admin = await db("admins")
      .where("email", data.email)
      .first() as AdminRecord | undefined;

    if (!admin) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await passwordUtils.comparePassword(data.password, admin.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const { accessToken, refreshToken } = await this.generateTokensForAdmin(admin);
    const safeAdmin = await db("admins")
      .select(this.getAdminPublicColumns())
      .where("id", admin.id)
      .first() as Admin;

    return { admin: safeAdmin, accessToken, refreshToken };
  },

  async repLogin(data: { repId: string; password: string }): Promise<{ rep: SalesRep; accessToken: string; refreshToken: string }> {
    const rep = await db("sales_reps")
      .where("rep_id", data.repId)
      .first() as SalesRepRecord | undefined;

    if (!rep) {
      throw new Error("Invalid Identity Number or password");
    }

    if (!rep.is_active) {
      throw new Error("Your account has been deactivated. Please contact administrator.");
    }

    const isPasswordValid = await passwordUtils.comparePassword(data.password, rep.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid Identity Number or password");
    }

    const { accessToken, refreshToken } = await this.generateTokensForRep(rep);
    const safeRep = await db("sales_reps")
      .select(this.getSalesRepPublicColumns())
      .where("id", rep.id)
      .first() as SalesRep;

    return { rep: safeRep, accessToken, refreshToken };
  },

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Verify refresh token
    const payload = jwtUtils.verifyRefreshToken(refreshToken);

    // Check if token exists in database and not revoked
    const tokenRecord = await db("refresh_tokens")
      .where("token", refreshToken)
      .where("user_id", payload.userId)
      .where("is_revoked", false)
      .first();

    if (!tokenRecord) {
      throw new Error("Invalid or revoked refresh token");
    }

    // Check if token is expired
    if (new Date() > new Date(tokenRecord.expires_at)) {
      throw new Error("Refresh token has expired");
    }

    // Get user
    const user = await db("users")
      .select(this.getUserPublicColumns())
      .where("id", payload.userId)
      .first() as User;
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.is_active) {
      throw new Error("Your account has been deactivated");
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await this.generateTokensForUser(user);

    // Revoke old refresh token
    await db("refresh_tokens").where("id", tokenRecord.id).update({ is_revoked: true });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  async refreshAdminAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = jwtUtils.verifyRefreshToken(refreshToken);

    if (payload.role !== "admin") {
      throw new Error("Invalid admin refresh token");
    }

    const tokenRecord = await db("admin_refresh_tokens")
      .where("token", refreshToken)
      .where("admin_id", payload.userId)
      .where("is_revoked", false)
      .first();

    if (!tokenRecord) {
      throw new Error("Invalid or revoked refresh token");
    }

    if (new Date() > new Date(tokenRecord.expires_at)) {
      throw new Error("Refresh token has expired");
    }

    const admin = await db("admins")
      .select(this.getAdminPublicColumns())
      .where("id", payload.userId)
      .first() as Admin;

    if (!admin) {
      throw new Error("Admin not found");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await this.generateTokensForAdmin(admin);

    await db("admin_refresh_tokens").where("id", tokenRecord.id).update({ is_revoked: true });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  async refreshRepAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = jwtUtils.verifyRefreshToken(refreshToken);

    if (payload.role !== "sales_rep") {
      throw new Error("Invalid sales rep refresh token");
    }

    const tokenRecord = await db("sales_rep_refresh_tokens")
      .where("token", refreshToken)
      .where("rep_id", payload.userId)
      .where("is_revoked", false)
      .first();

    if (!tokenRecord) {
      throw new Error("Invalid or revoked refresh token");
    }

    if (new Date() > new Date(tokenRecord.expires_at)) {
      throw new Error("Refresh token has expired");
    }

    const rep = await db("sales_reps")
      .select(this.getSalesRepPublicColumns())
      .where("id", payload.userId)
      .first() as SalesRep;

    if (!rep) {
      throw new Error("Sales rep not found");
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await this.generateTokensForRep(rep);

    await db("sales_rep_refresh_tokens").where("id", tokenRecord.id).update({ is_revoked: true });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  // Submit wholesale application
  async submitWholesaleApplication(data: WholesaleApplicationRequest): Promise<WholesaleApplication> {
    const monthlyVolume = typeof data.monthlyVolume === "number"
      ? data.monthlyVolume
      : Number(data.monthlyVolume) || 0;
    const source = data.source?.trim() || null;

    // Check if email already has a pending/approved application
    const existingApplication = await db("wholesale_applications")
      .where("email", data.email)
      .whereIn("status", ["pending", "approved"])
      .first();

    if (existingApplication) {
      throw new Error("You already have a pending or approved application");
    }

    // Look up sales rep if ID provided
    let salesRepId = null;
    if (data.repId?.trim()) {
      const rep = await db("sales_reps").where("rep_id", data.repId.trim()).first();
      if (rep) {
        salesRepId = rep.id;
      }
    }

    // Create application
    const [applicationId] = await db("wholesale_applications")
      .insert({
        business_name: data.businessName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        business_type: data.businessType,
        monthly_volume: monthlyVolume,
        source,
        sales_rep_id: salesRepId,
        status: "pending"
      });

    // Fetch created application
    const application = await db("wholesale_applications")
      .where("id", applicationId)
      .first() as WholesaleApplication;

    return application;
  },

  // Get user by ID
  async getUserById(userId: number): Promise<User | undefined> {
    const user = await db("users")
      .select(this.getUserPublicColumns())
      .where("id", userId)
      .first() as User | undefined;
    return user;
  },

  async getAdminById(adminId: number): Promise<Admin | undefined> {
    const admin = await db("admins")
      .select(this.getAdminPublicColumns())
      .where("id", adminId)
      .first() as Admin | undefined;

    return admin;
  },

  // Get all wholesale applications (admin)
  async getAllWholesaleApplications(status?: string): Promise<WholesaleApplication[]> {
    let query = db("wholesale_applications");

    if (status) {
      query = query.where("status", status);
    }

    const applications = await query.orderBy("created_at", "desc") as WholesaleApplication[];
    return applications;
  },

  // Get wholesale application by ID (admin)
  async getWholesaleApplicationById(applicationId: number): Promise<WholesaleApplication | undefined> {
    const application = await db("wholesale_applications")
      .where("id", applicationId)
      .first() as WholesaleApplication | undefined;

    return application;
  },

  // Approve wholesale application (admin)
  async approveWholesaleApplication(applicationId: number, password: string): Promise<User> {
    const application = await this.getWholesaleApplicationById(applicationId);

    if (!application) {
      throw new Error("Application not found");
    }

    if (application.status !== "pending") {
      throw new Error("Only pending applications can be approved");
    }

    // Check if user already exists for this email
    let user = await db("users")
      .select(this.getUserPublicColumns())
      .where("email", application.email)
      .first() as User | undefined;

    if (!user) {
      // Create new wholesale user
      const passwordHash = await passwordUtils.hashPassword(password);
      const [userId] = await db("users")
        .insert({
          first_name: application.contact_name.split(" ")[0] || application.contact_name,
          last_name: application.contact_name.split(" ").slice(1).join(" ") || "User",
          email: application.email,
          phone: application.phone,
          company: application.business_name,
          password_hash: passwordHash,
          role: "wholesale",
          sales_rep_id: (application as any).sales_rep_id,
          is_approved: true
        });

      user = await db("users")
        .select(this.getUserPublicColumns())
        .where("id", userId)
        .first() as User;
    } else if (user.role !== "wholesale") {
      throw new Error("User with this email already exists as a different role");
    } else {
      // Update existing user to approve
      await db("users").where("id", user.id).update({ is_approved: true });
      user = await db("users")
        .select(this.getUserPublicColumns())
        .where("id", user.id)
        .first() as User;
    }

    // Update application status
    await db("wholesale_applications")
      .where("id", applicationId)
      .update({
        status: "approved",
        user_id: user.id
      });

      await sendApprovalEmail(application.email, password);

    return user;
  },

  // Reject wholesale application (admin)
  async rejectWholesaleApplication(applicationId: number, rejectionReason: string): Promise<WholesaleApplication> {
    const application = await this.getWholesaleApplicationById(applicationId);

    if (!application) {
      throw new Error("Application not found");
    }

    if (application.status !== "pending") {
      throw new Error("Only pending applications can be rejected");
    }

    await db("wholesale_applications")
      .where("id", applicationId)
      .update({
        status: "rejected",
        rejection_reason: rejectionReason
      });

      await sendRejectionEmail(application.email, rejectionReason);

    const updatedApplication = await db("wholesale_applications")
      .where("id", applicationId)
      .first() as WholesaleApplication;

    return updatedApplication;
  },

  async getAllUsers(): Promise<User[]> {
    const users = await db("users")
      .select([
        "id", "first_name", "last_name", "email", "phone", 
        "company", "role", "is_approved", "created_at", "updated_at"
      ])
      .orderBy("created_at", "desc") as User[];
    return users;
  },

  async updateProfile(userId: number, data: { first_name?: string; last_name?: string; phone?: string }): Promise<User> {
    await db("users")
      .where("id", userId)
      .update({
        ...data,
        updated_at: db.fn.now()
      });

    const user = await this.getUserById(userId);
    if (!user) throw new Error("User not found after update");
    return user;
  }
};
