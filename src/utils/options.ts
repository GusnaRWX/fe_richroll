import { Option } from '@/types/option';

export const maritialStatus: Array<Option.Mapper> = [
  { label: 'Single', value: '1' },
  { label: 'Married', value: '2' },
  { label: 'Divorced', value: '3' },
  { label: 'Separated', value: '4' },
  { label: 'Widowed', value: '5' },
  { label: 'Domestic Partnership', value: '6' },
  { label: 'Civil Union', value: '7' },
  { label: 'Annuled', value: '8' }
];

export const religions: Array<Option.Mapper> = [
  { label: 'Islam', value: '1' },
  { label: 'Christian', value: '2' },
  { label: 'Buddhist', value: '3' },
  { label: 'Hindu', value: '4' },
  { label: 'Catholic', value: '5' }
];

export const IDTypes: Array<Option.Mapper> = [
  { label: 'KTP', value: '0' },
  { label: 'Nomor wajib pajak', value: '1' },
  { label: 'Passport', value: '2' }
];

export const employeeItems: Array<Option.Mapper> = [
  { label: '< 10', value: '1' },
  { label: '< 25', value: '2' },
  { label: '< 50', value: '3' },
  { label: '> 50', value: '4' }
];

export const relationshipItems: Array<Option.Mapper> = [
  { label: 'Parent', value: '1' },
  { label: 'Sibling', value: '2' },
  { label: 'Spouse', value: '3' },
  { label: 'Others', value: '0' }
];

export const LeaveTypeItems: Array<Option.Mapper> = [
  // {value: '0', label: 'Leave'}
  { value: '1', label: 'Annual Leave' },
  { value: '2', label: 'Child Care Leavee' },
  { value: '3', label: 'Maternity Leave' },
  { value: '4', label: 'Paternity Leave' },
  { value: '5', label: 'Shared Parental Leave' },
  { value: '6', label: 'Sick leave' },
];

export const LeaveTypeStatus: Array<Option.Mapper> = [
  { value: '1', label: 'Paid' },
  { value: '2', label: 'Unpaid' }
];