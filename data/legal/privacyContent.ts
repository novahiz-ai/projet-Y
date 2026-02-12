
import { TFunction } from 'i18next';

export const getPrivacyContent = (t: TFunction) => ({
  intro: {
    title: t('privacy_page.intro_title'),
    p1: t('privacy_page.intro_p1'),
    p2: t('privacy_page.intro_p2')
  },
  collection: {
    title: t('privacy_page.collect_title'),
    items: t('privacy_page.collect_items', { returnObjects: true }) as any[]
  },
  purposes: {
    title: t('privacy_page.purpose_title'),
    items: t('privacy_page.purpose_items', { returnObjects: true }) as string[]
  },
  security: {
    title: t('privacy_page.security_title'),
    h3: t('privacy_page.security_h3'),
    p: t('privacy_page.security_p')
  },
  rights: {
    title: t('privacy_page.rights_title'),
    p: t('privacy_page.rights_p'),
    items: t('privacy_page.rights_items', { returnObjects: true }) as any[]
  }
});
