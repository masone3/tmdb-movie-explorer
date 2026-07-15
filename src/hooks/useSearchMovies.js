import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/tmdb';

export const useSearchMovies = (query) => {
    return useInfiniteQuery({
        queryKey: ['movies', 'search', query],
        queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined; // no more pages to fetch
        },
        enabled: query.trim().length > 0, // don't fetch if search is empty
    });
};