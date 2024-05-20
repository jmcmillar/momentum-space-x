import { useState, useEffect } from 'react';
import axios from 'axios';
import { Launch, LaunchIndexJson } from '../types';

type ApiResponseWithLoadingError = {
    data: Launch[] | null;
    loading: boolean;
    error: any | null;
    getPaginationData: (page: number) => PaginationData;
};

type PaginationData = {
    launches: Launch[];
    startIndex: number;
    endIndex: number;
}

const usePaginatedLaunches = (pageSize: number): ApiResponseWithLoadingError => {
    const [launches, setLaunches] = useState<Launch[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<LaunchIndexJson>(
            'https://file.notion.so/f/f/dea6dd0b-0b4b-4fcd-b3b6-09d0e299a1cd/552f1b7e-336e-4a46-9b27-e700fae6f4b9/Payload.json?id=fd5dcb34-2f5a-4942-bd6a-ea1bf723da54&table=block&spaceId=dea6dd0b-0b4b-4fcd-b3b6-09d0e299a1cd&expirationTimestamp=1716177600000&signature=RR8mZdgYwohtya06IQ00REuCdChnyeKnmLHAEkDTPb4&downloadName=Payload.json',
          );
          localStorage.setItem('data', JSON.stringify(response.data.data.launches));
          setLaunches(response.data.data.launches);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      const storedLaunches = localStorage.getItem('data');
      if (storedLaunches) {
        const parsedLaunches: Launch[] = JSON.parse(storedLaunches);
        setLaunches(parsedLaunches);
        setLoading(false);
      } else {
        fetchData();
      }
    }, []);

    const getPaginationData = (page: number): PaginationData => {
      if (!launches || !Array.isArray(launches)) return {launches: [], startIndex: 0, endIndex: 0};
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const launchCollection = launches.slice(startIndex, endIndex);
      return { launches: launchCollection, startIndex, endIndex };
    };

    return { data: launches, loading, error, getPaginationData };
};

export default usePaginatedLaunches;
