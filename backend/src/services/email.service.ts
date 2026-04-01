import Nodemailer from "nodemailer";

const transport = Nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.MAILTRAP_PORT || "2525"),
  auth: {
    user: process.env.MAILTRAP_USER || "",
    pass: process.env.MAILTRAP_PASS || ""
  }
});

export const sendVerificationEmail = async (to: string, code: string, firstName: string) => {
  try {
    const info = await transport.sendMail({
      from: '"IRIS Bank" <hello@irisbank.fr>',
      to: to,
      subject: "Code de vérification - IRIS Bank",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Bienvenue sur IRIS Bank, ${firstName}!</h1>
          <p style="font-size: 16px; color: #555;">
            Merci de vous être inscrit sur IRIS Bank. Pour finaliser votre inscription,
            veuillez utiliser le code de vérification suivant :
          </p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h2 style="font-size: 32px; color: #2563eb; letter-spacing: 5px; margin: 0;">
              ${code}
            </h2>
          </div>
          <p style="font-size: 14px; color: #888;">
            Ce code expirera dans 15 minutes.
          </p>
          <p style="font-size: 14px; color: #888;">
            Si vous n'avez pas demandé ce code, veuillez ignorer cet email.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            © 2026 IRIS Bank. Tous droits réservés.
          </p>
        </div>
      `,
      text: `Bienvenue sur IRIS Bank, ${firstName}!\n\nVotre code de vérification est: ${code}\n\nCe code expirera dans 15 minutes.`,
    });

    console.log("Email de vérification envoyé:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return false;
  }
};
