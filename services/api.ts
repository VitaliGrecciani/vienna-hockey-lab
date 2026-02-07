import { RegistrationData } from '../types';

export const submitRegistration = async (data: RegistrationData): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("--- MOCK API CALL ---");
  console.log("Sending data to Telegram Bot...");
  console.log("Updating Google Sheets...");
  console.log("Sending Confirmation Email...");
  console.log("Payload:", data);
  console.log("---------------------");

  return {
    success: true,
    message: "Registration successful. Welcome to the Lab."
  };
};