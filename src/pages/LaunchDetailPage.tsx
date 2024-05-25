import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Launch } from '../types/Launch';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';
import { format, parseISO} from 'date-fns';
import { LaunchDataStore } from '../store/launchDataStore';
import { Tabs } from '../components/Tabs';
import { NameBadge } from '../components/NameBadge';
import { setRocketNameBadgeProps } from '../utils/setRocketNameBadgeProps';

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

  const launchDate = format(parseISO(launchDetails.launch_date_utc), 'MM/dd/yyyy')

  return (
    <>
    <TitleBar title="Launch Details" />
    <Tabs />
    <div className='mx-6'>
      <Link to="/" className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20">
        Back to Launches
      </Link>
      <div className="my-8 text-gray-700 bg-white shadow-md bg-clip-border p-6">
        <p className="mb-4 text-xs text-gray-600">{launchDate}</p>
        <div className="flex mb-4 gap-3">
        <h2 className="text-xl font-semibold">{launchDetails.mission_name}</h2>
          <NameBadge {...setRocketNameBadgeProps(launchDetails.rocket.rocket_name)} />
        </div>

        <p className="mb-4">{launchDetails.details}</p>
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
    </>
  );
};
