
export const legal = {
  legal_page: {
    title: "LEGAL ",
    highlight: "NOTICE.",
    desc: "Mandatory information regarding the editor and platform licenses.",
    label: "Legal Folder",
    sections: {
      editeur: "Editor",
      agrement: "Licensing",
      hebergement: "Hosting",
      donnees: "Data",
      mediation: "Mediation",
      cookies: "Cookies",
      propriete: "Property"
    },
    editor_title: "Site Editor",
    editor_p1: "The site is edited by Younited, the leader in instant credit in Europe.",
    editor_identity: "Identity",
    editor_contact: "Contact",
    editor_address: "21 rue de Châteaudun, 75009 Paris, France",
    licensing_title: "Licensing & Regulation",
    licensing_p1: "Younited is a licensed credit institution and investment service provider.",
    licensing_acpr: "ACPR",
    licensing_acpr_desc: "License n°16488 delivered by the Prudential Control and Resolution Authority.",
    licensing_orias: "ORIAS",
    licensing_orias_desc: "Registration n°11061269 as an insurance broker.",
    gdpr_title: "Data Protection (GDPR)",
    gdpr_p1: "We place maximum importance on the security of your personal data.",
    gdpr_purposes: "Purposes",
    gdpr_purposes_desc: "Credit simulation, contract management, fraud prevention.",
    gdpr_retention: "Retention",
    gdpr_retention_desc: "Storage according to legal obligations (5 to 10 years).",
    gdpr_recipients: "Recipients",
    gdpr_recipients_desc: "Internal services, banking partners, regulatory authorities.",
    gdpr_rights_label: "Your rights",
    gdpr_rights_desc: "Access, rectification, deletion. Contact: dpo@younited-credit.fr",
    mediation_title: "Mediation & Complaints",
    mediation_p1: "In case of dispute, we always prioritize amicable resolution.",
    mediation_service_client: "Customer Service",
    mediation_service_desc: "Mandatory first step for any complaint.",
    mediation_asf: "ASF Mediator",
    mediation_asf_desc: "Possible referral if no satisfactory response within 2 months.",
    ip_title: "Intellectual Property",
    ip_p1: "All contents (texts, logos, algorithms) are the exclusive property of Younited.",
    ip_italic: "Any reproduction without prior agreement is strictly prohibited.",
    warning_title: "Legal Warning",
    warning_p: "A credit commits you and must be repaid. Check your repayment capacity.",
    regulatory_notice: "Younited operates in accordance with European directives on consumer credit."
  },
  privacy_page: {
    title: "PRIVACY ",
    highlight: "POLICY.",
    desc: "Younited's commitment to the protection of your privacy and the security of your financial data.",
    sections: {
      introduction: "Introduction",
      collecte: "Collection",
      finalites: "Purposes",
      securite: "Security",
      droits: "Your Rights",
      cookies: "Cookies",
      contact: "Contact"
    },
    intro_title: "Our Commitment to Trust",
    intro_p1: "At Younited, trust is the pillar of our relationship. We handle your data with the highest ethical and technological standards.",
    intro_p2: "This policy details how we treat your information with transparency, in accordance with the GDPR.",
    collect_title: "Data We Collect",
    collect_items: [
      { t: "Identity & Civil Status", d: "Full name, date of birth, address, and valid identification documents." },
      { t: "Financial Information", d: "Income, expenses, and bank statements via Open Banking for creditworthiness analysis." }
    ],
    purpose_title: "Why Do We Collect Your Data?",
    purpose_items: [
      "Real-time creditworthiness analysis and credit scoring",
      "Drafting and execution of the loan agreement",
      "Anti-Money Laundering and Counter-Terrorism Financing (AML-CTF) compliance",
      "Securing transactions and preventing fraudulent activities"
    ],
    security_title: "Bank-Grade Security",
    security_h3: "End-to-End Encryption",
    security_p: "Your data is encrypted using the AES-256 protocol and stored on highly secure infrastructures located exclusively within the European Union.",
    rights_title: "Your Fundamental Rights",
    rights_p: "The GDPR gives you total control over your personal data.",
    rights_items: [
      { t: "Access & Portability", d: "Obtain a copy of your data in a structured format." },
      { t: "Rectification & Erasure", d: "Correct your information or request its definitive deletion (Right to be Forgotten)." }
    ],
    cookies_title: "Cookie Management",
    cookies_p: "We use strictly necessary cookies and performance trackers to optimize your simulation journey.",
    cookies_btn: "Manage Preferences",
    contact_title: "Data Protection Officer (DPO)",
    contact_h3: "Question or Request?",
    contact_p: "Our DPO is your dedicated point of contact for any questions regarding your personal data.",
    contact_btn: "Contact DPO",
    contact_notice: "Response guaranteed within a maximum of 30 days.",
    footer_note: "Last updated on {{date}}"
  },
  cookies_page: {
    title: "COOKIE ",
    highlight: "POLICY.",
    desc: "Transparency on the use of trackers on the Younited platform.",
    sections: {
      definition: "What is it?",
      types: "Cookie types",
      gestion: "Management",
      conservation: "Duration",
      tiers: "Third parties"
    },
    def_title: "What is a cookie?",
    def_p1: "A cookie is a small text file placed on your terminal during your visit to our site.",
    def_quote: "It allows us to recognize you and remember your simulation preferences for a seamless journey.",
    types_title: "Cookies we use",
    types_items: [
      { t: "Essential", d: "Necessary for site operation, security, and electronic signature.", s: "Required" },
      { t: "Analytical", d: "Anonymized audience measurement to improve ergonomics and our services.", s: "Optional" },
      { t: "Marketing", d: "Personalization of advertising offers based on your interests.", s: "Optional" }
    ],
    manage_title: "Control your preferences",
    manage_h3: "Settings Center",
    manage_p: "You have the freedom to accept or decline each cookie category granularly.",
    manage_btn: "Open settings",
    manage_note: "Declining certain cookies may alter the fluidity of your user experience.",
    retention_title: "Retention period",
    retention_th1: "Tracker type",
    retention_th2: "Max Duration",
    retention_rows: [
      { t: "Technical session", v: "Visit duration" },
      { t: "User consent", v: "6 months" },
      { t: "Audience analysis", v: "13 months" }
    ],
    footer_info: "Younited strictly respects international data protection standards and the GDPR."
  }
};
