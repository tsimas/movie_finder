export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface MovieResponse {
  i: [];
  id: string;
  l: string;
  q: string;
  s: string;
  y: number;
  v?: MovieResponse[];
}

function toImage(data: Array<any>): Image | null {
  return data ? {
    url: data[0],
    width: data[1],
    height: data[2],
  } as Image : null;
}

export function toMovie(data: MovieResponse): Movie {
  return {
    id: data.id,
    image: toImage(data.i),
    title: data.l,
    actors: data.s,
    year: data.y,
    related: data.v ? data.v.map(m => toMovie(m)) : []
  } as Movie;
}

export class Movie {
    id: string;
    image: Image | null;
    title: string;
    actors: string;
    year: number;
    related: Movie[];
}

export class MovieDetail {
  title: string;
  wikiUrl: string;
  imdbUrl: string;
  extract: string;
  extractHtml: string;
  related: Movie[];
}


export interface WikiResponse {
  content_urls: {
    desktop: {
      page: string;
    }
  };
  title: string;
  extract: string;
  extract_html: string;
}

export function toMovieDetail(data: WikiResponse): MovieDetail {
  return {
    title: data.title,
    wikiUrl: data.content_urls.desktop.page,
    imdbUrl: 'https://www.imdb.com/',
    extract: data.extract,
    extractHtml: data.extract_html,
    related: []
  } as MovieDetail;
}
