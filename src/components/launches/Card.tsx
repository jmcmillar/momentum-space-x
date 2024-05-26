import React from 'react';
import { Launch } from '../../types/Launch';
import { NameBadge } from '../NameBadge';
import { setRocketNameBadgeProps } from '../../utils/setRocketNameBadgeProps';

interface Props extends Launch {
  onClick: () => void;
}

const Card = ({details, mission_name, id, rocket, onClick }: Props ) => {

  return (
    <div className="relative flex flex-col justify-between mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {mission_name}
          </h2>
          <NameBadge {...setRocketNameBadgeProps(rocket.rocket_name)} />
        </div>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {details} 
        </p>
      </div>
      <div className="p-6 pt-0">
          <div className="inline-block">
            <button
              onClick={onClick}
              className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </button>
          </div>
      </div>
    </div>
  );
}

export { Card };
