import { useQuery } from '@tanstack/react-query';
import { getHero } from '../api/superheroes/superheroService.js';

export const useHero = (id) => {
  return useQuery({
    queryKey: ['hero', id],
    queryFn: () => getHero(id),
    enabled: !!id,
  });
};
