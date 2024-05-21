import React, { useState } from 'react';
import usePaginatedLaunches from '../hooks/usePaginationLaunches';
import { Pagination, Card } from '../components/launches';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';

export function LaunchesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const { data, loading, error, paginationData } = usePaginatedLaunches(pageSize, currentPage);

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!data) {
      return <div>No launches available.</div>;
    }

    return (
      <div className="mx-6">
        <TitleBar title="Launches" />
        <div className="lg:grid lg:grid-cols-3 gap-4 mb-12">
          {paginationData.launches.map((launch) => (
              <Card {...launch} key={launch.id}/>
          ))}
        </div>
        <Pagination
          start={paginationData.startIndex + 1} 
          end={paginationData.endIndex}
          total={data.length}
          onNext={() => setCurrentPage((currentPage + 1))}
          onPrev={() => setCurrentPage((currentPage - 1))}
        />
      </div>
    );
};
