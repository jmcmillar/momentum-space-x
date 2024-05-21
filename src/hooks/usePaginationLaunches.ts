import { useState, useEffect } from 'react';
import axios from 'axios';
import { Launch, LaunchIndexJson } from '../types';
import { ROUTES } from '../constants';

type ApiResponseWithLoadingError = {
  data: Launch[] | null;
  loading: boolean;
  error: any | null;
  paginationData: PaginationData;
};

type PaginationData = {
  launches: Launch[];
  startIndex: number;
  endIndex: number;
};

const usePaginatedLaunches = (pageSize: number, currentPage: number): ApiResponseWithLoadingError => {
    const [launches, setLaunches] = useState<Launch[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);

    const fetchData = async () => {
      try {
        const response = await axios.get<LaunchIndexJson>(ROUTES.api);
        localStorage.setItem('data', JSON.stringify(response.data.data.launches));
        setLaunches(response.data.data.launches);
      } catch (error) {
        setError(error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // enhanced loading state for visual effect
      }
    };

    useEffect(() => {
      const storedLaunches = localStorage.getItem('data');
      if (storedLaunches) {
        const parsedLaunches: Launch[] = JSON.parse(storedLaunches);
        setLaunches(parsedLaunches);
        setTimeout(() => setLoading(false), 1000); // enhanced loading state for visual effect
      } else {
        fetchData();
      }
    }, []);

    const paginationData = (): PaginationData => {
      if (invalidLaunches) return {launches: [], startIndex: 0, endIndex: 0};
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return { launches: launches.slice(startIndex, endIndex), startIndex, endIndex };
    };

    const invalidLaunches = !launches || !Array.isArray(launches);

    return { data: launches, loading, error, paginationData: paginationData() };
};

export default usePaginatedLaunches;
