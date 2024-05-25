type FormData = { [key: string]: any };
type ValidatorType = 'required' | 'isValidUrl';

type ValidateMap<T extends FormData> = {
  [K in keyof T]: ValidatorType;
};

export type Errors<T extends FormData> = {
  [K in keyof T]?: string;
};

export const isRequired = (key: string, value: string | null): Errors<FormData> | null => {
  if (!value || value === '') {
    return { [key]: 'This field is required' };
  }
  return null;
}

export const isValidUrl = (key: string, value: string): Errors<FormData> | null => {
  try {
    new URL(value);
    return null;
  } catch {
    return { [key]: 'This field must be a valid URL' };
  }
}

export const formValidator = (formData: FormData, validateMap: ValidateMap<{}>): Errors<FormData> => {
  const errors: Errors<FormData> = {};
  Object.entries(validateMap).forEach(([key, validator]) => {
    const value = formData[key];
    let error: Errors<FormData> | null = null;
    
    if (validator === 'required') {
      error = isRequired(key, value);
    } else if (validator === 'isValidUrl') {
      error = isValidUrl(key, value);
    }
    
    if (error) {
      Object.assign(errors, error);
    }
  });
  return errors;
}
