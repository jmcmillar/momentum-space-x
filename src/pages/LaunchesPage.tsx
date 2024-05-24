import React, { useEffect, useState } from 'react';
import { Pagination, Card } from '../components/launches';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';
import { LaunchDataStore } from '../store/data_store';
import { Launch } from '../types';


export function LaunchesPage() {
    const [launches, setLaunches] = useState<Launch[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    useEffect(() => {
      const store = new LaunchDataStore();
        setLaunches(store.getPaginatedLaunches(pageSize, currentPage));
    }, [currentPage]);


    if (!launches) {
      return <Loader />;
    }

    return (
      <div className="mx-6">
        <TitleBar title="Launches" />
        <div className="lg:grid lg:grid-cols-3 gap-4 mb-12">
          {launches.map((launch) => (
              <Card {...launch} key={launch.id}/>
          ))}
        </div>
        <Pagination
          start={startIndex + 1} 
          end={endIndex}
          total={launches.length}
          onNext={() => setCurrentPage((currentPage + 1))}
          onPrev={() => setCurrentPage((currentPage - 1))}
        />
      </div>
    );
};
