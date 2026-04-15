import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { nombre, email, celular, consulta } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Hotel Convención" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      subject: `Nueva consulta de ${nombre}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e5e5e5;">
          <h2 style="color: #A67C3D; font-size: 24px; margin-bottom: 24px;">Nueva Consulta — Hotel Convención</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 0; color: #888; font-size: 13px; width: 140px;">Nombre</td>
              <td style="padding: 12px 0; color: #111; font-size: 14px;">${nombre}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 0; color: #888; font-size: 13px;">Email</td>
              <td style="padding: 12px 0; color: #111; font-size: 14px;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 0; color: #888; font-size: 13px;">Celular</td>
              <td style="padding: 12px 0; color: #111; font-size: 14px;">${celular}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; font-size: 13px; vertical-align: top;">Consulta</td>
              <td style="padding: 12px 0; color: #111; font-size: 14px; line-height: 1.6;">${consulta}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error enviando contacto:", error);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}