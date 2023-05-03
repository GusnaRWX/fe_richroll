/**
 * Write our own expression 
 * 
 * @param expression 
 * @param value 
 * @returns 
 */

export const checkRegulerExpression = (expression: string | RegExp,value: string | number): boolean => {
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