import { Request, Response } from "express";
import * as contactService from "./contact.service.js";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Email format check (simple)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    await contactService.saveMessage({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await contactService.getAllMessages();

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};