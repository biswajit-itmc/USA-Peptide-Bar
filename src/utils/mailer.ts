import { transporter } from "../config/mailer.js";

export const sendApprovalEmail = async (
  to: string,
  password: string
) => {
  try {
    await transporter.sendMail({
      from: `"USA Peptide Bar" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Account is Approved 🎉",
      html: `
        <h2>Congratulations 🎉</h2>
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
      subject: "Your Application was Rejected ❌",
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