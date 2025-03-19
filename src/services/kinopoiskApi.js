import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { EXCLUDE_GENRES, INCLUDE_COUNTRIES } from '../constants';

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
        keyword = '',
      }) => {
        const params = new URLSearchParams({
          countries,
          genres: genreId,
          order,
          type,
          page,
          keyword,
        });
        if (year) {
          params.append('yearFrom', year);
          params.append('yearTo', year);
        }
        return `/v2.2/films?${params.toString()}`;
      },
    }),

    getGenresAndCountries: builder.query({
      query: () => '/v2.2/films/filters',
      transformResponse: (response, meta, args) => {
        const excludeCartoons = args?.excludeCartoons || false;

        const excludedGenres = [...EXCLUDE_GENRES];
        if (excludeCartoons) {
          excludedGenres.push('мультфильм');
        }

        const includedCountries = [...INCLUDE_COUNTRIES];

        return {
          ...response,
          genres: response.genres.filter(
            ({ genre }) => !excludedGenres.includes(genre),
          ),
          countries: response.countries.filter(({ country }) =>
            includedCountries.includes(country),
          ),
        };
      },
    }),

    getDataFilm: builder.query({
      query: id => `/v2.2/films/${id}`,
    }),

    getSequelsAndPrequels: builder.query({
      query: id => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: response =>
        response.map(el => ({ ...el, kinopoiskId: el.filmId })),
    }),

    getStaff: builder.query({
      query: id => `/v1/staff?filmId=${id}`,
    }),

    getBudgetAndFees: builder.query({
      query: id => `/v2.2/films/${id}/box_office`,
    }),

    getAwards: builder.query({
      query: id => `/v2.2/films/${id}/awards`,
    }),

    getListSimilarMovies: builder.query({
      query: id => `/v2.2/films/${id}/similars`,
      transformResponse: response => {
        return {
          ...response,
          items: response.items.map(el => ({ ...el, kinopoiskId: el.filmId })),
        };
      },
    }),
    getFactsAndBloopers: builder.query({
      query: id => `/v2.2/films/${id}/facts`,
    }),
  }),
});

export const {
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
  useGetDataFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
  useGetBudgetAndFeesQuery,
  useGetAwardsQuery,
  useGetListSimilarMoviesQuery,
  useGetFactsAndBloopersQuery,
} = kinopoiskApi;
