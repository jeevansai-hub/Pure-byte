/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ingredient, Product, DiseaseAssociation, AuditLog, NotificationItem } from '../types';

export const MOCK_INGREDIENTS: Ingredient[] = [
  {
    id: 'bha',
    name: 'Butylated Hydroxyanisole (BHA)',
    chemicalName: '2-tert-Butyl-4-methoxyphenol',
    commonName: 'BHA Preservative',
    category: 'preservative',
    riskScore: 92,
    riskLevel: 'critical',
    description: 'A synthetic antioxidant used to preserve fats and oils in foods and cosmetics. Listed as a known endocrine disruptor and categorized as reasonably anticipated to be a human carcinogen by the National Toxicology Program.',
    healthEffects: [
      'Estrogen-mimicking endocrine disruption',
      'Potential forestomach carcinogen (animal trials)',
      'Dermal allergic sensitization',
      'Bioaccumulation in fatty tissue'
    ],
    regulatoryStatus: {
      fda: 'Restricted',
      eu: 'Banned',
      canada: 'Restricted'
    },
    molecularFormula: 'C11H16O2',
    molecularWeight: '180.24 g/mol',
    clinicalCitations: [
      'NTP 15th Report on Carcinogens (2021)',
      'European Commission on Endocrine Disruption (Category 1)',
      'IARC Monographs on the Evaluation of Carcinogenic Risks to Humans (Vol. 17)'
    ],
    alternatives: ['Tocopherols (Vitamin E)', 'Rosemary Extract', 'Ascorbic Acid']
  },
  {
    id: 'titanium-dioxide',
    name: 'Titanium Dioxide',
    chemicalName: 'Titanium(IV) Oxide',
    commonName: 'E171 White Colorant',
    category: 'colorant',
    riskScore: 85,
    riskLevel: 'high',
    description: 'Used extensively as a white pigment in food, toothpaste, and cosmetics. Banned as a food additive in the European Union due to concerns regarding genotoxicity (ability to damage DNA) and accumulation in internal organs.',
    healthEffects: [
      'Genotoxicity and DNA strand breaks',
      'Systemic accumulation in spleen, liver, and kidneys',
      'Inhalation hazard (classified as 2B carcinogen)',
      'Gastrointestinal cellular inflammation'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Banned',
      canada: 'Approved'
    },
    molecularFormula: 'TiO2',
    molecularWeight: '79.87 g/mol',
    clinicalCitations: [
      'EFSA Panel on Food Additives and Flavourings (May 2021 Opinion)',
      'IARC Monograph on Titanium Dioxide Nanoparticles',
      'French Agency for Food, Environmental and Occupational Health & Safety (ANSES log)'
    ],
    alternatives: ['Calcium Carbonate', 'Rice Starch', 'Zinc Oxide']
  },
  {
    id: 'aspartame',
    name: 'Aspartame',
    chemicalName: 'L-aspartyl-L-phenylalanine methyl ester',
    commonName: 'Equal / NutraSweet',
    category: 'sweetener',
    riskScore: 78,
    riskLevel: 'high',
    description: 'A widely used low-calorie artificial sweetener. In 2023, the WHO International Agency for Research on Cancer (IARC) classified aspartame as "possibly carcinogenic to humans" (Group 2B). Under hot conditions, it breaks down into phenylalanine, aspartic acid, and methanol.',
    healthEffects: [
      'Possibly carcinogenic to humans (IARC Group 2B)',
      'Neurological stress & migraine triggering',
      'Alters gut microbiome composition',
      'Metabolic dysfunction in long-term users'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Restricted',
      canada: 'Approved'
    },
    molecularFormula: 'C14H18N2O5',
    molecularWeight: '294.3 g/mol',
    clinicalCitations: [
      'WHO International Agency for Research on Cancer (IARC) Evaluation (July 2023)',
      'Journal of Neuropathology & Experimental Neurology (Phenylalanine kinetics)',
      'Nature Medicine - Artificial Sweeteners and Cardiometabolic Risk'
    ],
    alternatives: ['Stevia Rebaudiana Extract', 'Monk Fruit (Luo Han Guo)', 'Erythritol']
  },
  {
    id: 'triclosan',
    name: 'Triclosan',
    chemicalName: '5-Chloro-2-(2,4-dichlorophenoxy)phenol',
    commonName: 'Anti-bacterial Chemical',
    category: 'active',
    riskScore: 88,
    riskLevel: 'high',
    description: 'An antibacterial and antifungal agent previously common in household soaps, now restricted. It causes thyroid hormone reduction and promotes antibiotic resistance in bacterial colonies.',
    healthEffects: [
      'Thyroid hormone disruption & endocrine interference',
      'Acceleration of antibiotic resistant bacterial strains',
      'Bioaccumulation in aquatic ecosystems',
      'Dermal allergic reactivity'
    ],
    regulatoryStatus: {
      fda: 'Banned',
      eu: 'Restricted',
      canada: 'Restricted'
    },
    molecularFormula: 'C12H7Cl3O2',
    molecularWeight: '289.54 g/mol',
    clinicalCitations: [
      'FDA Rule Banning Triclosan in Over-the-Counter Consumer Antiseptic Washes (2016)',
      'Environmental Health Perspectives Journal (Thyroid dysregulation)',
      'European Scientific Committee on Consumer Safety (SCCS/1414/11)'
    ],
    alternatives: ['Tea Tree Oil', 'Eucalyptus Oil', 'Thyme Extract']
  },
  {
    id: 'methylparaben',
    name: 'Methylparaben',
    chemicalName: 'Methyl 4-hydroxybenzoate',
    commonName: 'Paraben Preservative',
    category: 'preservative',
    riskScore: 80,
    riskLevel: 'high',
    description: 'A chemical preservative used to prevent mold and bacterial growth in cosmetics and toiletries. Extensively studied due to weak estrogen-like activity and its frequent direct detection inside breast tissue tumors.',
    healthEffects: [
      'Weak estrogen mimicry (endocrine active)',
      'Accumulation in human breast tumor microenvironments',
      'Accelerated UV-induced skin aging when applied topically',
      'Contact dermatitis allergen'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Restricted',
      canada: 'Approved'
    },
    molecularFormula: 'C8H8O3',
    molecularWeight: '152.15 g/mol',
    clinicalCitations: [
      'Journal of Applied Toxicology (Darbre et al., Detection of parabens in breast tumors)',
      'SCCS Cosmetic Ingredient Review Panel Update',
      'Danish Environmental Protection Agency Report on Parabens in Children'
    ],
    alternatives: ['Ethylhexylglycerin', 'Sodium Benzoate', 'Cosgard']
  },
  {
    id: 'red-40',
    name: 'Red 40 (Allura Red AC)',
    chemicalName: 'Disodium 6-hydroxy-5-((2-methoxy-5-methyl-4-sulfonatophenyl)azo)naphthalene-2-sulfonate',
    commonName: 'Coal Tar Dye / E129',
    category: 'colorant',
    riskScore: 72,
    riskLevel: 'high',
    description: 'A synthetic azo dye made from petroleum distillates. Studies link synthetic food dyes to increased hyperactivity and ADHD symptoms in children, leading to mandatory warning labels on food items sold in the EU.',
    healthEffects: [
      'Triggers ADHD behaviors and hyperactivity in vulnerable children',
      'Hypersensitivity and urticaria (hives) reactions',
      'Trace contamination with carcinogens like benzidine',
      'Intestinal barrier tissue inflammation'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Restricted',
      canada: 'Approved'
    },
    molecularFormula: 'C18H14N2Na2O8S2',
    molecularWeight: '496.42 g/mol',
    clinicalCitations: [
      'The Lancet (Southampton study on food additives & hyperactive behavior)',
      'Office of Environmental Health Hazard Assessment (OEHHA) Review (2021)',
      'European Parliament Regulation (EC) No 1333/2008 Annex V warning requirements'
    ],
    alternatives: ['Beetroot Juice Extract', 'Carmine', 'Elderberry Powder']
  },
  {
    id: 'sodium-laureth-sulfate',
    name: 'Sodium Laureth Sulfate (SLES)',
    chemicalName: 'Sodium Lauryl Ether Sulfate',
    commonName: 'Foaming Surfactant',
    category: 'surfactant',
    riskScore: 48,
    riskLevel: 'moderate',
    description: 'An anionic detergent and surfactant found in shampoos, toothpastes, and shower gels. Often subject to chemical ethoxylation during manufacturing, which introduces high risk of contamination with carcinogen 1,4-dioxane.',
    healthEffects: [
      'Dermal and ocular irritation with strip of natural lipid barrier',
      'Risk of trace contamination with genotoxic 1,4-Dioxane',
      'Can trigger canker sores (aphthous ulcers) in toothpastes',
      'Bioaccumulable dermo-toxin'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Restricted',
      canada: 'Approved'
    },
    molecularFormula: 'CH3(CH2)11(OCH2CH2)nOSO3Na',
    molecularWeight: 'Approx 420 g/mol',
    clinicalCitations: [
      'Cosmetic Ingredient Review (CIR) Safety Assessment',
      'EPA Registration on 1,4-Dioxane in Household Products',
      'Journal of Oral Pathology & Medicine (Sodium Lauryl Sulfate and Recurrent Aphthous Stomatitis)'
    ],
    alternatives: ['Coco-Glucoside', 'Sodium Cocoyl Isethionate', 'Decyl Glucoside']
  },
  {
    id: 'phenoxyethanol',
    name: 'Phenoxyethanol',
    chemicalName: '2-Phenoxyethan-1-ol',
    commonName: 'Rose Ether Preservative',
    category: 'preservative',
    riskScore: 50,
    riskLevel: 'moderate',
    description: 'A glycol ether preservative widely used in skin care to replace parabens. Can cause central nervous system depression in infants if ingested (e.g. from nipple creams) and acts as a localized irritant.',
    healthEffects: [
      'Localized contact dermatitis and eczema triggers',
      'Mild neurotoxic risk to infants (ingestion limits)',
      'Ocular irritation',
      'In vitro cellular disruption'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Restricted',
      canada: 'Approved'
    },
    molecularFormula: 'C8H10O2',
    molecularWeight: '138.16 g/mol',
    clinicalCitations: [
      'EU SCCS Scientific Opinion on Phenoxyethanol (Safe up to 1%)',
      'FDA Warning to Consumers regarding Mommy\'s Bliss Nipple Cream (2008)',
      'American Journal of Contact Dermatitis'
    ],
    alternatives: ['Leuconostoc/Radish Root Ferment', 'Glyceryl Caprylate', 'Sodium Levulinate']
  },
  {
    id: 'silicon-dioxide',
    name: 'Silicon Dioxide',
    chemicalName: 'Silica',
    commonName: 'Anti-caking Sand',
    category: 'other',
    riskScore: 12,
    riskLevel: 'safe',
    description: 'An inert compound naturally found in water, plants, and animal cells. Used as an anti-caking agent in powdered spices or table salt. Entirely safe for ingestion; biological silica is excreted safely.',
    healthEffects: [
      'No known digestive health risks (biologically inert)',
      'Supports skeletal integrity (dietary silica)'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Approved',
      canada: 'Approved'
    },
    molecularFormula: 'SiO2',
    molecularWeight: '60.08 g/mol',
    clinicalCitations: [
      'EFSA Panel on Food Additives reassessment of Silicon Dioxide (2018)',
      'Joint FAO/WHO Expert Committee on Food Additives (JECFA)'
    ],
    alternatives: []
  },
  {
    id: 'citric-acid',
    name: 'Citric Acid',
    chemicalName: '2-Hydroxypropane-1,2,3-tricarboxylic acid',
    commonName: 'Sour Citrus Preservative',
    category: 'flavor',
    riskScore: 15,
    riskLevel: 'safe',
    description: 'A weak organic tricarboxylic acid found naturally in citrus fruits. Used universally as an acidulant, flavor balancer, and preservative in food, chemical buffers, and skin exfoliants.',
    healthEffects: [
      'Safe organic compound metabolized in Citric Acid Cycle',
      'Excellent natural chelating agent and food antioxidant',
      'Can cause tooth enamel erosion in extremely high fluid concentrations'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Approved',
      canada: 'Approved'
    },
    molecularFormula: 'C6H8O7',
    molecularWeight: '192.12 g/mol',
    clinicalCitations: [
      'US FDA Generally Recognized As Safe (GRAS) Database',
      'European Chemicals Agency (ECHA) Data Dossier'
    ],
    alternatives: []
  },
  {
    id: 'xanthan-gum',
    name: 'Xanthan Gum',
    chemicalName: 'Xanthan polysaccharide',
    commonName: 'Thickening Stabilizer',
    category: 'emulsifier',
    riskScore: 18,
    riskLevel: 'safe',
    description: 'A natural polysaccharide produced by fermenting simple sugars with Xanthomonas campestris bacteria. Acts as an excellent emulsifying and thickening agent in dressings, cosmetics, and gluten-free baking.',
    healthEffects: [
      'Inert prebiotic soluble fiber supporting gut motility',
      'Safe texturizer, non-hazardous compound'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Approved',
      canada: 'Approved'
    },
    molecularFormula: '(C35H49O29)n',
    molecularWeight: '1,000,000+ g/mol',
    clinicalCitations: [
      'EFSA Panel: Food additive Xanthan Gum re-evaluation (2017)',
      'US National Institutes of Health Gut Health Studies'
    ],
    alternatives: []
  },
  {
    id: 'potassium-sorbate',
    name: 'Potassium Sorbate',
    chemicalName: 'Potassium (2E,4E)-hexa-2,4-dienoate',
    commonName: 'Wine & Cheese Preservative',
    category: 'preservative',
    riskScore: 28,
    riskLevel: 'low',
    description: 'The potassium salt of sorbic acid, used to inhibit molds and yeasts in wines, cheeses, baked goods, and skincare. Highly compatible, breaks down naturally into water and CO2 in biological pathways.',
    healthEffects: [
      'Low oral toxicity, metabolized like a dietary fatty acid',
      'Can cause mild skin sensitization in ultra-high cosmetic dosages'
    ],
    regulatoryStatus: {
      fda: 'Approved',
      eu: 'Approved',
      canada: 'Approved'
    },
    molecularFormula: 'C6H7KO2',
    molecularWeight: '150.22 g/mol',
    clinicalCitations: [
      'Scientific Committee on Consumer Safety Opinion on Sorbic Acid',
      'FAO/WHO JECFA Safety Monographs'
    ],
    alternatives: ['Calcium Propionate', 'Sorbic Acid', 'Natural Fermentation']
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'neon-energy',
    name: 'Neon Rush Electro Energy',
    brand: 'X-Volt Labs',
    type: 'beverage',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=80',
    ingredientsText: 'Carbonated water, Citric Acid, Aspartame, Red 40, Potassium Sorbate, Caffeine, Vitamin B12',
    ingredients: [
      MOCK_INGREDIENTS.find(i => i.id === 'citric-acid')!,
      MOCK_INGREDIENTS.find(i => i.id === 'aspartame')!,
      MOCK_INGREDIENTS.find(i => i.id === 'red-40')!,
      MOCK_INGREDIENTS.find(i => i.id === 'potassium-sorbate')!
    ],
    safetyScore: 35,
    riskLevel: 'high',
    scanDate: '2026-06-09T10:15:00Z',
    scanned: true
  },
  {
    id: 'glow-cream',
    name: 'Hydra-Shield Barrier Facial Cream',
    brand: 'Aegis Skin Research',
    type: 'cosmetic',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?w=300&auto=format&fit=crop&q=80',
    ingredientsText: 'Deionized water, Citric Acid, Phenoxyethanol, Xanthan Gum, Potassium Sorbate, Silicon Dioxide, Jojoba Oil',
    ingredients: [
      MOCK_INGREDIENTS.find(i => i.id === 'citric-acid')!,
      MOCK_INGREDIENTS.find(i => i.id === 'phenoxyethanol')!,
      MOCK_INGREDIENTS.find(i => i.id === 'xanthan-gum')!,
      MOCK_INGREDIENTS.find(i => i.id === 'potassium-sorbate')!,
      MOCK_INGREDIENTS.find(i => i.id === 'silicon-dioxide')!
    ],
    safetyScore: 84,
    riskLevel: 'low',
    scanDate: '2026-06-08T14:32:00Z',
    scanned: true
  },
  {
    id: 'white-paste',
    name: 'Titan-Clean White Dental Cream',
    brand: 'Radiant Oraltech',
    type: 'pharmaceutical',
    imageUrl: 'https://images.unsplash.com/photo-1559599141-3814861d8116?w=300&auto=format&fit=crop&q=80',
    ingredientsText: 'Sorbitol, Glycerin, Silica (Silicon Dioxide), Triclosan, Sodium Laureth Sulfate, Titanium Dioxide, Spearmint Flavor',
    ingredients: [
      MOCK_INGREDIENTS.find(i => i.id === 'silicon-dioxide')!,
      MOCK_INGREDIENTS.find(i => i.id === 'triclosan')!,
      MOCK_INGREDIENTS.find(i => i.id === 'sodium-laureth-sulfate')!,
      MOCK_INGREDIENTS.find(i => i.id === 'titanium-dioxide')!
    ],
    safetyScore: 22,
    riskLevel: 'critical',
    scanDate: '2026-06-05T09:44:00Z',
    scanned: true
  },
  {
    id: 'corn-chips',
    name: 'Golden Crisp Organic Sea Salt Chips',
    brand: 'Naturals Co.',
    type: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1518047601542-79f18c655718?w=300&auto=format&fit=crop&q=80',
    ingredientsText: 'Organic yellow corn, sunflower oil, sea salt, Citric Acid, Xanthan Gum, Silicon Dioxide',
    ingredients: [
      MOCK_INGREDIENTS.find(i => i.id === 'citric-acid')!,
      MOCK_INGREDIENTS.find(i => i.id === 'xanthan-gum')!,
      MOCK_INGREDIENTS.find(i => i.id === 'silicon-dioxide')!
    ],
    safetyScore: 95,
    riskLevel: 'safe',
    scanDate: '2026-06-04T18:20:00Z',
    scanned: true
  },
  {
    id: 'solar-gel',
    name: 'AuroGlow Ultra Protective Mineral Block',
    brand: 'Hologram Cosmetics',
    type: 'cosmetic',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=80',
    ingredientsText: 'Zinc oxide, Titanium Dioxide, Methylparaben, Phenoxyethanol, Sodium Laureth Sulfate (as surfactant emulsifier), Organic fragrance molecules',
    ingredients: [
      MOCK_INGREDIENTS.find(i => i.id === 'titanium-dioxide')!,
      MOCK_INGREDIENTS.find(i => i.id === 'methylparaben')!,
      MOCK_INGREDIENTS.find(i => i.id === 'phenoxyethanol')!,
      MOCK_INGREDIENTS.find(i => i.id === 'sodium-laureth-sulfate')!
    ],
    safetyScore: 40,
    riskLevel: 'high',
    scanDate: '2026-06-01T15:10:00Z',
    scanned: true
  },
  {
    id: 'snack-bars',
    name: 'FitProtein Fuel Crisp Bar',
    brand: 'Nutri-Vitals',
    type: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=300&auto=format&fit=crop&q=80',
    ingredientsText: 'Soy protein nuggets, Butylated Hydroxyanisole (BHA) preservation agents, Red 40 for glaze coloration, Citric Acid, Xanthan Gum emulsifying fibers, organic honey sweetener',
    ingredients: [
      MOCK_INGREDIENTS.find(i => i.id === 'bha')!,
      MOCK_INGREDIENTS.find(i => i.id === 'red-40')!,
      MOCK_INGREDIENTS.find(i => i.id === 'citric-acid')!,
      MOCK_INGREDIENTS.find(i => i.id === 'xanthan-gum')!
    ],
    safetyScore: 28,
    riskLevel: 'high',
    scanDate: '2026-05-28T11:42:00Z',
    scanned: true
  }
];

export const MOCK_DISEASES: DiseaseAssociation[] = [
  {
    diseaseName: 'Endocrine Disruption Syndrome',
    affectedSystem: 'endocrine',
    evidenceStrength: 'strong',
    culpritIngredients: ['bha', 'methylparaben', 'triclosan'],
    mechanism: 'Hormone receptor interference by binding directly to nuclear estrogen and androgen sites. Leads to downstream synthesis abnormalities and cellular signal disruption.'
  },
  {
    diseaseName: 'Genotoxic DNA Instability',
    affectedSystem: 'immune',
    evidenceStrength: 'strong',
    culpritIngredients: ['titanium-dioxide'],
    mechanism: 'Accumulation of heavy micro-particles generates intracellular reactive oxygen species (ROS), causing direct double-stranded DNA lesions and disrupting mitochondrial membrane integrity.'
  },
  {
    diseaseName: 'Sub-Clinical Neurodegenerative Stress',
    affectedSystem: 'neurological',
    evidenceStrength: 'emerging',
    culpritIngredients: ['aspartame'],
    mechanism: 'Prolonged high concentrations of phenylalanine blocks neurotransmitter transfers (dopamine, serotonin) at the blood-brain barrier. Excess aspartic acid functions as an excitotoxin.'
  },
  {
    diseaseName: 'Micro-Inflammatory Colon Disruption',
    affectedSystem: 'gastrointestinal',
    evidenceStrength: 'strong',
    culpritIngredients: ['red-40', 'sodium-laureth-sulfate'],
    mechanism: 'Surfactants and azo dyes erode the tight junctions of the intestinal epithelium, creating path-gaps in the tight mucosal lining which results in severe immune response.'
  },
  {
    diseaseName: 'Severe Atopic Contact Dermatitis',
    affectedSystem: 'dermatological',
    evidenceStrength: 'strong',
    culpritIngredients: ['phenoxyethanol', 'sodium-laureth-sulfate'],
    mechanism: 'Direct denaturation of stratum corneum proteins paired with prolonged chemical retention triggers local Langerhans cells and T-lymphocyte sensitization cascade.'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-06-09T13:20:00Z',
    action: 'Database Update: BHA Risk Profile elevated from HIGH to CRITICAL',
    operator: 'Dr. Evelyn Carter, Head of Chemical Toxicology',
    ip: '192.168.42.10',
    status: 'success'
  },
  {
    id: 'log-002',
    timestamp: '2026-06-09T11:45:00Z',
    action: 'OCR Engine: Ingested 1,420 labels, trained neural edge threshold to 99.4%',
    operator: 'PureByte AI Admin Bot',
    ip: '10.0.4.82',
    status: 'success'
  },
  {
    id: 'log-003',
    timestamp: '2026-06-08T18:10:00Z',
    action: 'Rule Verification Failure: Aspartame EU chemical index sync rejected due to invalid certificate',
    operator: 'Security Node Beta',
    ip: '82.90.111.4',
    status: 'fail'
  },
  {
    id: 'log-004',
    timestamp: '2026-06-08T09:05:00Z',
    action: 'Security Audit: Performed automatic AES-256 rotative key encryption on 250k health records',
    operator: 'SecOps Automated Agent',
    ip: '10.0.1.2',
    status: 'success'
  },
  {
    id: 'log-005',
    timestamp: '2026-06-07T14:30:00Z',
    action: 'Warning Flag Raised: Titanium Dioxide banned status synchronized globally for food categories',
    operator: 'Regulatory Compliance Bot',
    ip: '192.168.42.22',
    status: 'warn'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '⚠️ RECALL ALERT: Titanium Dioxide Food Recall',
    message: 'EU enacts immediate physical store recalls on confectioneries containing additive colorant Titanium Dioxide (E171) after recent clinical trials confirm persistent cellular genotoxicity.',
    type: 'recall',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    title: '🚨 CRITICAL ADVISORY: Aspartame Status Review',
    message: 'World Health Organization IARC re-categorizes low sugar dietary beverages with Aspartame into Group 2B carcinogen registry. PureByte scanners calibrated to strict warnings for active dietary users.',
    type: 'health-alert',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: 'notif-3',
    title: '💡 PROACTIVE RECOmmenDATION: Sunscreen Safety',
    message: 'Mineral sunscreens using Nano Zinc Oxide are highly recommended as zero-carcinogen alternatives to sunscreen gels containing chemical preservatives Methylparabens.',
    type: 'update',
    timestamp: '3 days ago',
    read: true
  }
];
