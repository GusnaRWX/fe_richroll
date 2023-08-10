import { Icons } from '@/utils/assetsConstant';

export const LocalizationsMenu = [
  {
    name: 'EN',
    codeName: 'en',
    nativeName: 'EN',
    lang: {
      en: { nativeName: 'English' }
    },
    locale: 'en_US',
    icons: Icons.ENGLISH_ICON,
    site: 'Singapore',
    timezone: 'Asia/Singapore'
  },
  {
    name: 'ID',
    codeName: 'id',
    lang: {
      in: { nativeName: 'Indonesian' }
    },
    locale: 'id_ID',
    nativeName: 'ID',
    icons: Icons.ENGLISH_ICON,
    site: 'Indonesia',
    timezone: 'Asia/Jakarta'
  },
  {
    name: 'MY',
    codeName: 'ms',
    nativeName: 'MS',
    lang: {
      ms: { nativeName: 'Malay' }
    },
    locale: 'ms_MY',
    icons: Icons.ENGLISH_ICON,
    site: 'Malaysia',
    timezone: 'Asia/Kuala_Lumpur'
  },
  {
    name: 'CN',
    codeName: 'zh',
    nativeName: 'ZH',
    lang: {
      zh: { nativeName: 'Chinese' }
    },
    locale: 'zh_CN',
    icons: Icons.ENGLISH_ICON,
    site: 'China',
    timezone: 'Asia/Shanghai'
  },
];