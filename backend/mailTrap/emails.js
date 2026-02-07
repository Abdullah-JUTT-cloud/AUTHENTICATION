import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplate.js";
import { mailtrapClient,sender } from "./mail.config.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient=[{email}];
  try {
    const reponse=await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Verify Your Email",
      html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
      category:"Email Verification",
    })
    console.log("Email sent successfully",reponse);
  } catch (error) {
    console.error("Error sending email",error);
    throw new Error(`Failed to send verification email ${error}`);
  }

}