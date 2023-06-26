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
        prefix: 'dashboard'
      },
      {
        key: 'Employee', title: 'Dashboard', prefix: 'dashboard'
      },
      {
        key: 'Super Admin', title: 'Dashboard', prefix: 'dashboard'
      }],
    icons: AiFillHome,
    roles: ['HR Admin', 'Employee', 'Super Admin']
  },
  // Company Management (HR Admin and Employee)
  {
    key: 'company-management',
    path: '/company-management',
    title: [
      { key: 'HR Admin', title: 'Company Management', prefix: 'company_management' },
      { key: 'Employee', title: 'Employement', prefix: 'employment' },
    ],
    icons: HiBuildingOffice,
    hasChild: true,
    roles: ['HR Admin', 'Employee'],
    child: [
      {
        path: '/company-management/company-profile',
        title: 'Company Profile',
        prefix: 'company_management_profile',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/department',
        title: 'Departments',
        prefix: 'company_management_departments',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/work-schedule',
        title: 'Work Schedule',
        prefix: 'company_management_work_schedule',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/employees',
        title: 'Employees',
        prefix: 'company_management_employees',
        roles: ['HR Admin'],
      },
      {
        path: '/company-management/annual-work-calendar',
        title: 'Annual Work Calendar',
        prefix: 'company_management_annual_work_calendars',
        roles: ['HR Admin'],
      },
      {
        path: '/employe/employement/profile-information',
        title: 'Profile Information',
        prefix: 'company_management_profile_information',
        roles: ['Employee'],
      },
    ],
  },
  // Attendance & Leave
  {
    key: 'attendance-leave',
    path: '/attendance-leave',
    title: [{ key: 'HR Admin', title: 'Attendance & Leave', prefix: 'attendance_&_leave' }],
    icons: BsFillCalendar2Fill,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/attendance-leave/attendance-entries',
        title: 'Attendance Entries',
        prefix: 'attendance_&_leave_attendance_entries',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/leave-summary',
        title: 'Leave Summary',
        prefix: 'attendance_&_leave_leave_summary',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/leave-entries',
        title: 'Leave Entries',
        prefix: 'attendance_&_leave_leave_entries',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/overtime-summary',
        title: 'Overtime Summary',
        prefix: 'attendance_&_leave_overtime_summary',
        roles: ['HR Admin']
      },
      {
        path: '/attendance-leave/configuration',
        title: 'Configuration',
        prefix: 'attendance_&_leave_configuration',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/balance',
        title: 'Balance',
        prefix: 'attendance_&_leave_balance',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/off-in-lieu',
        title: 'Off-in-lieu',
        prefix: 'attendance_&_leave_off_in_lieu',
        roles: ['HR Admin'],
      },
      {
        path: '/attendance-leave/enchasment',
        title: 'Enchasment',
        prefix: 'attendance_&_leave_enchasment',
        roles: ['HR Admin'],
      },
    ],
  },
  // Compensation & Benefits
  {
    key: 'compensation-benefits',
    path: '/compensation-benefits',
    title: [{ key: 'HR Admin', title: 'Compensation & Benefits', prefix: 'compensation_&_benefits' }],
    icons: HiCurrencyDollar,
    roles: ['HR Admin'],
  },
  // Reimbursement
  {
    key: 'reimbursement',
    path: '/reimbursement',
    title: [{ key: 'HR Admin', title: 'Reimbursement', prefix: 'reimbursement' }],
    icons: GiReceiveMoney,
    roles: ['HR Admin'],
  },
  // Internal Reports
  {
    key: 'internal-reports',
    path: '/internal-reports',
    title: [{ key: 'HR Admin', title: 'Internal Reports', prefix: 'internal_reports' }],
    icons: HiDocumentReport,
    roles: ['HR Admin'],
  },
  // Payroll & Disbursement
  {
    key: 'payroll-disbursement',
    path: '/payroll-disbursement',
    title: [{ key: 'HR Admin', title: 'Payroll & Disbursement', prefix: 'payroll_&_disbursement' }],
    icons: TbMoodDollar,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/payroll-disbursement/payroll-assistant',
        title: 'Payroll Assistant',
        prefix: 'payroll_&_disbursement_payroll_assistant',
        roles: ['HR Admin'],
      },
      {
        path: '/payroll-disbursement/attendance',
        title: 'Attendance Summary',
        prefix: 'payroll_&_disbursement_attendance_summary',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/payroll',
        title: 'Payroll Reports',
        prefix: 'payroll_&_disbursement_payroll_reports',
        roles: ['HR Admin']
      },
      {
        path: '/payroll-disbursement/disbursement',
        title: 'Disbursement',
        prefix: 'payroll_&_disbursement_disbursement',
        roles: ['HR Admin'],
      },
    ],
  },
  // Company Management (Super Admin)
  {
    key: 'company-management-admin',
    path: '/company-management-admin',
    title: [
      { key: 'Super Admin', title: 'Company Management', prefix: 'company_management' }
    ],
    icons: HiBuildingOffice,
    roles: ['Super Admin']
  },
  // Account Management
  {
    key: 'account-management',
    path: '/account-management',
    title: [
      { key: 'Super Admin', title: 'Account Management', prefix: 'account_management' }
    ],
    icons: RiAccountCircleFill,
    roles: ['Super Admin']
  },
  // Employee Management
  {
    key: 'employee-management',
    path: '/employee-management',
    title: [
      { key: 'Super Admin', title: 'Employee Management', prefix: 'employee_management' }
    ],
    icons: HiUserGroup,
    roles: ['Super Admin']
  },
  // Payroll Setting
  {
    key: 'payroll-setting',
    path: '/payroll-setting',
    title: [
      { key: 'Super Admin', title: 'Payroll Setting', prefix: 'payroll_setting' }
    ],
    icons: TbMoodDollar,
    roles: ['Super Admin']
  },
  // Reports
  {
    key: 'reports',
    path: '/reports',
    title: [
      { key: 'Super Admin', title: 'Reports', prefix: 'Reports' }
    ],
    icons: HiDocumentReport,
    roles: ['Super Admin']
  },
  // Article Management
  {
    key: 'article-management',
    path: '/article-management',
    title: [
      { key: 'Super Admin', title: 'Article Management', prefix: 'article_management' }
    ],
    icons: RiArticleLine,
    roles: ['Super Admin']
  },
  // Package Management
  {
    key: 'package-management',
    path: '/package-management',
    title: [
      { key: 'HR Admin', title: 'Package Management', prefix: 'package_management' },
      { key: 'Super Admin', title: 'Package Management', prefix: 'package_management' }
    ],
    icons: HiTicket,
    roles: ['HR Admin'],
  },
  {
    key: 'satutory-benefit',
    path: '/satutory-benefit',
    title: [
      { key: 'HR Admin', title: 'Satutory Benefits', prefix: 'satutory_benefits' },
      { key: 'Super Admin', title: 'Satutory Benefits', prefix: 'satutory_benefits' }
    ],
    icons: HiTicket,
    hasChild: true,
    roles: ['HR Admin'],
    child: [
      {
        path: '/satutory-benefit/component',
        title: 'Component',
        prefix: 'satutory_benefits_component',
        roles: ['HR Admin'],
      },
      {
        path: '/satutory-benefit/profile',
        title: 'Profile',
        prefix: 'satutory_benefits_profile',
        roles: ['HR Admin'],
      },
    ],
  },
];
