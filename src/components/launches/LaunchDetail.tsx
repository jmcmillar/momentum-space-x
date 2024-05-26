import React from 'react';
import { Launch } from '../../types/Launch';
import { Loader } from '../Loader';
import { format, parseISO} from 'date-fns';
import { NameBadge } from '../NameBadge';
import { setRocketNameBadgeProps } from '../../utils/setRocketNameBadgeProps';

export const LaunchDetail = (launch: Launch) => {

  if (!launch) {
    return <Loader />;
  }

  const launchDate = format(parseISO(launch.launch_date_utc), 'MM/dd/yyyy')

  return (
    <div className='mx-6'>
        <p className="mb-4 text-xs text-gray-600">{launchDate}</p>
        <div className="flex mb-4 gap-3">
        <h2 className="text-xl font-semibold">{launch.mission_name}</h2>
          <NameBadge {...setRocketNameBadgeProps(launch.rocket.rocket_name)} />
        </div>

        <p className="mb-4">{launch.details}</p>
        {launch.links?.article_link &&
          <div className="inline-block">
            <a
              href={launch.links?.article_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            >Article
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
            stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
          </svg>
            </a>
          </div>
        }
    </div>
  );
};
