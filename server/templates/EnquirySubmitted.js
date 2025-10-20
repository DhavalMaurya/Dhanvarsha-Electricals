const EnquirySubmitted = (enquiryData) => (`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Confirmation - Dhanvarsha Electricals</title>
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
        
        .confirmation-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .success-indicator {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            color: white;
            font-size: 28px;
            font-weight: bold;
            box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }
        
        .confirmation-title {
            color: #1e293b;
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 16px;
            letter-spacing: -0.025em;
        }
        
        .confirmation-subtitle {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 16px;
            font-weight: 500;
        }
        
        .user-name {
            color: #1e40af;
            font-weight: 700;
        }
        
        .confirmation-message {
            font-size: 15px;
            color: #475569;
            line-height: 1.7;
        }
        
        .enquiry-details {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #1e40af;
            border-radius: 8px;
            padding: 32px;
            margin: 32px 0;
        }
        
        .details-title {
            color: #1e293b;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 500;
            color: #475569;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .detail-value {
            color: #1e293b;
            font-weight: 600;
            text-align: right;
        }
        
        .next-steps {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 32px;
            margin: 32px 0;
        }
        
        .next-steps-title {
            color: #0c4a6e;
            font-weight: 600;
            margin-bottom: 16px;
            font-size: 18px;
        }
        
        .steps-list {
            list-style: none;
            padding: 0;
        }
        
        .steps-list li {
            color: #0f172a;
            margin-bottom: 10px;
            padding-left: 24px;
            position: relative;
            line-height: 1.6;
            font-size: 15px;
        }
        
        .steps-list li::before {
            content: '•';
            position: absolute;
            left: 8px;
            color: #0ea5e9;
            font-weight: bold;
            font-size: 18px;
        }
        
        .contact-section {
            background: #fefce8;
            border: 1px solid #facc15;
            border-radius: 8px;
            padding: 24px;
            margin: 32px 0;
            text-align: center;
        }
        
        .contact-title {
            color: #a16207;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 16px;
        }
        
        .contact-text {
            color: #713f12;
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
            
            .confirmation-title {
                font-size: 22px;
            }
            
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
            
            .detail-value {
                text-align: left;
            }
            
            .enquiry-details, .next-steps, .contact-section {
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
            <!-- Confirmation Section -->
            <div class="confirmation-section">
                <div class="success-indicator">✓</div>
                <h1 class="confirmation-title">Enquiry Received Successfully</h1>
                <p class="confirmation-subtitle">
                    Thank you, <span class="user-name">${enquiryData.name}</span>
                </p>
                <p class="confirmation-message">
                    Your enquiry has been successfully submitted and received by our team. 
                    We will review your requirements and respond promptly.
                </p>
            </div>
            
            <!-- Enquiry Details -->
            <div class="enquiry-details">
                <h3 class="details-title">Contact Information</h3>
                <div class="detail-row">
                    <span class="detail-label">Company</span>
                    <span class="detail-value">${enquiryData.companyName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact Person</span>
                    <span class="detail-value">${enquiryData.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email Address</span>
                    <span class="detail-value">${enquiryData.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone Number</span>
                    <span class="detail-value">${enquiryData.contact}</span>
                </div>
            </div>
            
            <!-- Next Steps -->
            <div class="next-steps">
                <h3 class="next-steps-title">Next Steps in Our Process</h3>
                <ul class="steps-list">
                    <li>Our technical team will review your specific requirements</li>
                    <li>Detailed quotation will be prepared within 24-48 business hours</li>
                    <li>Pricing and product availability will be sent via email or phone</li>
                    <li>Our engineers are available for technical consultations</li>
                    <li>We will coordinate delivery schedules upon order confirmation</li>
                </ul>
            </div>
            
            <!-- Contact Information -->
            <div class="contact-section">
                <h3 class="contact-title">Need Immediate Assistance?</h3>
                <p class="contact-text">
                    For urgent enquiries or technical clarifications, please contact our 
                    customer service team directly. We are committed to providing prompt 
                    professional support for all your electrical requirements.
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
                Industrial & Commercial Electrical Supply
            </div>
            <div class="footer-copyright">
                © 2024 Dhanvarsha Electricals. All rights reserved. | Registered Business Entity
            </div>
        </div>
    </div>
</body>
</html>
`);

export default EnquirySubmitted;
