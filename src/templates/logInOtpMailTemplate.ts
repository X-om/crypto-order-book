export const getLogInOtpMailTemplate = (firstName: string, otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Login OTP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: #000;
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        
        .header p {
            font-size: 14px;
            color: #ccc;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .greeting strong {
            color: #000;
            font-weight: 600;
        }
        
        .description {
            font-size: 14px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .otp-section {
            background: #f9f9f9;
            border: 2px solid #d0d0d0;
            border-radius: 6px;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .otp-label {
            font-size: 11px;
            color: #777;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 12px;
            display: block;
            font-weight: 600;
        }
        
        .otp-code {
            font-size: 36px;
            font-weight: 700;
            color: #000;
            letter-spacing: 8px;
            font-family: 'Monaco', 'Courier New', monospace;
            word-break: break-all;
        }
        
        .otp-expiry {
            font-size: 12px;
            color: #666;
            margin-top: 12px;
            font-weight: 500;
        }
        
        .security-note {
            background: #f0f0f0;
            border-left: 4px solid #000;
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 30px;
            font-size: 13px;
            color: #333;
            line-height: 1.6;
        }
        
        .security-note strong {
            color: #000;
            font-weight: 600;
        }
        
        .footer-text {
            font-size: 13px;
            color: #888;
            line-height: 1.8;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
            margin-top: 30px;
        }
        
        .footer-link {
            color: #000;
            text-decoration: none;
            font-weight: 600;
        }
        
        .footer-link:hover {
            text-decoration: underline;
        }
        
        .divider {
            height: 1px;
            background: #e0e0e0;
            margin: 20px 0;
        }
        
        .support-section {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 13px;
            color: #555;
            border: 1px solid #e0e0e0;
        }
        
        .support-section strong {
            color: #000;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>SECURE ACCESS</h1>
            <p>One-Time Password</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Greeting -->
            <div class="greeting">
                Hi <strong>${firstName}</strong>,
            </div>
            
            <!-- Description -->
            <p class="description">
                We received a login request for your account. Use the OTP below to complete your secure login.
            </p>
            
            <!-- OTP Section -->
            <div class="otp-section">
                <span class="otp-label">One-Time Password</span>
                <div class="otp-code">${otp}</div>
                <p class="otp-expiry">This code expires in 10 minutes</p>
            </div>
            
            <!-- Security Note -->
            <div class="security-note">
                <strong>Security Notice:</strong> Never share this code with anyone. Our team will never ask you for this code.
            </div>
            
            <!-- Support Section -->
            <div class="support-section">
                <strong>Didn't request this?</strong><br>
                If you didn't initiate this login, please ignore this email or <a href="#" class="footer-link">secure your account</a> immediately.
            </div>
            
            <div class="divider"></div>
            
            <!-- Footer Text -->
            <div class="footer-text">
                <p>This is an automated message, please do not reply to this email.</p>
                <p style="margin-top: 12px;">
                    For support, please visit our <a href="#" class="footer-link">Help Center</a> or contact our support team.
                </p>
                <p style="margin-top: 16px; font-size: 12px; color: #999;">
                    © 2025 Your Company. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;