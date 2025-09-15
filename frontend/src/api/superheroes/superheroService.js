import apiClient from '../http.js';

export const listHeroes = (page = 1, limit = 5) => {
  return apiClient
    .get('/', { params: { page, limit } })
    .then(res => res.data);
};

export const getHero = (id) => {
  return apiClient.get(`/${id}`).then(res => res.data);
}

export const createHero = (heroData) => {
  return apiClient.post('/', heroData).then(res => res.data);
}

export const updateHero = (id, heroData) => {
  return apiClient.patch(`/${id}`, heroData).then(res => res.data);
}

export const deleteHero = (id) => {
  return apiClient.delete(`/${id}`).then(res => res.data);
}