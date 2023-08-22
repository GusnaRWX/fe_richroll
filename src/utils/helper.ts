/**
 * Write our own expression
 *
 * @param expression
 * @param value
 * @returns
 */
import { getStorage } from './storage';
import dayjs from 'dayjs';

export const checkRegulerExpression = (expression: string | RegExp, value: string | number): boolean => {
  const regex = new RegExp(expression);
  const stringValue = value.toString();
  return regex.test(stringValue);
};

/**
 * Read File
 *
 * @param file
 * @returns
 */
export const readFile = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) { resolve(e.target?.result as string); };
  reader.onerror = err => reject(err);
  reader.readAsDataURL(file);
});

/**
 *
 * Get File Extension
 *
 * @param {String} filename
 * @returns
 */
export const getFileExtension = (filename: string): string => {
  return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
};

export interface CompanyDataParse {
  id?: string | null;
  imageUrl?: string | null;
  name?: string | null;
  sector?: string | null;
}

export const getCompanyData = () => {
  if (typeof window !== 'undefined') {
    const id = getStorage('kaya_company');
    let parse: CompanyDataParse;
    if (id) {
      parse = JSON.parse(id);
      return parse;
    } else {
      return null;
    }
  }
  return null;
};

interface SectorType {
  isActive: boolean;
  name: string | null
}

export interface UserDataParse {
  email?: string | null;
  name?: string | null;
  employee?: {
    companies: Array<{ logo: string | null, name: string | null, sector: SectorType | null }>
    isActive?: boolean;
    isSelfEmployeeService?: boolean;
    position?: string | null;
  };
  companies: Array<{
    employee: {
      companies?: [],
      isActive?: boolean,
      isSelfEmployeeService?: boolean,
      position?: string | null,
      terminateDate?: string | null,
      terminateNote?: string | null
    },
    logo?: string | null,
    name?: string | null,
    sector?: string | null
  }>
  picture?: string | null;
  roles?: string[];
}

export const getUserData = () => {
  if (typeof window !== 'undefined') {
    const user = getStorage('user');
    let parse: UserDataParse;
    if (user) {
      parse = JSON.parse(user);
      return parse;
    } else {
      return null;
    }
  }
};

export const getSelfService = () => {
  if (typeof window !== 'undefined') {
    const selfService = getStorage('self_service');
    let parse: string | null;
    if (selfService) {
      parse = JSON.parse(selfService);
      return parse;
    }else{
      return null;
    }
  }
};

export const getSelectedRoles = () => {
  if (typeof window !== 'undefined') {
    const roles = getStorage('selected_roles');
    let parse: string | null;
    if (roles) {
      parse = JSON.parse(roles);
      return parse;
    } else {
      return null;
    }
  }
};

export const getSite = () => {
  if (typeof window !== 'undefined') {
    const site = getStorage('site');
    let parse: string | null;
    if (site) {
      parse = site;
      return parse;
    } else {
      return null;
    }
  }
};

export const getTimezone = () => {
  if (typeof window !== 'undefined') {
    const timezone = getStorage('timezone');
    let parse: string | null;
    if (timezone) {
      parse = timezone;
      return parse;
    } else {
      return null;
    }
  }
};

export const convertValue = (name, event) => {
  return {
    target: {
      name, value: event.target.value
    }
  };
};

export const convertChecked = (event) => {
  const { name, checked } = event.target;

  return {
    target: {
      name, value: checked
    }
  };
};

export const convertDateValue = (name, event) => {
  console.log('helpers', event);
  return {
    target: {
      name, value: event.$d
    }
  };
};

export const convertImageParams = (name, value, callback?, onClose?) => {
  console.log(value);
  const files = value;
  const reader = new FileReader();
  reader.readAsDataURL(value);
  reader.onloadend = function () {
    callback(reader.result as string);
  };
  if (onClose) {
    onClose();
  }

  return {
    target: {
      name, value: [files]
    }
  };
};

export const base64ToFile = (base64String: string | undefined, fileName: string): File | null => {
  if (!base64String) {
    return null;
  }

  const mimeType = base64String?.split(';')[0].split(':')[1];

  // Remove the data URL prefix
  const encodedData = base64String?.split(',')[1];

  // Convert base64 to binary
  const buffer = Buffer?.from(encodedData, 'base64');

  // Create a Blob from the Buffer
  const blob = new Blob([buffer as BlobPart], { type: mimeType });

  // Create a File from the Blob
  return new File([blob], fileName);
};

/**
 * Handle for read message from Validation response
 *
 */
export const readValidationResponse = (validationResponse: Array<string>) => {
  return validationResponse.flatMap(value => {
    return Object.keys(value).length > 0 ? Object.values(value).join('') : [];
  });
};

export const getErrorMessage = (error) => {
  let result = '';
  error?.forEach(val => {
    Object.keys(val).forEach(v => {
      result = val[v].join('');
    });
  });
  return result;
};

/**
 * Check if object is empty
 */
export const checkObject = (obj) => {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (!obj[key] || obj[key] === '') {
        return true;
      }
    }
  }
  return false;
};

/**
 * Handle simple If Then Else to reduce cognitive complexity
 *
 */
export const ifThenElse = (condition, ifTrue, ifFalse) => {
  if (!condition) {
    return ifFalse;
  } else {
    return ifTrue;
  }
};

/**
 * Handle compare up to 7 variable
 *
 */
export const compareCheck = (firstArg, secondArg = true, thirdArg = true, fourthArg = true, fiveArg = true, sixArg = true, sevenArg = true) => {
  return (firstArg && secondArg && thirdArg && fourthArg && fiveArg && sixArg && sevenArg);
};

/**
 * Handle replace if empty
 *
 */
export const ifEmptyReplace = (condition, replace) => {
  if (!condition || !condition.length) {
    return replace;
  } else {
    return condition;
  }
};

/**
 * Generate random integer in the range of [min, max]
 *
 */
export const randomInt = (min: number, max: number) => {
  const crypto = window.crypto || window.Crypto;
  const randomFloat = function () {
    const int = crypto.getRandomValues(new Uint32Array(1))[0];
    return int / 2**32;
  };
  const range = max - min;
  return Math.floor(randomFloat() * range + min);
};

export const randomCode = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(randomInt(0, charactersLength-1));
    counter += 1;
  }
  return result;
};

export const getGender = (id) => {
  switch (id) {
    case 1:
      return 'Male';
    case 2:
      return 'Female';
    default:
      return '';
  }
};

export const getReligion = (id) => {
  switch (id) {
    case 1:
      return 'Islam';
    case 2:
      return 'Christian';
    case 3:
      return 'Buddhist';
    case 4:
      return 'Hindu';
    case 5:
      return 'Catholic';
    default:
      return '';
  }
};

export const getMaritalStatus = (id) => {
  switch (id) {
    case 1:
      return 'Single';
    case 2:
      return 'Married';
    case 3:
      return 'Divorced';
    case 4:
      return 'Separated';
    case 5:
      return 'Widowed';
    case 6:
      return 'Domestic Partnership';
    case 7:
      return 'Civil Union';
    case 8:
      return 'Annuled';
    default:
      return '';
  }
};

export const getPaymentTypeWithoutData = (value: number) => {
  switch (value) {
    case 0:
      return {
        title: 'Amount',
        withPercentage: false
      };
    case 1:
      return {
        title: 'Rate',
        withPercentage: false
      };
    case 2:
      return {
        title: 'Expected Amount (currency)',
        withPercentage: false
      };
    case 3:
      return {
        title: 'Expected Rate (pcs)',
        withPercentage: true
      };
    default:
      throw new Error('Error');
  }
};

export const getPaymentType = (id, arrData) => {
  const tempId = arrData.find((el) => el.value === id);
  switch (tempId?.type) {
    case 0:
      return {
        title: 'Amount',
        withPercentage: false
      };
    case 1:
      return {
        title: 'Rate',
        withPercentage: false
      };
    case 2:
      return {
        title: 'Expected Amount (currency)',
        withPercentage: true
      };
    case 3:
      return {
        title: 'Expected Rate (pcs)',
        withPercentage: true
      };
    default:
      return {
        title: 'Amount',
        withPercentage: false
      };
  }
};

export const dynamicPayloadBaseCnb = (arrData, id, value) => {
  const tempId = arrData.find((el) => el?.value === id);
  switch (tempId?.type) {
    case 0:
      return {
        componentID: value.compensationComponentId,
        isTaxable: value.taxStatus === 'true' ? true : false,
        termID: value.period,
        amount: +value.rateOrAmount,
        amountType: 0,
      };
    case 1:
      return {
        componentID: value.compensationComponentId,
        isTaxable: value.taxStatus === 'true' ? true : false,
        termID: value.period,
        rate: +value.rateOrAmount,
        rateType: 0,
      };
    case 2:
      return {
        componentID: value.compensationComponentId,
        isTaxable: value.taxStatus === 'true' ? true : false,
        termID: value.period,
        amount: +value.rateOrAmount,
        amountType: 0,
        rate: +value.percentage,
        rateType: 1,
      };
    case 3:
      return {
        componentID: value.compensationComponentId,
        isTaxable: value.taxStatus === 'true' ? true : false,
        termID: value.period,
        amount: +value.rateOrAmount,
        amountType: 0,
        rate: +value.percentage,
        rateType: 0,
      };
  }
};

export const getPeriod = (period: number) => {
  switch (period) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Thursday';
    case 4:
      return 'Wednesday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Sunday';
  }
};

type DayJS = dayjs.Dayjs | null | string;

interface InitialValuesPAType {
  color: string;
  end: DayJS;
  id: string;
  isHalfDay: boolean;
  isOvertime: boolean;
  leaveStatus: string | number;
  leaveType: string | number;
  multiplier: number;
  name: string;
  note?: string | null;
  start: DayJS;
  title: string;
  duration: number;
  event_id: string | number;
}

export const getPayloadAttendancePayroll = (val: InitialValuesPAType, event) => {
  switch(val.leaveType) {
    case 1:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: val?.leaveType,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 2:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: val?.leaveType,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 3:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: val?.leaveType,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 4:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: val?.leaveType,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 5:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: val?.leaveType,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 6:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: val?.leaveType,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 7:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: 0,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: 0,
        event_id: val?.event_id
      };
    case 8:
      return {
        color: val?.color,
        end: new Date(dayjs(event?.end).format('YYYY-MM-DD') + ' ' + dayjs(val.end).format('HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: 0,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: event?.title,
        duration: 0,
        event_id: event?.event_id
      };
    case 9:
      return {
        color: val?.color,
        end: new Date(dayjs(dayjs(event.start).format('YYYY-MM-DD') + ' ' + dayjs(val?.start).format('HH:mm')).add(val?.duration, 'hours').format('YYYY-MM-DD HH:mm')),
        id: val?.id,
        isHalfDay: val?.isHalfDay,
        isOvertime: val?.isOvertime,
        leaveStatus: ifEmptyReplace(val?.leaveStatus, event?.leaveStatus),
        leaveType: 0,
        multiplier: val?.multiplier,
        name: val?.name,
        note: ifEmptyReplace(val?.note, ''),
        start: new Date(dayjs(event?.start).format('YYYY-MM-DD') + ' ' + dayjs(val.start).format('HH:mm')),
        title: val?.title,
        duration: val?.duration,
        event_id: event?.event_id
      };
    default :
      return null;
  }
};

// https://lifepal.co.id/media/nomor-rekening/
export const bankAccountLength = {
  // 'Bank Rakyat Indonesia': 15,
  // 'Bank Negara Indonesia': 10,
  // 'Bank Central Asia' : 10,
  // 'Bank Mandiri': 13,
  // 'Bank CIMB Niaga': 14,
  '1': 15, // BRI,
  '2': 10, // BNI,
  '3': 10,
  '4': 13,
  '5': 14
};