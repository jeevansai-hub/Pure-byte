/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'landing'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'scan'
  | 'ocr-review'
  | 'loading'
  | 'report'
  | 'ingredient-details'
  | 'disease-intel'
  | 'history'
  | 'library'
  | 'profile'
  | 'chat'
  | 'pricing'
  | 'admin'
  | 'settings';

export type RiskLevel = 'safe' | 'low' | 'moderate' | 'high' | 'critical';

export interface Ingredient {
  id: string;
  name: string;
  chemicalName?: string;
  commonName?: string;
  category: 'preservative' | 'sweetener' | 'colorant' | 'emulsifier' | 'surfactant' | 'active' | 'flavor' | 'other';
  riskScore: number; // 0 - 100 where higher is MORE dangerous
  riskLevel: RiskLevel;
  description: string;
  healthEffects: string[];
  regulatoryStatus: {
    fda: 'Approved' | 'Restricted' | 'Banned';
    eu: 'Approved' | 'Restricted' | 'Banned';
    canada: 'Approved' | 'Restricted' | 'Banned';
  };
  molecularFormula?: string;
  molecularWeight?: string;
  clinicalCitations: string[];
  alternatives: string[];
}

export interface DiseaseAssociation {
  diseaseName: string;
  affectedSystem: 'endocrine' | 'neurological' | 'cardiovascular' | 'gastrointestinal' | 'immune' | 'dermatological';
  evidenceStrength: 'strong' | 'emerging' | 'anecdotal';
  culpritIngredients: string[]; // Ingredient IDs
  mechanism: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: 'food' | 'cosmetic' | 'beverage' | 'pharmaceutical' | 'household';
  imageUrl?: string;
  ingredientsText: string;
  ingredients: Ingredient[];
  safetyScore: number; // 0-100 where 100 is SAFEST
  riskLevel: RiskLevel;
  scanDate: string;
  scanned?: boolean;
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  allergies: string[];
  healthConditions: string[];
  dietPreferences: string[];
  pregnancyStatus: boolean;
  lifestyleGoals: string[];
  riskCalibration: 'strict' | 'balanced' | 'tolerant';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: { title: string; url?: string }[];
  suggestedPrompts?: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  operator: string;
  ip: string;
  status: 'success' | 'warn' | 'fail';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'recall' | 'health-alert' | 'update';
  timestamp: string;
  read: boolean;
}
