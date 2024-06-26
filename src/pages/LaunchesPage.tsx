import React, { useEffect, useState } from 'react';
import { Pagination, Card } from '../components/launches';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';
import { LaunchDataStore } from '../store/launchDataStore';
import { Launch } from '../types';
import { Tabs } from '../components/Tabs';
import { LaunchDetail } from '../components/launches/LaunchDetail';
import { useModal } from '../hooks/useModal';

export function LaunchesPage() {
    const [launches, setLaunches] = useState<Launch[]>([]);
    const [launchCount, setLaunchCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { modal, handleModal } = useModal();
    const pageSize = 12;

    useEffect(() => {
      const fetchLaunches = async () => {
        const store = new LaunchDataStore();
        await store.getLaunches();
        const paginatedLaunches = store.getPaginatedLaunches(pageSize, currentPage);
        setLaunches(paginatedLaunches);
        setLaunchCount(store.launchCount);
      };
      fetchLaunches();
    }, [currentPage, pageSize]);

    const renderCard = (launch: Launch) => <Card {...launch} key={launch.id} onClick={() => handleModal(<LaunchDetail {...launch} />)} />

    if (!launches.length) return <Loader />;

    return (
        <>
          <TitleBar title="Launches" />
          <Tabs />
          {modal}
          <div className="mx-6">
              <div className="lg:grid lg:grid-cols-3 gap-4 mb-12">
                  {launches.map(renderCard)}
              </div>
              <Pagination
                  start={(currentPage - 1) * pageSize + 1}
                  end={Math.min(currentPage * pageSize, launchCount)}
                  total={launchCount}
                  onNext={() => setCurrentPage((prev) => prev + 1)}
                  onPrev={() => setCurrentPage((prev) => prev - 1)}
              />
          </div>
        </>
    );
};
