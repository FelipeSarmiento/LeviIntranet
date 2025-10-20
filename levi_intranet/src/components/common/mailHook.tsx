'use server'
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {FileDownloadInterface} from "@/lib/interfaces/_interfaces";

export async function sendEmail(nombre: string, emailTo: string, file: FileDownloadInterface, subject: string, htmlText: string) {
    const transporter = nodemailer.createTransport({
        host: "smtphost.levi.com",
        port: 25,
        secure: false,
        auth: {
            user: "HRColombia@levi.com",
        },
        tls: {
            ciphers: "SSLv3",
        },
    });

    const archivoBuffer = Buffer.from(await file.blob.arrayBuffer());

    const mailOptions  :  Mail.Options & Partial<SMTPTransport.Options> = {
        from: '"Levi Strauss Colombia" <HRColombia@levi.com>',
        to: emailTo,
        subject: subject,
        html: htmlText,
        attachments: [
            {
                filename: file.fileName + nombre.trim() + file.fileExtension,
                content: archivoBuffer
            }
        ]
    };

    await transporter.sendMail(mailOptions);
}
