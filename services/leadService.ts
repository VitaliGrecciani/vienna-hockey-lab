import { RegistrationData } from '../types';

export const submitLead = async (data: RegistrationData): Promise<{ success: boolean; errors: string[] }> => {
    console.log("🚀 Starting Lead Submission via Internal API:", data.name);

    try {
        const response = await fetch('/api/submit-lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            console.log("✅ Lead submitted successfully.");
            return { success: true, errors: [] };
        } else {
            console.error("❌ Submission failed:", result);
            return { success: false, errors: [result.error || "Unknown Error"] };
        }
    } catch (error) {
        console.error("❌ Network/Server Error:", error);
        return { success: false, errors: ["Network Error"] };
    }
};

