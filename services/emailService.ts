import { RegistrationData } from '../types';

// Replace these with your actual Service ID, Template ID, and Public Key from EmailJS
// https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = "service_YOUR_ID_HERE";
const EMAILJS_TEMPLATE_ID = "template_YOUR_ID_HERE";
const EMAILJS_PUBLIC_KEY = "public_YOUR_KEY_HERE";

export const sendBookingRequest = async (data: RegistrationData): Promise<boolean> => {
    console.log("Transmission initialized:", data);

    // Simulate network request
    // In production, we would use fetch or emailjs-com package
    try {
        /* 
        // Example implementation with fetch (no extra dependency needed)
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: {
                    user_name: data.name,
                    user_phone: data.phone,
                    user_age: data.age,
                    user_years: data.yearsInHockey,
                    user_skill: data.skillLevel,
                    insight_message: `Age: ${data.age}, Years: ${data.yearsInHockey} - ${data.skillLevel}`
                }
            })
        });
        */

        // Simulate success
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Transmission confirmed. Data sent via EmailJS (SIMULATED).");
        return true;

    } catch (error) {
        console.error("Transmission failed:", error);
        return false;
    }
};
