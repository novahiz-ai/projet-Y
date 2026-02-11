
export const legal = {
  legal_page: {
    title: "JURIDISK ",
    highlight: "INFORMATION.",
    desc: "Obligatorisk information om utgivaren och plattformens licenser.",
    label: "Juridisk dossier",
    sections: {
      editeur: "Utgivare",
      agrement: "Tillstånd",
      hebergement: "Hosting",
      donnees: "Data",
      mediation: "Medling",
      cookies: "Cookies",
      propriete: "Egendom"
    },
    editor_title: "Webbplatsutgivare",
    editor_p1: "Webbplatsen ges ut av företaget Younited, ledande inom direktkredit i Europa.",
    editor_identity: "Identitet",
    editor_contact: "Kontakt",
    editor_address: "21 rue de Châteaudun, 75009 Paris, Frankrike",
    licensing_title: "Tillstånd & Reglering",
    licensing_p1: "Younited est un établissement de crédit et prestataire de services d'investissement agréé.",
    licensing_acpr: "ACPR",
    licensing_acpr_desc: "Tillstånd nr 16488 utfärdat av den franska tillsynsmyndigheten ACPR.",
    licensing_orias: "ORIAS",
    licensing_orias_desc: "Registreringsnummer 11061269 som försäkringsförmedlare.",
    gdpr_title: "Dataskydd (GDPR)",
    gdpr_p1: "Vi lägger högsta vikt vid säkerheten för dina personuppgifter.",
    gdpr_purposes: "Ändamål",
    gdpr_purposes_desc: "Kreditsimulering, avtalshantering, bedrägeribekämpning.",
    gdpr_retention: "Varaktighet",
    gdpr_retention_desc: "Lagring enligt lagliga skyldigheter (5 till 10 år).",
    gdpr_recipients: "Mottagare",
    gdpr_recipients_desc: "Interna avdelningar, bankpartners, tillsynsmyndigheter.",
    gdpr_rights_label: "Dina rättigheter",
    gdpr_rights_desc: "Tillgång, rättelse, radering. Kontakt: dpo@younited-credit.fr",
    mediation_title: "Medling & Klagomål",
    mediation_p1: "Vid tvist prioriterar vi alltid en fredlig lösning.",
    mediation_service_client: "Kundtjänst",
    mediation_service_desc: "Första obligatoriska steget för alla klagomål.",
    mediation_asf: "ASF Medlare",
    mediation_asf_desc: "Möjlighet att vända sig till medlare om inget tillfredsställande svar ges inom 2 månader.",
    ip_title: "Immaterialrätt",
    ip_p1: "Allt innehåll (texter, logotyper, algoritmer) tillhör exklusivt Younited.",
    ip_italic: "All reproduktion utan föregående medgivande är strängt förbjuden.",
    warning_title: "Juridisk varning",
    warning_p: "Ett lån är bindande och måste återbetalas. Kontrollera din återbetalningsförmåga.",
    regulatory_notice: "Younited verkar i enlighet med europeiska direktiv om konsumentkrediter."
  },
  privacy_page: {
    title: "INTEGRITETS-",
    highlight: "POLICY.",
    desc: "Youniteds åtagande för skyddet av din integritet och säkerheten för dina finansiella data.",
    sections: {
      introduction: "Introduktion",
      collecte: "Insamling",
      finalites: "Ändamål",
      securite: "Säkerhet",
      droits: "Dina rättigheter",
      cookies: "Cookies",
      contact: "Kontakt"
    },
    intro_title: "Vårt Åtagande för Förtroende",
    intro_p1: "Hos Younited är förtroende pelaren i vår relation. Vi hanterar dina data med högsta etiska och tekniska standarder.",
    intro_p2: "Denna policy beskriver hur vi hanterar din information med transparens, i enlighet med GDPR.",
    collect_title: "Data Vi Samlar In",
    collect_items: [
      { t: "Identitet & Civilstånd", d: "Efternamn, förnamn, födelsedatum, adress och giltiga identitetshandlingar." },
      { t: "Finansiell Information", d: "Inkomster, utgifter och kontoutdrag via Open Banking för kreditvärdighetsanalys." }
    ],
    purpose_title: "Varför Samlar Vi In Dina Data?",
    purpose_items: [
      "Kreditvärdighetsanalys och kreditscoring i realtid",
      "Upprättande och genomförande av låneavtalet",
      "Efterlevnad av lagstadgade krav mot penningtvätt (AML/CFT)",
      "Säkring av transaktioner och bedrägeribekämpning"
    ],
    security_title: "Säkerhet på Banknivå",
    security_h3: "End-to-End Kryptering",
    security_p: "Dina data är krypterade enligt AES-256-protokollet och lagras på högdsäkra servrar uteslutande inom Europeiska unionen.",
    rights_title: "Dina Grundläggande Rättigheter",
    rights_p: "GDPR ger dig total kontroll över dina personuppgifter.",
    rights_items: [
      { t: "Tillgång & Portabilitet", d: "Få en kopia av dina data i ett strukturerat format." },
      { t: "Rättelse & Radering", d: "Korrigera din information eller begär permanent borttagning (Rätten att bli bortglömd)." }
    ],
    cookies_title: "Cookie-hantering",
    cookies_p: "Vi använder strikt nödvändiga cookies och spårare för att optimera din simuleringsupplevelse.",
    cookies_btn: "Hantera Inställningar",
    contact_title: "Dataskyddsombud (DPO)",
    contact_h3: "Frågor eller Förfrågningar?",
    contact_p: "Vårt dataskyddsombud är din dedikerade kontaktperson för alla frågor rörande dina personuppgifter.",
    contact_btn: "Kontakta DPO",
    contact_notice: "Svar garanteras inom maximalt 30 dagar.",
    footer_note: "Uppdaterad den {{date}}"
  },
  cookies_page: {
    title: "COOKIE-",
    highlight: "POLICY.",
    desc: "Transparens kring användningen av spårare på Younited-plattformen.",
    sections: {
      definition: "Vad är det?",
      types: "Cookie-typer",
      gestion: "Hantering",
      conservation: "Varaktighet",
      tiers: "Tredje part"
    },
    def_title: "Vad är en cookie?",
    def_p1: "En cookie är en liten textfil som placeras på din enhet vid ditt besök på vår webbplats.",
    def_quote: "Den tillåter oss att känna igen dig och komma ihåg dina simuleringsinställningar för en smidig användarresa.",
    types_title: "Cookies vi använder",
    types_items: [
      { t: "Nödvändiga", d: "Oumbärliga för webbplatsens funktion, säkerhet och elektronisk signering.", s: "Obligatorisk" },
      { t: "Analytiska", d: "Anonymiserad trafikmätning för att förbättra användarvänligheten och våra tjänster.", s: "Valfri" },
      { t: "Marketing", d: "Anpassning av reklamerbjudanden baserat på dina intressen.", s: "Valfri" }
    ],
    manage_title: "Kontrollera dina inställningar",
    manage_h3: "Inställningscenter",
    manage_p: "Du har friheten att acceptera eller avböja varje cookie-kategori individuellt.",
    manage_btn: "Öppna inställningar",
    manage_note: "Att avböja vissa cookies kan påverka smidigheten i din användarupplevelse.",
    retention_title: "Lagringstid",
    retention_th1: "Typ av spårare",
    retention_th2: "Max varaktighet",
    retention_rows: [
      { t: "Teknisk session", v: "Besökets varaktighet" },
      { t: "Samtycke", v: "6 månader" },
      { t: "Analys", v: "13 månader" }
    ],
    footer_info: "Younited följer strikt europeiska dataskyddsstandarder och GDPR."
  }
};
