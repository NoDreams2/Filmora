import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: headers => {
      headers.set('X-API-KEY', kinopoiskApiKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({
    getFilmsTop: builder.query({
      query: ({ type, page = 1 }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
      transformResponse: (response, meta, args) => {
        let items = response.items;
        const totalPages = response.totalPages;

        if (args.type === 'TOP_POPULAR_MOVIES') {
          return {
            items: items.slice(0, 100),
            total: 100,
            totalPages: Math.ceil(100 / items.length),
          };
        }

        return {
          items,
          total: response.total,
          totalPages,
        };
      },
    }),
    getFilms: builder.query({
      query: ({
        countries = '',
        genreId,
        order = 'NUM_VOTE',
        type = 'FILM',
        year,
        page = 1,
      }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&year=${year}&page=${page}`,
    }),
  }),
});

export const { useGetFilmsTopQuery, useGetFilmsQuery } = kinopoiskApi;
