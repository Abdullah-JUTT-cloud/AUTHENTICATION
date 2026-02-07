import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mail.config.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];
  try {
    const reponse = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
      category: "Email Verification",
    })
    console.log("Email sent successfully", reponse);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Failed to send verification email ${error}`);
  }

}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "c14b94ab-14aa-414b-b030-c740e1966a66",
      template_variables: {
        name: name,
        company_info_name: "Abdullah Jutt"
      }
    })
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Failed to send welcome email ${error}`);
  }

}

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    })
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Failed to send password reset email ${error}`);
  }

}

export const sendPasswordResetSuccessEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    })
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Failed to send password reset success email ${error}`);
  }

}

