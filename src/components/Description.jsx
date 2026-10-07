import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tmdbGet } from "../tmdb";
import Loading from "./LoadingPage";

const fallbackImage = `${import.meta.env.BASE_URL}no-movie.svg`;
const imageFallback = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
};

export default function Description() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setMovie(null);
    setCasts([]);
    setError("");
    window.scrollTo(0, 0);

    tmdbGet(`https://api.themoviedb.org/3/movie/${id}`)
      .then(({ data }) => { if (active) setMovie(data); })
      .catch((error) => { if (active) setError(error.message); });
    tmdbGet(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`)
      .then(({ data }) => { if (active) setCasts(data.cast || []); })
      .catch(() => { /* Movie details remain usable when credits are unavailable. */ });
    return () => { active = false; };
  }, [id]);

  if (error) return <main className="p-5 text-white" role="alert">{error} <Link to="/">Back to home</Link></main>;
  if (!movie) return <Loading />;

  const { title, overview, backdrop_path, poster_path, release_date, vote_average } = movie;
  return (
    <main className="movie-detail">
      <section className="movie-detail-hero" aria-labelledby="movie-title">
        <img
          src={backdrop_path || poster_path ? `https://image.tmdb.org/t/p/original${backdrop_path || poster_path}` : fallbackImage}
          alt="" className="movie-detail-backdrop" onError={imageFallback}
        />
        <div className="movie-detail-shade" />
        <div className="movie-detail-copy">
          <h1 id="movie-title">{title}</h1>
          <p className="movie-detail-overview">{overview}</p>
          <p>Release Date: {release_date || "N/A"}</p>
          <div className="flex items-center justify-center gap-2">
            <img src={`${import.meta.env.BASE_URL}star-2768.svg`} alt="Rating" className="h-5 w-5" />
            <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
          </div>
        </div>
        <Link className="movie-watch-button" to={`/watch/${id}`}>Watch Now</Link>
      </section>
    </main>
  );
}
