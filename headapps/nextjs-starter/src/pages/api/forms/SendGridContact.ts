import { NextApiRequest, NextApiResponse } from 'next';

interface SendGridContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}

interface SendGridPayload {
  from: { email: string };
  personalizations: Array<{
    to: Array<{ email: string }>;
    dynamic_template_data: SendGridContactFormData;
  }>;
  template_id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.BLUEPRINT_SENDGRID_API_KEY;
    const templateId = process.env.SENDGRID_TEMPLATE_ID || 'd-4794e3a093124c1699e8f5ca96329499';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@horizontal.com';
    const toEmail = process.env.TO_EMAIL || 'svang@horizontal.com';

    if (!apiKey) {
      console.error('SendGrid API key not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const { first_name, last_name, email, phone, message }: Partial<SendGridContactFormData> =
      req.body;

    if (!first_name?.trim() || !last_name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['first_name', 'last_name', 'email', 'message'],
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone && phone.trim() && !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }

    const payload: SendGridPayload = {
      from: { email: fromEmail },
      personalizations: [
        {
          to: [{ email: toEmail }],
          dynamic_template_data: {
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            phone: phone?.trim() || '',
            message: message.trim(),
          },
        },
      ],
      template_id: templateId,
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendGrid API error:', response.status, errorText);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Form handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
