import { AiFillHome } from "react-icons/ai";
import { HiBuildingOffice, HiCurrencyDollar } from "react-icons/hi2";
import { CoreLayout } from "@/types/component";
import { BsFillCalendar2Fill } from "react-icons/bs";
import { HiDocumentReport, HiOutlineSupport } from "react-icons/hi";

export const Menus: CoreLayout.SidebarItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard/',
    title: 'Dashboard',
    icons: AiFillHome,
    hasChild: true,
    child: [],
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
        path: '/company-management/departments',
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
    title: 'attendance & Leave',
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
];
