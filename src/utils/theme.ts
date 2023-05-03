import { createTheme } from '@mui/material';
import { DM_Sans } from 'next/font/google';

export const DMSans = DM_Sans({
  weight:['400','500','700'],
  subsets: ['latin'],
  display: 'swap',
  fallback:['Inter']
});

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
      main: '#223567'
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
      main: '#8DD0B8'
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
    }
  },
  typography: {
    fontFamily: DMSans.style.fontFamily
  }
});

export default theme;