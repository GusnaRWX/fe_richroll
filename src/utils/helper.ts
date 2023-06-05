/**
 * Write our own expression
 *
 * @param expression
 * @param value
 * @returns
 */
import { getStorage } from './storage';

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

export const randomCode = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
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
 * Handle compare up to 3 variable
 *
 */
export const compareCheck = (firstArg, secondArg = true, thirdArg = true) => {
  return (firstArg && secondArg && thirdArg);
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

export const getPaymentType = (id, arrData) => {
  const tempId = arrData.find((el) => el.value === id);
  switch (tempId?.type) {
    case 0:
      return {
        title: 'Amount',
        withPercentage: false
      };
      break;
    case 1:
      return {
        title: 'Rate',
        withPercentage: false
      };
      break;
    case 2:
      return {
        title: 'Expected Amount (currency)',
        withPercentage: true
      };
      break;
    case 3:
      return {
        title: 'Expected Rate (pcs)',
        withPercentage: true
      };
      break;
    default:
      return {
        title: 'Amount',
        withPercentage: false
      };
  }
};

export const dynamicPayloadBaseCnb = (arrData, id, value) => {
  const tempId = arrData.find((el) => el.value === id);
  switch (tempId.type) {
    case 0:
      return {
        componentID: value.compensationComponentId,
        isTaxable: Boolean(value.taxStatus),
        termID: value.period,
        amount: value.rateOrAmount,
        amountType: 0,
      };
      break;
    case 1:
      return {
        componentID: value.compensationComponentId,
        isTaxable: Boolean(value.taxStatus),
        termID: value.period,
        rate: value.rateOrAmount,
        rateType: 0,
      };
      break;
    case 2:
      return {
        componentID: value.compensationComponentId,
        isTaxable: Boolean(value.taxStatus),
        termID: value.period,
        amount: value.rateOrAmount,
        amountType: 0,
        rate: value.percentage,
        rateType: 1,
      };
      break;
    case 3:
      return {
        componentID: value.compensationComponentId,
        isTaxable: Boolean(value.taxStatus),
        termID: value.period,
        amount: value.rateOrAmount,
        amountType: 0,
        rate: value.percentage,
        rateType: 0,
      };
      break;
  }
};