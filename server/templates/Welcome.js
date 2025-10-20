const Welcome = (name) => (`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Dhanvarsha Electricals</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: #f7fafc;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
            color: white;
            padding: 48px 40px;
            text-align: center;
        }
        
        .logo {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.025em;
        }
        
        .tagline {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 48px 40px;
        }
        
        .welcome-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .welcome-title {
            color: #1e293b;
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 16px;
            letter-spacing: -0.025em;
        }
        
        .user-name {
            color: #1e40af;
            font-weight: 700;
        }
        
        .welcome-subtitle {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 32px;
            font-weight: 500;
        }
        
        .welcome-message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 32px;
            line-height: 1.7;
            text-align: left;
        }
        
        .highlight-section {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #1e40af;
            border-radius: 8px;
            padding: 32px;
            margin: 32px 0;
        }
        
        .highlight-title {
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .highlight-text {
            color: #475569;
            line-height: 1.7;
            font-size: 15px;
        }
        
        .benefits-list {
            margin: 32px 0;
        }
        
        .benefits-title {
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .benefit-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
            padding: 8px 0;
        }
        
        .benefit-bullet {
            width: 6px;
            height: 6px;
            background: #1e40af;
            border-radius: 50%;
            margin-top: 8px;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .benefit-text {
            color: #475569;
            font-size: 15px;
            line-height: 1.6;
        }
        
        .closing-section {
            margin: 40px 0;
        }
        
        .closing-message {
            font-size: 16px;
            color: #475569;
            line-height: 1.7;
            margin-bottom: 24px;
        }
        
        .contact-info {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 24px;
            margin: 32px 0;
        }
        
        .contact-title {
            color: #1e293b;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .contact-details {
            color: #475569;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .signature {
            padding-top: 32px;
            border-top: 1px solid #e2e8f0;
            text-align: left;
        }
        
        .signature-text {
            color: #64748b;
            margin-bottom: 8px;
            font-size: 15px;
        }
        
        .signature-name {
            color: #1e40af;
            font-weight: 600;
            font-size: 15px;
        }
        
        .footer {
            background: #1e293b;
            color: #94a3b8;
            padding: 32px 40px;
            text-align: center;
        }
        
        .footer-brand {
            color: white;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 15px;
        }
        
        .footer-address {
            font-size: 13px;
            color: #64748b;
            margin: 8px 0;
            line-height: 1.5;
        }
        
        .footer-copyright {
            font-size: 12px;
            color: #64748b;
            margin-top: 16px;
            border-top: 1px solid #334155;
            padding-top: 16px;
        }
        
        @media (max-width: 640px) {
            body {
                padding: 10px;
            }
            
            .container {
                border-radius: 6px;
            }
            
            .header {
                padding: 32px 24px;
            }
            
            .content {
                padding: 32px 24px;
            }
            
            .welcome-title {
                font-size: 22px;
            }
            
            .highlight-section, .contact-info {
                padding: 20px;
            }
            
            .footer {
                padding: 24px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">Dhanvarsha Electricals</div>
            <div class="tagline">Your Trusted Electrical Partner</div>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <!-- Welcome Section -->
            <div class="welcome-section">
                <h1 class="welcome-title">
                    Welcome to Dhanvarsha Electricals, <span class="user-name">${name}</span>
                </h1>
                <p class="welcome-subtitle">
                    Your account has been successfully created
                </p>
            </div>
            
            <p class="welcome-message">
                Thank you for joining Dhanvarsha Electricals. We are pleased to welcome you to our 
                professional network of electrical industry partners and look forward to serving your 
                electrical solution needs.
            </p>
            
            <!-- Highlight Section -->
            <div class="highlight-section">
                <h3 class="highlight-title">Your Partnership with Excellence</h3>
                <p class="highlight-text">
                    As a registered member, you now have access to our comprehensive range of 
                    premium electrical solutions, technical expertise, and dedicated customer 
                    support. We are committed to supporting your projects with reliable products 
                    and professional service.
                </p>
            </div>
            
            <!-- Benefits -->
            <div class="benefits-list">
                <h3 class="benefits-title">What You Can Expect:</h3>
                <div class="benefit-item">
                    <div class="benefit-bullet"></div>
                    <div class="benefit-text">Access to our complete catalog of electrical products and solutions</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-bullet"></div>
                    <div class="benefit-text">Streamlined enquiry process for bulk orders and custom requirements</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-bullet"></div>
                    <div class="benefit-text">Technical support from our qualified electrical engineers</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-bullet"></div>
                    <div class="benefit-text">Competitive pricing and flexible payment terms</div>
                </div>
                <div class="benefit-item">
                    <div class="benefit-bullet"></div>
                    <div class="benefit-text">Regular updates on new products and industry developments</div>
                </div>
            </div>
            
            <!-- Contact Information -->
            <div class="contact-info">
                <h3 class="contact-title">Need Assistance?</h3>
                <div class="contact-details">
                    Our customer service team is available to assist you with any questions 
                    or requirements. Please don't hesitate to reach out for technical 
                    consultations or product inquiries.
                </div>
            </div>
            
            <!-- Closing -->
            <div class="closing-section">
                <p class="closing-message">
                    We appreciate your trust in Dhanvarsha Electricals and look forward to 
                    building a successful long-term business relationship. Our team is ready 
                    to support your electrical projects with quality products and professional service.
                </p>
            </div>
            
            <div class="signature">
                <div class="signature-text">Best regards,</div>
                <div class="signature-name">The Dhanvarsha Electricals Team</div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">Dhanvarsha Electricals</div>
            <div class="footer-address">
                Professional Electrical Solutions & Services<br>
                Serving Industry Standards Since Our Establishment
            </div>
            <div class="footer-copyright">
                © 2024 Dhanvarsha Electricals. All rights reserved. | Registered Business Entity
            </div>
        </div>
    </div>
</body>
</html>
`);

export default Welcome;
