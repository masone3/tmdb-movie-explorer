import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/tmdb';

export const useSearchMovies = (query, page = 1) => {
    return useQuery({
        queryKey: ['movies', 'search', query, page],
        queryFn: () => searchMovies(query, page),
        enabled: query.trim().length > 0, // don't fetch if search is empty
    });
};