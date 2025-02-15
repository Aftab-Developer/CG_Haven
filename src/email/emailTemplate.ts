
export const emailTemplate = (otp:string):string =>`<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6; color: #333;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 30px 0;">
<tr>
    <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="background-color: #2a9df4; padding: 20px; text-align: center;">
                    <h1 style="font-size: 24px; color: #ffffff; margin: 0;">Admin OTP Verification</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 30px; text-align: center;">
                    <p style="font-size: 16px; color: #555555; margin: 0 0 20px;">Your One-Time Password (OTP) is:</p>
                    <div style="display: inline-block; font-size: 36px; font-weight: bold; color: #2a9df4; background-color: #f0f8ff; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">
                       ${otp}
                    </div>
                    <p style="font-size: 14px; color: #888888; margin: 20px 0 0;">This OTP is valid for the next <strong>01 Hour</strong>. Please do not share it with anyone.</p>
                </td>
            </tr>
            <tr>
                <td style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #aaaaaa;">
                    © 2025 Admin Portal | All rights reserved.<br>
                        
                </td>
            </tr>
        </table>
    </td>
</tr>
</table>
</body>`;