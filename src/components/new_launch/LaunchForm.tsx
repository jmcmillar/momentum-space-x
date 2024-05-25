
import { LaunchDataStore } from '../../store/data_store';
import { Errors, formValidator } from '../../utils/formValidator';
import { InputGroup } from './InputGroup';
import { useState } from 'react';
export interface FormProps {
  missionName: string;
  launchDate: string;
  rocketName: string;
  links: string;
  details: string;
}

export function LaunchForm() {
  const store = new LaunchDataStore();
  const [formData, setFormData] = useState<FormProps>({} as FormProps);
  const [errors, setErrors] = useState<Errors<FormProps>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(formValidator(formData, {missionName: "required", launchDate: "required", links: "isValidUrl"}))
    if (isValid) {
      store.addLaunch(formData);
      return alert('success')
    }
  }

  const isValid: boolean = !!errors.launchDate || !!errors.missionName || !!errors.links

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        id="missionName"
        label="Mission Name"
        type="text"
        value={formData.missionName}
        onChange={handleChange}
        errorMessage={errors.missionName}
      />
      <InputGroup
        id="rocketName"
        label="Rocket Name"
        type="text"
        value={formData.rocketName}
        onChange={handleChange}
      />
      <InputGroup
        id="links"
        label="Article link"
        type="text"
        value={formData.links}
        onChange={handleChange}
        errorMessage={errors.links}
      />
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details</label>
      <textarea
        id="details"
        name="details"
        className="w-full p-2.5 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
        value={formData.details}
        onChange={handleChange}
        placeholder="Enter Details"
      />
      <InputGroup
        id="launchDate"
        label="Date"
        type="datetime-local"
        value={formData.launchDate}
        onChange={handleChange}
        errorMessage={errors.launchDate}
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
      >
        Submit
      </button>
    </form>
  );
};

