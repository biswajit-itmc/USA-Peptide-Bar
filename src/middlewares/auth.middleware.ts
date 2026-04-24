import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "your_secret_key"; // Jo aapne login me use kiya hai

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Header se token nikaalein (Format: Bearer <token>)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // 2. Token verify karein
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // 3. Check karein ki role 'admin' hai ya nahi
    // Aapke token payload mein "role": "admin" dikh raha hai
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // 4. User data request object mein save karein (Optional)
    (req as any).user = decoded;

    next(); // Sab sahi hai, aage badho
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};