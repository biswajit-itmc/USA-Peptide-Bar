import { env } from "../config/env.js";
import { transporter } from "../config/mailer.js";

export const sendApprovalEmail = async (

  to: string,
  password: string
) => {
  try {
    await transporter.sendMail({
      from: `"USA Peptide Bar" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Account is Approved",
      html: `
        <h2>Congratulations</h2>
        <p>Your wholesale account has been approved.</p>

        <h3>Login Details:</h3>
        <p><b>Email:</b> ${to}</p>
        <p><b>Password:</b> ${password}</p>

        <p>Please login and change your password after login.</p>

        <br/>
        <p>Thanks,<br/>Team</p>
      `,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
};


export const sendRejectionEmail = async (
  to: string,
  reason: string
) => {
  try {
    await transporter.sendMail({
      from: `"USA Peptide Bar" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Application was Rejected",
      html: `
        <h2>Application Update</h2>
        <p>We regret to inform you that your wholesale application has been rejected.</p>

        <p><b>Reason:</b> ${reason}</p>

        <p>If you believe this was a mistake, feel free to contact support.</p>

        <br/>
        <p>Thanks,<br/>Team</p>
      `,
    });
  } catch (error) {
    console.error("Rejection email failed:", error);
  }
};

export const sendOrderCompletionEmail = async (
  to: string,
  orderId: string | number,
  customerName: string,
  items: any[] = [],
  totalAmount: string | number = 0
) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${parseFloat(item.price).toFixed(2)}</td>
    </tr>
  `).join('');

  try {
    await transporter.sendMail({
      from: `"USA Peptide Bar" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Order #${orderId} - Approved`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #E11D2E;">Order Approved</h2>
          <p>Hello <b>${customerName}</b>,</p>
          <p>Your order <b>#${orderId}</b> has been officially approved. Here are your order details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total Amount:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #E11D2E;">$${parseFloat(totalAmount.toString()).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <p>Thank you for shopping with us!</p>
          <br/>
          <p>Best Regards,<br/><b>Team USA Peptide Bar</b></p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Order approval email failed:", error);
  }
};



export const sendOrderCancellationEmail = async (
  to: string,
  orderId: string | number,
  customerName: string,
  items: any[] = [],
  totalAmount: string | number = 0
) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${parseFloat(item.price).toFixed(2)}</td>
    </tr>
  `).join('');

  try {
    await transporter.sendMail({
      from: `"USA Peptide Bar" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Order #${orderId} - Rejected`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #666;">Order Rejected</h2>
          <p>Hello <b>${customerName}</b>,</p>
          <p>We regret to inform you that your order <b>#${orderId}</b> has been rejected. Here were the order details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; opacity: 0.6;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #eee;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total Amount:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">$${parseFloat(totalAmount.toString()).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <p>If you have any questions, please contact our support team.</p>
          <br/>
          <p>Best Regards,<br/><b>Team USA Peptide Bar</b></p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Order rejection email failed:", error);
  }
};



export const sendResetPasswordEmail = async (
  to: string,
  token: string,
  role: string
) => {
  const resetLink = `${env.frontendUrl}/reset-password?token=${token}&role=${role}`;
  try {

    await transporter.sendMail({
      from: `"USA Peptide Bar" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #E11D2E; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <br/>
        <p>Thanks,<br/>Team USA Peptide Bar</p>
      `,
    });
  } catch (error) {
    console.error("Reset password email failed:", error);
  }
};
