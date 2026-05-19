import type { TCreatePeakDate, TResponsePeakDate } from '../types';
import usePostData from '@/services/usePostData';
import useDeleteData from '@/services/useDeleteData';
import useGetData from '@/services/useGetData';

const usePeakDate = (AccommodationId: number | undefined, startDate: string, endDate: string) => {
  
    const url = `${AccommodationId}${AccommodationId}/peak_dates/`;

    const getPeakDates = useGetData<TResponsePeakDate[]>({
      key: ["peakdate", startDate, endDate],
      url: `${url}?start_date=${startDate}&end_date=${endDate}`,
    });
  
    const postPeakDate = usePostData<TCreatePeakDate>({
      key: ["peakdate", startDate, endDate],
      url,
    });
  
    const deletePeakDate = useDeleteData<TResponsePeakDate>({
      key: ["peakdate", startDate, endDate],
      url,
    });

    return { getPeakDates, postPeakDate, deletePeakDate }
  
}

export default usePeakDate
