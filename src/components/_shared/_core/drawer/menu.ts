import { AiFillHome } from 'react-icons/ai';
import { HiBuildingOffice, HiCurrencyDollar } from 'react-icons/hi2';
import { CoreLayout } from '@/types/component';
import { BsFillCalendar2Fill } from 'react-icons/bs';
import { HiDocumentReport, HiOutlineSupport, HiUser } from 'react-icons/hi';

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
        path: '/attendance-leave/settings',
        title: 'Settings',
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
    key: 'internal-reports',
    path: '/internal-reports',
    title: 'Internal Reports',
    icons: HiDocumentReport,
  },
  {
    key: 'package-management',
    path: '/package-management',
    title: 'Package Management',
    icons: HiOutlineSupport,
  },
  {
    key: 'payroll-disbursement',
    path: '/payroll-disbursement',
    title: 'Payroll & Disbursement',
    icons: HiUser,
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
    ],
  },
];
