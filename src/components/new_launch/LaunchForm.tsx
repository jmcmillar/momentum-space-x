
import { InputGroup } from './InputGroup';
import useForm from '../../hooks/useForm';

export function LaunchForm() {
  const { formData, handleChange, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        required={true}
        id="missionName"
        label="Mission Name"
        type="text"
        value={formData.missionName}
        onChange={handleChange}
      />
      <InputGroup
        id="launchYear"
        label="Launch Year"
        type="number"
        value={formData.launchYear}
        onChange={handleChange}
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

