
export const getVerifyEmailTemplate = (otp: string, name: string) => (
  `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            h2 {
              color: #333333;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 5px;
              color: #4a90e2;
              margin: 20px 0;
            }
            p {
              font-size: 16px;
              color: #555555;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #999999;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🔐 Email Verification</h2>
            <p>Hello, ${name},</p>
            <p>Use the following One-Time Password (OTP) to verify your email address:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
            <p>If you didn’t request this, you can safely ignore this email.</p>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Your App Name. All rights reserved.
            </div>
          </div>
        </body>
      </html>
  `
)
