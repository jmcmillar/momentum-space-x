import { useState } from 'react';
import { transformLaunchFormData } from '../utils/transformLaunchFormData';
import { Launch } from '../types/Launch';

export interface FormProps {
  missionName: string;
  launchYear: string;
  launchDate: string;
  rocketName: string;
  links: string;
  details: string;
}


const useForm = () => {
  const empty_form_data = {
    missionName: '',
    launchYear: '',
    launchDate: '',
    rocketName: '',
    links: '',
    details: '',
  };
  
  const [formData, setFormData] = useState<FormProps>(empty_form_data);

  const [errors, setErrors] = useState<{missionName: boolean, launchDate: boolean}>({
    missionName: false,
    launchDate: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formErrors = (formData: FormProps) => {
    const errors = { missionName: false, launchDate: false }

    if (formData.missionName === '') {
      errors.missionName = true;
    }

    if (formData.launchDate === '') {
      errors.launchDate = true;
    }

    setErrors(errors);

    return errors.missionName || errors.launchDate;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = localStorage.getItem('data');
    const errors = formErrors(formData);
    let parsedData: Launch[] = [];

    if (data) {
      parsedData = JSON.parse(data);
    }

    if (!errors) {

      parsedData.unshift(transformLaunchFormData(formData));

      localStorage.setItem('data', JSON.stringify(parsedData));

      setFormData(empty_form_data);

      alert('Launch added successfully!');
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
