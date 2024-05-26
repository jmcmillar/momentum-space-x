import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Pagination, Card } from '../components/launches';
import { Loader } from '../components/Loader';
import { TitleBar } from '../components/TitleBar';
import { LaunchDataStore } from '../store/launchDataStore';
import { Launch } from '../types';
import { Tabs } from '../components/Tabs';
import { Modal } from '../components/Modal';
import { useToggle } from 'react-use';
import { LaunchDetail } from '../components/launches/LaunchDetail';

export function LaunchesPage() {
    const [launches, setLaunches] = useState<Launch[] | null>(null);
    const [launchCount, setLaunchCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useToggle(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const pageSize = 12;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const store = useMemo(() => new LaunchDataStore(), []);

    useEffect(() => {
      setLaunches(store.getPaginatedLaunches(pageSize, currentPage));
      setLaunchCount(store.launchCount);
    }, [currentPage, store]);

    const renderCard = (launch: Launch) => <Card {...launch} key={launch.id} onClick={() => handleModal(launch)} />

    const handleModal = (launch: Launch) => {
      setModalContent(<LaunchDetail {...launch} />);
      setModalOpen();
    }

    if (!launches) return <Loader />;

    return (
      <>
        <TitleBar title="Launches" />
        <Tabs />
        <Modal open={modalOpen} toggleOpen={setModalOpen}>
          {modalContent}
        </Modal>
        <div className="mx-6">
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
      </>
    );
};
