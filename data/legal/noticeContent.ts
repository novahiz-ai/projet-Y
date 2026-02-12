
import { TFunction } from 'i18next';

export const getNoticeContent = (t: TFunction) => ({
  editor: {
    title: t('legal_page.editor_title'),
    p1: t('legal_page.editor_p1'),
    identity: t('legal_page.editor_identity'),
    contact: t('legal_page.editor_contact'),
    address: t('legal_page.editor_address')
  },
  licensing: {
    title: t('legal_page.licensing_title'),
    p1: t('legal_page.licensing_p1'),
    items: [
      { t: t('legal_page.licensing_acpr'), d: t('legal_page.licensing_acpr_desc') },
      { t: t('legal_page.licensing_orias'), d: t('legal_page.licensing_orias_desc') }
    ]
  },
  gdpr: {
    title: t('legal_page.gdpr_title'),
    p1: t('legal_page.gdpr_p1'),
    items: [
      { t: t('legal_page.gdpr_purposes'), d: t('legal_page.gdpr_purposes_desc') },
      { t: t('legal_page.gdpr_retention'), d: t('legal_page.gdpr_retention_desc') },
      { t: t('legal_page.gdpr_recipients'), d: t('legal_page.gdpr_recipients_desc') },
      { t: t('legal_page.gdpr_rights_label'), d: t('legal_page.gdpr_rights_desc') }
    ]
  },
  mediation: {
    title: t('legal_page.mediation_title'),
    p1: t('legal_page.mediation_p1'),
    items: [
      { t: t('legal_page.mediation_service_client'), d: t('legal_page.mediation_service_desc') },
      { t: t('legal_page.mediation_asf'), d: t('legal_page.mediation_asf_desc') }
    ]
  }
});
