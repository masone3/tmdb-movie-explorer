import { useInfiniteQuery } from '@tanstack/react-query';
import { discoverMovies } from '../api/tmdb';

export const useDiscoverMovies = ({ genreId, year }) => {
    return useInfiniteQuery({
        queryKey: ['movies', 'discover', genreId, year],
        queryFn: ({ pageParam = 1 }) => discoverMovies({ page: pageParam, genreId, year }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined; // No more pages
        },
        enabled: Boolean(genreId || year), // Only run if genreId or year is provided
    });
};