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
    value: 'TOP_POPULAR_MOVIES',
  },
  {
    title: 'топ 250 лучших фильмов',
    icon: 'Stars',
    url: '/best',
    value: 'TOP_250_MOVIES',
  },
  {
    title: 'вампиры',
    icon: 'DarkMode',
    url: '/vampire',
    value: 'VAMPIRE_THEME',
  },
  {
    title: 'комиксы',
    icon: 'AutoStories',
    url: '/comics',
    value: 'COMICS_THEME',
  },
  {
    title: 'cемейный',
    icon: 'House',
    url: '/family',
    value: 'FAMILY',
  },
  {
    title: 'романтика',
    icon: 'Favorite',
    url: '/romantic',
    value: 'LOVE_THEME',
  },
  {
    title: 'зомби',
    icon: 'MoodBad',
    url: '/zombie',
    value: 'ZOMBIE_THEME',
  },
  {
    title: 'катастрофы',
    icon: 'Pool',
    url: '/catastrophe',
    value: 'CATASTROPHE_THEME',
  },
  {
    title: 'популярные сериалы',
    icon: 'LiveTv',
    url: '/popular-serials',
    value: 'POPULAR_SERIES',
  },
];

export const MOVIE_LISTS = [
  {
    title: 'фильмы',
    icon: 'LocalMovies',
    url: '/films',
    value: 'FILM',
  },
  {
    title: 'сериалы',
    icon: 'Reorder',
    url: '/serials',
    value: 'TV_SERIES',
  },
  {
    title: 'мультфильмы',
    icon: 'Fort',
    url: '/cartoons',
    value: 'FILM',
  },
];

export const EXCLUDE_GENRES = [
  '',
  'новости',
  'концерт',
  'для взрослых',
  'церемония',
  'реальное ТВ',
  'игра',
  'ток-шоу',
  'документальный',
  'мюзикл',
  'детский',
];
