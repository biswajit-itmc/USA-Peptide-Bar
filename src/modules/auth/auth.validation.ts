export interface SignupRetailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: "retail" | "wholesale";
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface SalesRepLoginRequest {
  repId: string;
  password: string;
}

export interface WholesaleApplicationRequest {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  monthlyVolume: number | string;
  repId?: string;
  source?: string;
}

export const authValidation = {
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one special character (!@#$%^&*)");
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  validateSignupRetail(data: SignupRetailRequest): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.firstName?.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName?.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else {
      const passwordValidation = this.validatePassword(data.password);
      if (!passwordValidation.valid) {
        errors.password = passwordValidation.errors[0];
      }
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateLogin(data: LoginRequest): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    if (!data.role || !["retail", "wholesale"].includes(data.role)) {
      errors.role = "Valid role (retail or wholesale) is required";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateAdminLogin(data: AdminLoginRequest): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateSalesRepLogin(data: SalesRepLoginRequest): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.repId?.trim()) {
      errors.repId = "Identity Number (Rep ID) is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  },

  validateWholesaleApplication(data: WholesaleApplicationRequest): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    const monthlyVolumeNumber = typeof data.monthlyVolume === "number"
      ? data.monthlyVolume
      : Number(data.monthlyVolume);

    if (!data.businessName?.trim()) {
      errors.businessName = "Business name is required";
    }

    if (!data.contactName?.trim()) {
      errors.contactName = "Contact name is required";
    }

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!this.validateEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.phone?.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!data.businessType?.trim()) {
      errors.businessType = "Business type is required";
    }

    if (!Number.isFinite(monthlyVolumeNumber) || monthlyVolumeNumber < 1) {
      errors.monthlyVolume = "Monthly volume must be a positive number";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
};
