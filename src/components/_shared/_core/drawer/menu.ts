import { AiFillHome } from 'react-icons/ai';
import { RiArticleLine, RiAccountCircleFill } from 'react-icons/ri';
import { HiBuildingOffice, HiCurrencyDollar } from 'react-icons/hi2';
import { CoreLayout } from '@/types/component';
import { BsFillCalendar2Fill } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { TbMoodDollar } from 'react-icons/tb';
import { HiDocumentReport, HiTicket, HiUserGroup } from 'react-icons/hi';

export const Menus: CoreLayout.SidebarItem[] = [
  // Dashboard
  {
    key: 'dashboard',
    path: '/dashboard/',
    title: [
      {
        key: 'HR Admin',
        title: 'Dashboard',
      },
      {
        key: 'Employee', title: 'Dashboard'
      },
      {
        key: 'Super Admin', title: 'Dashboard'
      }],
    icons: AiFillHome,
    roles: ['HR Admin', 'Employee', 'Super Admin']
  },
  // Company Management (HR Admin and Employee)
  {
    key: 'company-management',
    path: '/company-management',
    title: [
      { key: 'HR Admin', title: 'Company Management' },
      { key: 'Employee', title: 'Employement' },
    ],
    icons: HiBuildingOffice,
    hasChild: true,
    roles: ['HR Admin', 'Employee'],
    child: [
      {
        path: '/company-management/company-profile',
        title: 'Company Profile',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/department',
        title: 'Departments',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/work-schedule',
        title: 'Work Schedule',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/employees',
        title: 'Employees',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/annual-work-calendar',
        title: 'Annual Work Calendar',
        roles: ['HR Admin'],
      },
      {
        path: '/employe/employement/profile-information',
        title: 'Profile Information',
        roles: ['Employee'],
      },
    ],
  },
  // Attendance & Leave
  {
    key: 'attendance-leave',
    path: '/attendance-leave',
    title: [{ key: 'HR Admin', title: 'Attendance & Leave' }],
    icons: BsFillCalendar2Fill,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/attendance-leave/attendance-entries',
        title: 'Attendance Entries',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/leave-summary',
        title: 'Leave Summary',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/leave-entries',
        title: 'Leave Entries',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/overtime-summary',
        title: 'Overtime Summary',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/configuration',
        title: 'Configuration',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/balance',
        title: 'Balance',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/off-in-lieu',
        title: 'Off-in-lieu',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/enchasment',
        title: 'Enchasment',
        roles: ['HR Admin'],
      },
    ],
  },
  // Compensation & Benefits
  {
    key: 'compensation-benefits',
    path: '/compensation-benefits',
    title: [{ key: 'HR Admin', title: 'Compensation & Benefits' }],
    icons: HiCurrencyDollar,
    roles: ['HR Admin'],
  },
  // Reimbursement
  {
    key: 'reimbursement',
    path: '/reimbursement',
    title: [{ key: 'HR Admin', title: 'Reimbursement' }],
    icons: GiReceiveMoney,
    roles: ['HR Admin'],
  },
  // Internal Reports
  {
    key: 'internal-reports',
    path: '/internal-reports',
    title: [{ key: 'HR Admin', title: 'Internal Reports' }],
    icons: HiDocumentReport,
    roles: ['HR Admin'],
  },
  // Payroll & Disbursement
  {
    key: 'payroll-disbursement',
    path: '/payroll-disbursement',
    title: [{ key: 'HR Admin', title: 'Payroll & Disbursement' }],
    icons: TbMoodDollar,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/payroll-disbursement/payroll-assistant',
        title: 'Payroll Assistant',
        roles: ['HR Admin'],
      },
      {
        path: '/payroll-disbursement/attendance',
        title: 'Attendance Summary',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/payroll',
        title: 'Payroll Reports',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/disbursement',
        title: 'Disbursement',
        roles: ['HR Admin'],
      },
    ],
  },
  // Company Management (Super Admin)
  {
    key: 'company-management-admin',
    path: '/company-management-admin',
    title: [
      { key: 'Super Admin', title: 'Company Management' }
    ],
    icons: HiBuildingOffice,
    roles: ['Super Admin']
  },
  // Account Management
  {
    key: 'account-management',
    path: '/account-management',
    title: [
      { key: 'Super Admin', title: 'Account Management' }
    ],
    icons: RiAccountCircleFill,
    roles: ['Super Admin']
  },
  // Employee Management
  {
    key: 'employee-management',
    path: '/employee-management',
    title: [
      { key: 'Super Admin', title: 'Employee Management' }
    ],
    icons: HiUserGroup,
    roles: ['Super Admin']
  },
  // Payroll Setting
  {
    key: 'payroll-setting',
    path: '/payroll-setting',
    title: [
      { key: 'Super Admin', title: 'Payroll Setting' }
    ],
    icons: TbMoodDollar,
    roles: ['Super Admin']
  },
  // Reports
  {
    key: 'reports',
    path: '/reports',
    title: [
      { key: 'Super Admin', title: 'Reports' }
    ],
    icons: HiDocumentReport,
    roles: ['Super Admin']
  },
  // Article Management
  {
    key: 'article-management',
    path: '/article-management',
    title: [
      { key: 'Super Admin', title: 'Article Management' }
    ],
    icons: RiArticleLine,
    roles: ['Super Admin']
  },
  // Package Management
  {
    key: 'package-management',
    path: '/package-management',
    title: [
      { key: 'HR Admin', title: 'Package Management' },
      { key: 'Super Admin', title: 'Package Management' }
    ],
    icons: HiTicket,
    roles: ['HR Admin'],
  },
  {
    key: 'satutory-benefit',
    path: '/satutory-benefit',
    title: [
      { key: 'HR Admin', title: 'Satutory Benefits' },
      { key: 'Super Admin', title: 'Satutory Benefits' }
    ],
    icons: HiTicket,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/satutory-benefit/component',
        title: 'Component',
        roles: ['HR Admin'],
      },
      {
        path: '/satutory-benefit/profile',
        title: 'Profile',
        roles: ['HR Admin'],
      },
    ],
  },
];
