import {
  AutoAwesome,
  AutoStories,
  DarkMode,
  Favorite,
  Fort,
  House,
  LiveTv,
  LocalMovies,
  MoodBad,
  Pool,
  Reorder,
  Stars,
} from '@mui/icons-material';

export const iconComponents = {
  AutoAwesome,
  AutoStories,
  DarkMode,
  Favorite,
  Fort,
  House,
  LiveTv,
  LocalMovies,
  MoodBad,
  Pool,
  Reorder,
  Stars,
};

export const TOP_LISTS = [
  {
    title: 'топ 100 популярных фильмов',
    icon: 'AutoAwesome',
    url: '/popular',
  },
  {
    title: 'топ 250 лучших фильмов',
    icon: 'Stars',
    url: '/best',
  },
  {
    title: 'вампиры',
    icon: 'DarkMode',
    url: '/vampire',
  },
  {
    title: 'комиксы',
    icon: 'AutoStories',
    url: '/comics',
  },
  {
    title: 'cемейный',
    icon: 'House',
    url: '/family',
  },
  {
    title: 'романтика',
    icon: 'Favorite',
    url: '/romantic',
  },
  {
    title: 'зомби',
    icon: 'MoodBad',
    url: '/zombie',
  },
  {
    title: 'катастрофы',
    icon: 'Pool',
    url: '/catastrophe',
  },
  {
    title: 'популярные сериалы',
    icon: 'LiveTv',
    url: '/popular-serials',
  },
];

export const MOVIE_LISTS = [
  {
    title: 'фильмы',
    icon: 'LocalMovies',
    url: '/films',
  },
  {
    title: 'сериалы',
    icon: 'Reorder',
    url: '/serials',
  },
  {
    title: 'мультфильмы',
    icon: 'Fort',
    url: '/cartoons',
  },
];
