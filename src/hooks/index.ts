import { CustomHooks } from '@/types/hooks';
import { RefObject, useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelectors: TypedUseSelectorHook<RootState> = useSelector;

export function useForm<T>(
  initialValues: T,
  validateOnChange: boolean,
  validate: (_v: CustomHooks.Validate) => boolean
) {
  const [values, setValues] = useState(initialValues);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (_e: CustomHooks.HandleInput): CustomHooks.HandleInput => {
    const { name, value } = _e.target;

    setValues({
      ...values,
      [name]: value
    });

    if (validateOnChange)
      validate({ [name]: value });

    return _e;
  };

  const resetForm = (): void => {
    setValues(initialValues);
    setErrors({});
  };

  const resetField = (name: string, value: string | string[] | number | number[]): void => {
    setValues({
      ...values,
      [name]: value
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    resetField
  };
}

/**
 *
 * Hooks Click Away Listener
 *
 * @param ref
 * @param callback
 * @param active
 */
export function useClickAwayListener(ref: RefObject<HTMLDivElement>, callback: () => void, active?: boolean) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      // Check If MouseEvent has Clicked in current ref
      if (ref.current && !ref.current.contains(event.target as HTMLElement) && active) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

}