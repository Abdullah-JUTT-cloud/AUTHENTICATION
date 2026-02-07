import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Abdullah Jutt",
};
// const recipients = [
//     {
//         email: "abdullahjuttjutt910@gmail.com",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending 2nd email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);