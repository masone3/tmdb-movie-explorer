import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../api/tmdb';

export const useMovies = (page = 1) => {
    return useQuery({
        queryKey: ['movies', 'popular', page],
        queryFn: () => getPopularMovies(page),
    });
};