export interface Storage {
  name: string;
  value: string
}

/**
 *
 * Configure Local Storage
 *
 * @param {*} name
 * @param {*} value
 * @param {*} action
 */
const configureStorage = (name: string, value: string, action: string) => {
  if (action === 'set') {
    window.localStorage.setItem(name, value);
  } else {
    window.localStorage.removeItem(name);
  }
};

/**
 *
 * Set Local Storage
 *
 * @param {*} storages
 */
export const setStorages = (storages: Storage[]) => {
  storages.map((item) => configureStorage(item.name, item.value, 'set'));
};

/**
 *
 * Clear Local Storage
 *
 * @param {*} storages
 */
export const clearStorages = (storages: string[]) => {
  storages.map((item) => configureStorage(item, '', 'remove'));
};

/**
 *
 * Get Local Storage
 *
 * @param {*} storage
 * @returns
 */
export const getStorage = (storage: string): unknown => {
  const store = window.localStorage.getItem(storage);

  if (typeof storage !== 'undefined') {
    return store;
  }

  return null;
};