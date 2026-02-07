export interface Coach {
  name: string;
  role: string;
  experience: string[];
  image: string;
}

export interface TrainingModule {
  title: string;
  description: string;
  icon: string;
}

export interface RegistrationData {
  name: string;
  phone: string;
  age: number | '';
  yearsInHockey: number | '';
  skillLevel: 'Beginner' | 'Amateur' | 'Pro' | '';
}

export interface AIAnalysisResult {
  pathName: string;
  description: string;
  focusAreas: string[];
  potential: number; // 0-100
}