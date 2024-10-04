import { useState, useCallback } from 'react'
import { getJobs } from '../api/api';
import { UserDataType } from '../types/types';

export default function useJobs() {
  const [data, setData] = useState<UserDataType[]>([]);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = useCallback(async (
    page: number,
    count: number
  ) => {
    try {
      setLoading(true);
      const { data, maxPages } =
        await getJobs(page, count) as { data: UserDataType[], maxPages: number }
      setData(data);
      setMaxPages(maxPages);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    data,
    maxPages,
    fetchJobs,
  }
}