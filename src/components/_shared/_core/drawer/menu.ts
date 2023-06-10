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
    title: [
      {
        key: 'HR Admin', title: 'Dashboard'
      },
      {
        key: 'Employee', title: 'Dashboard'
      }],
    icons: AiFillHome,
    roles: ['HR Admin', 'Employee']
  },
  {
    key: 'company-management',
    path: '/company-management',
    title: [
      { key: 'HR Admin', title: 'Company Management' },
      { key: 'Employee', title: 'Employement' }
    ],
    icons: HiBuildingOffice,
    hasChild: true,
    roles: ['HR Admin', 'Employee'],
    child: [
      {
        path: '/company-management/company-profile',
        title: 'Company Profile',
        roles: ['HR Admin']
      },
      {
        path: '/company-management/department',
        title: 'Departments',
        roles: ['HR Admin']
      },
      {
        path: '/company-management/work-schedule',
        title: 'Work Schedule',
        roles: ['HR Admin']
      },
      {
        path: '/company-management/employees',
        title: 'Employees',
        roles: ['HR Admin']
      },
      {
        path: '/company-management/annual-work-calendar',
        title: 'Annual Work Calendar',
        roles: ['HR Admin']
      },
      {
        path: '/employe/employement/profile-information',
        title: 'Profile Information',
        roles: ['Employee']
      }
    ],
  },
  {
    key: 'attendance-leave',
    path: '/attendance-leave',
    title: [
      { key: 'HR Admin', title: 'Attendance & Leave' }
    ],
    icons: BsFillCalendar2Fill,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/attendance-leave/leave-summary',
        title: 'Leave Summary',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/configuration',
        title: 'Configuration',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/balance',
        title: 'Balance',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/off-in-lieu',
        title: 'Off-in-lieu',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/enchasment',
        title: 'Enchasment',
        roles: ['HR Admin']
      },
    ],
  },
  {
    key: 'compensation-benefits',
    path: '/compensation-benefits',
    title: [
      { key: 'HR Admin', title: 'Compensation & Benefits' }
    ],
    icons: HiCurrencyDollar,
    roles: ['HR Admin']
  },
  {
    key: 'reimbursement',
    path: '/reimbursement',
    title: [
      { key: 'HR Admin', title: 'Reimbursement' }
    ],
    icons: GiReceiveMoney,
    roles: ['HR Admin']
  },
  {
    key: 'internal-reports',
    path: '/internal-reports',
    title: [
      { key: 'HR Admin', title: 'Internal Reports' }
    ],
    icons: HiDocumentReport,
    roles: ['HR Admin']
  },
  {
    key: 'payroll-disbursement',
    path: '/payroll-disbursement',
    title: [
      { key: 'HR Admin', title: 'Payroll & Disbursement' }
    ],
    icons: TbMoodDollar,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/payroll-disbursement/payroll-assistant',
        title: 'Payroll Assistant',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/attendance',
        title: 'Attendance',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/payroll',
        title: 'Payroll',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/disbursement',
        title: 'Disbursement',
        roles: ['HR Admin']
      },
    ],
  },
  {
    key: 'package-management',
    path: '/package-management',
    title: [
      { key: 'HR Admin', title: 'Package Management' }
    ],
    icons: HiTicket,
    roles: ['HR Admin']
  },
];
