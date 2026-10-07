import { tmdbFetch } from "../tmdb";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
const UncontrolledExample = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {

      try {
      const res = await tmdbFetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
      );
      const data = await res.json();

      // Only high-quality images
      const filtered = (data.results || []).filter(
        (movie) => movie.backdrop_path && movie.vote_average >= 6.5
      );

      setMovies(filtered.slice(0, 8));
      } catch (error) { setError(error.message); }
    };

    fetchMovies();
  }, []);

  if (error) return <div role="alert" className="bg-black text-white px-4 pt-32 pb-8">{error}</div>;

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Carousel fade controls indicators interval={5000} className="z-0 h-full">
        {movies.map((movie) => {
          const imgUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
          return (
            <Carousel.Item key={movie.id}>
              {/* Responsive Aspect Ratio Container */}
              <Link to={`/movie/${movie.id}`}>
              <div className="w-screen h-screen aspect-video sm:aspect-video md:aspect-video lg:aspect-video xl:aspect-video 2xl:aspect-video
                              xs:aspect-[9/16] sm:aspect-[9/16] md:aspect-[16/9] lg:aspect-[16/9] overflow-hidden">
                <img
                  src={imgUrl}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              </Link>

              {/* Caption Overlay */}
              <Carousel.Caption>
                <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-bold font-serif">
                  {movie.title}
                </h1>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default UncontrolledExample;
