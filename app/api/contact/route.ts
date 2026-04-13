import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // If an email service is configured, send the message here.
    // Example with Resend (add RESEND_API_KEY to env):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@ideora.com',
    //   to: 'hello@ideora.com',
    //   subject: `Contact: ${data.subject}`,
    //   text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    // });

    // Log the submission server-side (always works)
    console.log('[Contact] New submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Message received. We will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('[Contact] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
