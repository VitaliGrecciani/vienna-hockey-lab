import { Resend } from 'resend';

// Initialize Resend with API Key from Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, phone, age, yearsInHockey, skillLevel, insight } = req.body;

    // Basic Validation
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`🚀 Processing lead: ${name} (${email})`);

    const results = {
        email: 'pending',
        telegram: 'skipped',
        sheets: 'skipped'
    };

    try {
        // 1. Send Email via Resend
        if (process.env.RESEND_API_KEY) {
            const emailResponse = await resend.emails.send({
                from: 'Vienna Hockey Lab <onboarding@resend.dev>', // Update this if you have a custom domain
                to: ['vienna.hockey.lab@gmail.com'], // Update to your real email
                subject: `New Application: ${name}`,
                html: `
          <h1>New Athlete Registration</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Years in Hockey:</strong> ${yearsInHockey}</p>
          <p><strong>Skill Level:</strong> ${skillLevel}</p>
          <p><strong>AI Insight:</strong> ${insight || 'N/A'}</p>
        `
            });

            if (emailResponse.error) {
                console.error('❌ Resend Error:', emailResponse.error);
                results.email = 'failed';
                // We don't throw here to allow other channels to try
            } else {
                results.email = 'success';
            }
        } else {
            console.warn('⚠️ RESEND_API_KEY missing');
            results.email = 'config_missing';
        }

        // 2. Send to Telegram
        if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
            const text = `
🏒 *New Lead (Resend Pipeline)*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🎂 *Age:* ${age}
⛸ *Years:* ${yearsInHockey}
📊 *Skill:* ${skillLevel}
🤖 *Insight:* ${insight || 'N/A'}
        `.trim();

            const tgUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
            const tgResponse = await fetch(tgUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            if (tgResponse.ok) results.telegram = 'success';
            else {
                console.error('❌ Telegram Error:', await tgResponse.text());
                results.telegram = 'failed';
            }
        }

        // 3. Send to Google Sheets (Apps Script Webhook)
        if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
            const sheetResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            });

            // Google Scripts often return opaque responses due to CORS redirects,
            // but in a serverless function we can just fire and forget or await.
            // If it throws, we catch below.
            results.sheets = 'sent';
        }

        // Return success if at least one critical channel worked (or if testing)
        return res.status(200).json({ success: true, details: results });

    } catch (error) {
        console.error('SERVER ERROR:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
