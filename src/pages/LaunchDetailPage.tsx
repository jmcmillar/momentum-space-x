import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Launch } from '../types/Launch';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';
import { format, parseISO} from 'date-fns';
import { LaunchDataStore } from '../store/data_store';

export function LaunchDetailPage() {
  const { id } = useParams();
  const [launchDetails, setLaunchDetails] = useState<Launch>();

  useEffect(() => {
    const store = new LaunchDataStore();
    setLaunchDetails(store.getLaunch(String(id)));
  }, [id]);

  if (!launchDetails) {
    return <Loader />;
  }

  const launchDate = format(parseISO(launchDetails.launch_date_utc), 'eeee, MMM do yyyy')

  return (
    <div className='mx-6'>
      <TitleBar title={launchDetails.mission_name} />
      <div className="my-8">
        <p className="mb-4">Launched: {launchDate}</p>
        <p className="mb-4">Rocket: {launchDetails.rocket?.rocket_name}</p>
        <p className="mb-4">Details: {launchDetails.details}</p>
        {launchDetails.links?.article_link &&
          <div className="inline-block">
            <a
              href={launchDetails.links?.article_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            >Read more
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
            stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
          </svg>
            </a>
          </div>
        }
      </div>
    </div>
  );
};
