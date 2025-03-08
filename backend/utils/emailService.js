import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (toEmail, name) => {
  try {
    const response = await resend.emails.send({
      from: "contact@naoladugna.com", 
      to: toEmail,
      subject: "Welcome to Our Platform!",
      html: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <!-- Main Container -->
    <table align="center" width="600" class="container" style="background-color: #ffffff; margin: 20px auto; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <!-- Header Section -->
        <tr>
            <td class="header" style="background-color: #007bff; color: #ffffff; text-align: center; padding: 30px;">
                <h1 style="margin: 0; font-size: 32px; font-weight: bold;">Welcome to TicketFlow!</h1>
                <p style="margin: 10px 0 0; font-size: 18px;">Your ticket management solution is here.</p>
            </td>
        </tr>
        <!-- Hero Image Section -->
      
            <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333333; line-height: 1.6;">Hi ${name}</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.6;">Welcome to <strong>TicketFlow</strong>! We’re excited to help you streamline your ticket management process and boost your team’s productivity.</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.6;">Here’s what you can do with TicketFlow:</p>
                <ul style="font-size: 16px; color: #333333; line-height: 1.6; padding-left: 20px;">
                    <li>🚀 <strong>Organize tickets effortlessly</strong> – Centralize all your requests in one place.</li>
                    <li>🤝 <strong>Get answer seamlessly</strong> – Get answer in hours.</li>
                    <li>⏱️ <strong>Automate Tickets</strong> – Save time and focus on what matters.</li>
                </ul>
                <!-- Call-to-Action Button -->
                <table align="center" style="margin: 20px 0; text-align: center;">
                    <tr>
                        <td>
                            <a href="https://ticket-system-beta-eight.vercel.app/login" class="cta-button" style="display: inline-block; background-color: #007bff; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 4px; transition: background-color 0.3s ease;">Login Here</a>
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; color: #333333; line-height: 1.6;">We’re here to support you every step of the way. If you have any questions, feel free to reach out to our team at <a href="mailto:support@example.com" style="color: #007bff; text-decoration: none;">support@example.com</a>.</p>
              
                <p style="font-size: 16px; color: #333333; line-height: 1.6;">Best regards,</p>
                <p style="font-size: 16px; color: #333333;"><strong>TicketFlow Team</p>
            </td>
        </tr>
        <!-- Footer Section -->
        <tr>
            <td style="background-color: #f4f4f4; text-align: center; padding: 20px; font-size: 14px; color: #666666;">
                <p style="margin: 0;">You are receiving this email because you signed up for TicketFlow.</p>
                
                <p style="margin: 10px 0 0;">© 2025 TicketFlow. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>`,
    });

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
