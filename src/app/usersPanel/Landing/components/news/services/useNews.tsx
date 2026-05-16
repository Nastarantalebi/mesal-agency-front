import useGetData from '@/services/useGetData'
import type { TNewsResponse } from '../types/types'
import { useNews_key, useNews_url } from '@/data/querykeys'
import type { TPaginatedResponse } from '@/types'

const useNews = () => {

    const getNews  =useGetData<TPaginatedResponse<TNewsResponse>>({
        key:[useNews_key],
        url: useNews_url,
    })
  return {getNews}
}

export default useNews
