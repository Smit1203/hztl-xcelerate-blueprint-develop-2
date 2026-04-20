import { NextRequest, NextResponse } from 'next/server';

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

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const apiKey = process.env.BLUEPRINT_SENDGRID_API_KEY;
    const templateId = process.env.SENDGRID_TEMPLATE_ID || 'd-4794e3a093124c1699e8f5ca96329499';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@horizontal.com';
    const toEmail = process.env.TO_EMAIL || 'svang@horizontal.com';

    if (!apiKey) {
      console.error('SendGrid API key not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const { first_name, last_name, email, phone, message } =
      (await req.json()) as Partial<SendGridContactFormData>;

    if (!first_name?.trim() || !last_name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['first_name', 'last_name', 'email', 'message'],
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone && phone.trim() && !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone format' }, { status: 400 });
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
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Form handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
