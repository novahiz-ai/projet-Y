
export const legal = {
  legal_page: {
    title: "AVISO ",
    highlight: "LEGAL.",
    desc: "Información obligatoria sobre el editor y las licencias de la plataforma.",
    label: "Expediente Legal",
    sections: {
      editeur: "Editor",
      agrement: "Autorizaciones",
      hebergement: "Alojamiento",
      donnees: "Datos",
      mediation: "Mediación",
      cookies: "Cookies",
      propriete: "Propiedad"
    },
    editor_title: "Editor del sitio",
    editor_p1: "El sitio está editado por la sociedad Younited, líder del crédito instantáneo en Europa.",
    editor_identity: "Identidad",
    editor_contact: "Contacto",
    editor_address: "21 rue de Châteaudun, 75009 París, Francia",
    licensing_title: "Autorizaciones & Regulación",
    licensing_p1: "Younited es una entidad de crédito y proveedor de servicios de inversión autorizado.",
    licensing_acpr: "ACPR",
    licensing_acpr_desc: "Autorización n°16488 emitida por la Autoridad de Control Prudencial y de Resolución.",
    licensing_orias: "ORIAS",
    licensing_orias_desc: "Inscripción n°11061269 como corredor de seguros.",
    gdpr_title: "Protección de datos (RGPD)",
    gdpr_p1: "Damos máxima importancia a la seguridad de sus datos personales.",
    gdpr_purposes: "Finalidades",
    gdpr_purposes_desc: "Simulación de crédito, gestión de contrato, prevención de fraude.",
    gdpr_retention: "Duración",
    gdpr_retention_desc: "Conservación según obligaciones legales (de 5 a 10 años).",
    gdpr_recipients: "Destinatarios",
    gdpr_recipients_desc: "Servicios internos, socios bancarios, autoridades regulatorias.",
    gdpr_rights_label: "Sus derechos",
    gdpr_rights_desc: "Acceso, rectificación, supresión. Contacto: dpo@younited-credit.fr",
    mediation_title: "Mediación & Reclamaciones",
    mediation_p1: "En caso de litigio, priorizamos siempre la resolución amistosa.",
    mediation_service_client: "Servicio al Cliente",
    mediation_service_desc: "Primer paso obligatorio para cualquier reclamación.",
    mediation_asf: "Mediador ASF",
    mediation_asf_desc: "Posibilidad de recurso si no hay respuesta satisfactoria en 2 meses.",
    ip_title: "Propiedad Intelectual",
    ip_p1: "Todos los contenidos (textos, logos, algoritmos) son propiedad exclusiva de Younited.",
    ip_italic: "Cualquier reproducción sin acuerdo previo está estrictamente prohibida.",
    warning_title: "Advertencia Legal",
    warning_p: "El crédito te compromete y debe ser devuelto. Comprueba tu capacidad de devolución.",
    regulatory_notice: "Younited opera de acuerdo con las directivas europeas sobre crédito al consumo."
  },
  privacy_page: {
    title: "POLÍTICA DE ",
    highlight: "PRIVACIDAD.",
    desc: "Compromiso de Younited para la protección de su privacidad y la seguridad de sus datos financieros.",
    sections: {
      introduction: "Introducción",
      collecte: "Recogida",
      finalites: "Finalidades",
      securite: "Seguridad",
      droits: "Sus Derechos",
      cookies: "Cookies",
      contact: "Contacto"
    },
    intro_title: "Nuestro Compromiso de Confianza",
    intro_p1: "En Younited, la confianza es el pilar de nuestra relación. Tratamos sus datos con el máximo rigor ético y tecnológico.",
    intro_p2: "Esta política detalla cómo tratamos su información con transparencia, de acuerdo con el RGPD.",
    collect_title: "Datos que Recogemos",
    collect_items: [
      { t: "Identidad y Estado Civil", d: "Apellidos, nombre, fecha de nacimiento, dirección y documentos de identidad válidos." },
      { t: "Información Financiera", d: "Ingresos, gastos y extractos bancarios mediante Open Banking para el análisis de solvencia." }
    ],
    purpose_title: "¿Por qué Recogemos sus Datos?",
    purpose_items: [
      "Análisis de solvencia y calificación crediticia en tiempo real",
      "Redacción y ejecución del contrato de préstamo",
      "Cumplimiento de las obligaciones legales de prevención del blanqueo de capitales (PBC/FT)",
      "Aseguramiento de las transacciones y prevención del fraude"
    ],
    security_title: "Seguridad de Nivel Bancario",
    security_h3: "Encriptación de Extremo a Extremo",
    security_p: "Sus datos están encriptados mediante el protocolo AES-256 y almacenados en infraestructuras altamente seguras situadas exclusivamente en la Unión Europea.",
    rights_title: "Sus Derechos Fundamentales",
    rights_p: "El RGPD le otorga el control total sobre sus datos personales.",
    rights_items: [
      { t: "Acceso y Portabilidad", d: "Obtenga una copia de sus datos en un format estructurado." },
      { t: "Rectificación y Supresión", d: "Corrija su información o solicite su eliminación definitiva (Derecho al Olvido)." }
    ],
    cookies_title: "Gestión de Cookies",
    cookies_p: "Utilizamos cookies estrictamente necesarias y rastreadores de rendimiento para optimizar su experiencia de simulación.",
    cookies_btn: "Gestionar Preferencias",
    contact_title: "Delegado de Protección (DPO)",
    contact_h3: "¿Pregunta o Solicitud?",
    contact_p: "Nuestro DPO es su punto de contacto dedicado para cualquier consulta relacionada con sus datos personales.",
    contact_btn: "Contactar al DPO",
    contact_notice: "Respuesta garantizada en un plazo máximo de 30 días.",
    footer_note: "Actualizado el {{date}}"
  },
  cookies_page: {
    title: "POLÍTICA DE ",
    highlight: "COOKIES.",
    desc: "Transparencia sobre el uso de rastreadores en la plataforma Younited.",
    sections: {
      definition: "¿Qué es?",
      types: "Tipos de cookies",
      gestion: "Gestión",
      conservation: "Duración",
      tiers: "Terceros"
    },
    def_title: "¿Qué es una cookie?",
    def_p1: "Una cookie es un pequeño archivo de texto depositado en su terminal durante su visita a nuestro sitio.",
    def_quote: "Nos permite reconocerle y memorizar sus preferencias de simulación para un proceso fluido.",
    types_title: "Cookies que utilizamos",
    types_items: [
      { t: "Esenciales", d: "Indispensables para el funcionamiento del sitio, la seguridad y la firma electrónica.", s: "Obligatorio" },
      { t: "Analíticas", d: "Medición de audiencia anonimizada para mejorar la ergonomía y nuestros servicios.", s: "Opcional" },
      { t: "Marketing", d: "Personalización de ofertas publicitarias en función de sus intereses.", s: "Opcional" }
    ],
    manage_title: "Controle sus preferencias",
    manage_h3: "Centro de configuración",
    manage_p: "Puede aceptar o rechazar cada categoría de cookie de manera granular.",
    manage_btn: "Abrir ajustes",
    manage_note: "El rechazo de ciertas cookies puede alterar la fluidez de su experiencia de usuario.",
    retention_title: "Periodo de conservación",
    retention_th1: "Tipo de rastreador",
    retention_th2: "Duración Máx",
    retention_rows: [
      { t: "Sesión técnica", v: "Duración de la visita" },
      { t: "Consentimiento", v: "6 meses" },
      { t: "Análisis", v: "13 meses" }
    ],
    footer_info: "Younited respeta los estándares europeos de protección de datos y el RGPD."
  }
};
