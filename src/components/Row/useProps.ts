import { useEffect, useState } from "react";
import axios from "../../axios";
import { Movie } from "../../type";
import { requests } from "../../request";

export const useProps = (fetchUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  // 追加
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const movies = request.data.results.map((movie: any) => ({
        id: movie.id,
        name: movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
      }));
      setMovies(movies);
    }
    fetchData();
  }, [fetchUrl]);

  // 追加
  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviePlayUrl = await axios.get(requests.fetchMovieVideos(movie.id));
      setTrailerUrl(moviePlayUrl.data.results[0]?.key);
    }
  };
  return { 
    movies,
    trailerUrl,
    handleClick,
   };
};