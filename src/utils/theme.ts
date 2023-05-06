import * as React from 'react';
import { PaletteColor, createTheme } from '@mui/material';
import { DM_Sans } from 'next/font/google';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    red: PaletteColor;
    orange: PaletteColor;
    amber: PaletteColor;
    yellow: PaletteColor;
    lime: PaletteColor;
    green: PaletteColor;
    emerald: PaletteColor;
    teal: PaletteColor;
    cyan: PaletteColor;
    lightBlue: PaletteColor;
    indigo: PaletteColor;
    violet: PaletteColor;
    purple: PaletteColor;
    fuchsia: PaletteColor;
    pink: PaletteColor;
    rose: PaletteColor;
  }
  interface TypographyVariants {
    'text-xs': React.CSSProperties;
    'text-sm': React.CSSProperties;
    'text-base': React.CSSProperties;
    'text-lg': React.CSSProperties;
    'text-xl': React.CSSProperties;
    'text-2xl': React.CSSProperties;
    'text-3xl': React.CSSProperties;
    'text-4xl': React.CSSProperties;
    'text-5xl': React.CSSProperties;
    'text-6xl': React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'text-xs'?: React.CSSProperties;
    'text-sm'?: React.CSSProperties;
    'text-base'?: React.CSSProperties;
    'text-lg'?: React.CSSProperties;
    'text-xl'?: React.CSSProperties;
    'text-2xl'?: React.CSSProperties;
    'text-3xl'?: React.CSSProperties;
    'text-4xl'?: React.CSSProperties;
    'text-5xl'?: React.CSSProperties;
    'text-6xl'?: React.CSSProperties;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    red: true;
    orange: true;
    amber: true;
    yellow: true;
    lime: true;
    green: true;
    emerald: true;
    teal: true;
    cyan: true;
    lightBlue: true;
    indigo: true;
    violet: true;
    purple: true;
    fuchsia: true;
    pink: true;
    rose: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'text-xs': true;
    'text-sm': true;
    'text-base': true;
    'text-lg': true;
    'text-xl': true;
    'text-2xl': true;
    'text-3xl': true;
    'text-4xl': true;
    'text-5xl': true;
    'text-6xl': true;
  }
}

export const DMSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Inter']
});

const { palette } = createTheme();
const { augmentColor } = palette;

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      '50': '#E9EFFF',
      '100': '#B5BCCC',
      '200': '#909AB3',
      '300': '#6C789A',
      '400': '#475780',
      '500': '#223567',
      '600': '#1C2C56',
      '700': '#172345',
      '800': '#111A33',
      '900': '#0B1222',
      main: '#223567',
      dark: '#000000',
      light: '#FFFFFF'
    },
    secondary: {
      '50': '#E8F6F1',
      '100': '#D9EFE7',
      '200': '#C6E7DB',
      '300': '#B3E0D0',
      '400': '#A0D8C4',
      '500': '#8DD0B8',
      '600': '#75AD99',
      '700': '#5E8B7B',
      '800': '#46685C',
      '900': '#2F453D',
      main: '#8DD0B8',
      light: '#FCFFFC',
    },
    grey: {
      '50': '#F9FAFB',
      '100': '#F3F4F6',
      '200': '#E5E7EB',
      '300': '#D1D5DB',
      '400': '#9CA3AF',
      '500': '#6B7280',
      '600': '#4B5563',
      '700': '#374151',
      '800': '#1F2937',
      '900': '#111827',
      A400: '#6B7280'
    },
    red: augmentColor({
      color: {
        '50': '#FEF2F2',
        '100': '#FEE2E2',
        '200': '#FECACA',
        '300': '#FCA5A5',
        '400': '#F87171',
        '500': '#EF4444',
        '600': '#DC2626',
        '700': '#B91C1C',
        '800': '#991B1B',
        '900': '#7F1D1D',
        main: '#EF4444'
      }
    }),
    orange: augmentColor({
      color: {
        '50': '#FFF7ED',
        '100': '#FFEDD5',
        '200': '#FED7AA',
        '300': '#FDBA74',
        '400': '#FB923C',
        '500': '#F97316',
        '600': '#EA580C',
        '700': '#C2410C',
        '800': '#9A3412',
        '900': '#7C2D12',
        main: '#F97316'
      }
    }),
    amber: augmentColor({
      color: {
        '50': '#FFFBEB',
        '100': '#FEF3C7',
        '200': '#FDE68A',
        '300': '#FCD34D',
        '400': '#FBBF24',
        '500': '#F59E0B',
        '600': '#D97706',
        '700': '#B45309',
        '800': '#92400E',
        '900': '#78350F',
        main: '#F59E0B'
      }
    }),
    yellow: augmentColor({
      color: {
        '50': '#FEFCE8',
        '100': '#FEF9C3',
        '200': '#FEF08A',
        '300': '#FDE047',
        '400': '#FACC15',
        '500': '#EAB308',
        '600': '#CA8A04',
        '700': '#A16207',
        '800': '#854D0E',
        '900': '#713F12',
        main: '#EAB308'
      }
    }),
    lime: augmentColor({
      color: {
        '50': '#F7FEE7',
        '100': '#ECFCCB',
        '200': '#D9F99D',
        '300': '#BEF264',
        '400': '#A3E635',
        '500': '#84CC16',
        '600': '#65A30D',
        '700': '#4D7C0F',
        '800': '#3F6212',
        '900': '#365314',
        main: '#84CC16'
      }
    }),
    green: augmentColor({
      color: {
        '50': '#F0FDF4',
        '100': '#DCFCE7',
        '200': '#BBF7D0',
        '300': '#86EFAC',
        '400': '#4ADE80',
        '500': '#22C55E',
        '600': '#16A34A',
        '700': '#15803D',
        '800': '#166534',
        '900': '#14532D',
        main: '#22C55E'
      }
    }),
    emerald: augmentColor({
      color: {
        '50': '#ECFDF5',
        '100': '#D1FAE5',
        '200': '#A7F3D0',
        '300': '#6EE7B7',
        '400': '#34D399',
        '500': '#10B981',
        '600': '#059669',
        '700': '#047857',
        '800': '#065F46',
        '900': '#064E3B',
        main: '#10B981'
      }
    }),
    teal: augmentColor({
      color: {
        '50': '#F0FDFA',
        '100': '#CCFBF1',
        '200': '#99F6E4',
        '300': '#5EEAD4',
        '400': '#2DD4BF',
        '500': '#14B8A6',
        '600': '#0D9488',
        '700': '#0F766E',
        '800': '#115E59',
        '900': '#134E4A',
        main: '#14B8A6'
      }
    }),
    cyan: augmentColor({
      color: {
        '50': '#ECFEFF',
        '100': '#CFFAFE',
        '200': '#A5F3FC',
        '300': '#67E8F9',
        '400': '#22D3EE',
        '500': '#06B6D4',
        '600': '#0891B2',
        '700': '#0E7490',
        '800': '#155E75',
        '900': '#164E63',
        main: '#06B6D4'
      }
    }),
    lightBlue: augmentColor({
      color: {
        '50': '#F0F9FF',
        '100': '#E0F2FE',
        '200': '#BAE6FD',
        '300': '#7DD3FC',
        '400': '#38BDF8',
        '500': '#0EA5E9',
        '600': '#0284C7',
        '700': '#0369A1',
        '800': '#075985',
        '900': '#0C4A6E',
        main: '#0EA5E9'
      }
    }),
    indigo: augmentColor({
      color: {
        '50': '#EEF2FF',
        '100': '#E0E7FF',
        '200': '#C7D2FE',
        '300': '#A5B4FC',
        '400': '#818CF8',
        '500': '#6366F1',
        '600': '#4F46E5',
        '700': '#4338CA',
        '800': '#3730A3',
        '900': '#312E81',
        main: '#6366F1'
      }
    }),
    violet: augmentColor({
      color: {
        '50': '#F5F3FF',
        '100': '#EDE9FE',
        '200': '#DDD6FE',
        '300': '#C4B5FD',
        '400': '#A78BFA',
        '500': '#8B5CF6',
        '600': '#7C3AED',
        '700': '#6D28D9',
        '800': '#5B21B6',
        '900': '#4C1D95',
        main: '#8B5CF6'
      }
    }),
    purple: augmentColor({
      color: {
        '50': '#FAF5FF',
        '100': '#F3E8FF',
        '200': '#E9D5FF',
        '300': '#D8B4FE',
        '400': '#C084FC',
        '500': '#A855F7',
        '600': '#9333EA',
        '700': '#7E22CE',
        '800': '#6B21A8',
        '900': '#581C87',
        main: '#A855F7'
      }
    }),
    fuchsia: augmentColor({
      color: {
        '50': '#FDF4FF',
        '100': '#FAE8FF',
        '200': '#F5D0FE',
        '300': '#F0ABFC',
        '400': '#E879F9',
        '500': '#D946EF',
        '600': '#C026D3',
        '700': '#A21CAF',
        '800': '#86198F',
        '900': '#701A75',
        main: '#D946EF'
      }
    }),
    pink: augmentColor({
      color: {
        '50': '#FDF2F8',
        '100': '#FCE7F3',
        '200': '#FBCFE8',
        '300': '#F9A8D4',
        '400': '#F472B6',
        '500': '#EC4899',
        '600': '#DB2777',
        '700': '#BE185D',
        '800': '#9D174D',
        '900': '#831843',
        main: '#EC4899'
      }
    }),
    rose: augmentColor({
      color: {
        '50': '#FFF1F2',
        '100': '#FFE4E6',
        '200': '#FECDD3',
        '300': '#FDA4AF',
        '400': '#FB7185',
        '500': '#F43F5E',
        '600': '#E11D48',
        '700': '#BE123C',
        '800': '#9F1239',
        '900': '#881337',
        main: '#F43F5E'
      }
    }),

  },
  typography: {
    fontFamily: DMSans.style.fontFamily,
    'text-xs': {
      fontSize: '0.75rem'
    },
    'text-sm': {
      fontSize: '0.85rem'
    },
    'text-base': {
      fontSize: '1rem'
    },
    'text-lg': {
      fontSize: '1.125rem'
    },
    'text-xl': {
      fontSize: '1.25rem'
    },
    'text-2xl': {
      fontSize: '1.5rem'
    },
    'text-3xl': {
      fontSize: '1.875rem'
    },
    'text-4xl': {
      fontSize: '2.25rem'
    },
    'text-5xl': {
      fontSize: '3rem'
    },
    'text-6xl': {
      fontSize: '4rem'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF',
          ' .Mui-disabled': {
            backgroundColor: palette.grey[100],
          }
        },
      }
    }
  }
});

export default theme;