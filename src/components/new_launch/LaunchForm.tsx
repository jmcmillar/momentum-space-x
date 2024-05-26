
import { LaunchDataStore } from '../../store/launchDataStore';
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

const emptyForm: FormProps = {
  missionName: '',
  launchDate: '',
  rocketName: '',
  links: '',
  details: ''
};

export function LaunchForm() {
  const store = new LaunchDataStore();
  const [formData, setFormData] = useState<FormProps>(emptyForm);
  const [errors, setErrors] = useState<Errors<FormProps>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = formValidator(formData, {missionName: "required", launchDate: "required", links: "isValidUrl"});
    setErrors(validationErrors);
    
    const isValid = Object.keys(validationErrors).length === 0;
  
    if (isValid) {
      store.addLaunch(formData);
      setFormData(emptyForm);
      alert('Launch added successfully');
    } else {
      console.log(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputGroup
          id="missionName"
          label="Mission Name"
          type="text"
          value={formData.missionName}
          onChange={handleChange}
          errorMessage={errors.missionName}
        />
        <div>
          <label htmlFor="rocketName" className="block mb-2 text-sm font-medium text-gray-900">Rocket Name</label>
          <select
            id="rocketName"
            name="rocketName"
            value={formData.rocketName}
            onChange={handleChange}
            className="w-full p-2.5 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
            <option value="">Select Rocket</option>
            {store.getUniqueRocketNames().map((rocketName) => (
              <option key={rocketName} value={rocketName}>{rocketName}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputGroup
          id="links"
          label="Article link"
          type="text"
          value={formData.links}
          onChange={handleChange}
          errorMessage={errors.links}
        />
        <InputGroup
        id="launchDate"
        label="Date"
        type="datetime-local"
        value={formData.launchDate}
        onChange={handleChange}
        errorMessage={errors.launchDate}
      />
      </div>
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details</label>
      <textarea
        id="details"
        name="details"
        className="w-full p-2.5 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
        value={formData.details}
        onChange={handleChange}
        placeholder="Enter Details"
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

