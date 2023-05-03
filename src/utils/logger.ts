/**
 * Read Log from API 
 * 
 * @param {String} label 
 * @param {*} logs 
 * @returns
 */
export const Logger = (label: string, logs: unknown) => {
  if (process.env.NODE_ENV === 'production') return;
  console.group(label);
  console.table(logs);
  console.groupEnd();
};