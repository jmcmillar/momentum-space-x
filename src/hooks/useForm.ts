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
  const [formData, setFormData] = useState<FormProps>({
    missionName: '',
    launchYear: '',
    launchDate: '',
    rocketName: '',
    links: '',
    details: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = localStorage.getItem('data');
    let parsedData: Launch[] = [];

    if (data) {
      parsedData = JSON.parse(data);
    }

    parsedData.unshift(transformLaunchFormData(formData));

    localStorage.setItem('data', JSON.stringify(parsedData));

    setFormData({
      missionName: '',
      details: '',
      rocketName: '',
      links: '',
      launchYear: '',
      launchDate: ''
    });

    alert('Launch added successfully!');
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
