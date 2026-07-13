import { useInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../api/tmdb';

export const useMovies = (page = 1) => {
    return useInfiniteQuery({
        queryKey: ['movies', 'popular', page],
        queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined; // no more pages to fetch
        },
    });
};