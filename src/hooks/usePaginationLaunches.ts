import { useState, useEffect } from 'react';
import axios from 'axios';
import { Launch, LaunchIndexJson } from '../types';
import { ROUTES } from '../constants';

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
          const response = await axios.get<LaunchIndexJson>(ROUTES.api);
          localStorage.setItem('data', JSON.stringify(response.data.data.launches));
          setLaunches(response.data.data.launches);
        } catch (error) {
          setError(error);
        } finally {
          setTimeout(() => setLoading(false), 1000);
        }
      };

      const storedLaunches = localStorage.getItem('data');
      if (storedLaunches) {
        const parsedLaunches: Launch[] = JSON.parse(storedLaunches);
        setLaunches(parsedLaunches);
        setTimeout(() => setLoading(false), 1000);
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
