import { Icons } from '@/utils/assetsConstant';

export const LocalizationsMenu = [
  {
    name: 'EN',
    codeName: 'en',
    nativeName: 'English',
    lang: {
      en: { nativeName: 'English' }
    },
    locale: 'en_US',
    icons: Icons.ENGLISH_ICON
  },
  {
    name: 'ID',
    codeName: 'id',
    lang: {
      in: { nativeName: 'Indonesian' }
    },
    locale: 'id_ID',
    nativeName: 'Indonesian',
    icons: Icons.ENGLISH_ICON
  },
  {
    name: 'MY',
    codeName: 'ms',
    nativeName: 'Malay',
    lang: {
      ms: { nativeName: 'Malay' }
    },
    locale: 'ms_MY',
    icons: Icons.ENGLISH_ICON
  },
  {
    name: 'CN',
    codeName: 'zh',
    nativeName: 'Chinese',
    lang: {
      zh: { nativeName: 'Chinese' }
    },
    locale: 'zh_CN',
    icons: Icons.ENGLISH_ICON
  },
];