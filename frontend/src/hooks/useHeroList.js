import { useQuery } from '@tanstack/react-query';
import { listHeroes } from '../api/superheroes/superheroService.js';

export const useHeroList = (page = 0, limit = 5) => {
  return useQuery({
    queryKey: ['superheroes', page],
    queryFn: () => listHeroes(page, limit),
    keepPreviousData: true,
  });
}