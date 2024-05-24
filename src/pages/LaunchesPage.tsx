import React, { useEffect, useMemo, useState } from 'react';
import { Pagination, Card } from '../components/launches';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';
import { LaunchDataStore } from '../store/data_store';
import { Launch } from '../types';


export function LaunchesPage() {
    const [launches, setLaunches] = useState<Launch[] | null>(null);
    const [launchCount, setLaunchCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const store = useMemo(() => new LaunchDataStore(), []);

    useEffect(() => {
      setLaunches(store.getPaginatedLaunches(pageSize, currentPage));
      setLaunchCount(store.launchCount);
    }, [currentPage, store]);

    const renderCard = (launch: Launch) => <Card {...launch} key={launch.id}/>

    if (!launches) return <Loader />;

    return (
      <div className="mx-6">
        <TitleBar title="Launches" />
        <div className="lg:grid lg:grid-cols-3 gap-4 mb-12">
          {launches.map(renderCard)}
        </div>
        <Pagination
          start={startIndex + 1} 
          end={endIndex}
          total={launchCount}
          onNext={() => setCurrentPage((currentPage + 1))}
          onPrev={() => setCurrentPage((currentPage - 1))}
        />
      </div>
    );
};
