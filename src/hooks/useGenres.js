import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../api/tmdb';

export const useGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
        staleTime: Infinity, // genre list doesn't change often, so we can cache it indefinitely
    });
};