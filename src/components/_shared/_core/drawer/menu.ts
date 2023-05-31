import { AiFillHome } from 'react-icons/ai';
import { HiBuildingOffice, HiCurrencyDollar } from 'react-icons/hi2';
import { CoreLayout } from '@/types/component';
import { BsFillCalendar2Fill } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { TbMoodDollar } from 'react-icons/tb';
import { HiDocumentReport, HiTicket } from 'react-icons/hi';

export const Menus: CoreLayout.SidebarItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard/',
    title: 'Dashboard',
    icons: AiFillHome,
  },
  {
    key: 'company-management',
    path: '/company-management',
    title: 'Company Management',
    icons: HiBuildingOffice,
    hasChild: true,
    child: [
      {
        path: '/company-management/company-profile',
        title: 'Company Profile',
      },
      {
        path: '/company-management/department',
        title: 'Departments',
      },
      {
        path: '/company-management/work-schedule',
        title: 'Work Schedule',
      },
      {
        path: '/company-management/employees',
        title: 'Employees',
      },
      {
        path: '/company-management/annual-work-calendar',
        title: 'Annual Work Calendar',
      },
    ],
  },
  {
    key: 'attendance-leave',
    path: '/attendance-leave',
    title: 'Attendance & Leave',
    icons: BsFillCalendar2Fill,
    hasChild: true,
    child: [
      {
        path: '/attendance-leave/leave-summary',
        title: 'Leave Summary',
      },
      {
        path: '/attendance-leave/configuration',
        title: 'Configuration',
      },
      {
        path: '/attendance-leave/balance',
        title: 'Balance',
      },
      {
        path: '/attendance-leave/off-in-lieu',
        title: 'Off-in-lieu',
      },
      {
        path: '/attendance-leave/enchasment',
        title: 'Enchasment',
      },
    ],
  },
  {
    key: 'compensation-benefits',
    path: '/compensation-benefits',
    title: 'Compensation & Benefits',
    icons: HiCurrencyDollar,
  },
  {
    key: 'reimbursement',
    path: '/reimbursement',
    title: 'Reimbursement',
    icons: GiReceiveMoney,
  },
  {
    key: 'internal-reports',
    path: '/internal-reports',
    title: 'Internal Reports',
    icons: HiDocumentReport,
  },
  {
    key: 'payroll-disbursement',
    path: '/payroll-disbursement',
    title: 'Payroll & Disbursement',
    icons: TbMoodDollar,
    hasChild: true,
    child: [
      {
        path: '/payroll-disbursement/payroll-assistant',
        title: 'Payroll Assistant',
      },
      {
        path: '/payroll-disbursement/attendance',
        title: 'Attendance',
      },
      {
        path: '/payroll-disbursement/payroll',
        title: 'Payroll',
      },
      {
        path: '/payroll-disbursement/disbursement',
        title: 'Disbursement',
      },
    ],
  },
  {
    key: 'package-management',
    path: '/package-management',
    title: 'Package Management',
    icons: HiTicket,
  },
];
