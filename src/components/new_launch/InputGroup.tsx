import clsx from 'clsx';
import React from 'react';

interface Props {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute,
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export const InputGroup = ({ id, label, type, value, onChange, errorMessage}: Props) => {
    return (
      <div className="mb-5">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input
          type={type}
          id={id}
          name={id}
          className={
            clsx("bg-gray-50 border text-gray-900 text-sm rounded-lg",
              "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
              (!!errorMessage ? "border-red-500" : "border-gray-300"))}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {errorMessage && <p className="text-red-500 text-sm mt-1">{label} is required to submit</p>}
    </div>
    );
}
