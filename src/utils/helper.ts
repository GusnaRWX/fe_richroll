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

interface CompanyDataParse {
  id: string | null;
  imageUrl: string | null;
  name: string | null;
  sector: string | null;
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
  const obj = {
    target: {
      name, value: event.target.value
    }
  };
  return obj;
};

export const convertChecked = (event) => {
  const { name, checked } = event.target;

  const obj = {
    target: {
      name, value: checked
    }
  };
  return obj;
};

export const convertDateValue = (name, event) => {
  console.log('helpers', event);
  const obj = {
    target: {
      name, value: event.$d
    }
  };
  return obj;
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

  const obj = {
    target: {
      name, value: [files]
    }
  };
  return obj;
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
  const file = new File([blob], fileName);

  return file;
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