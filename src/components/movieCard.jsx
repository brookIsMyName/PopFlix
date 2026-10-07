import { Link } from "react-router-dom";

export default function MovieCard({ movie: { title, backdrop_path, poster_path, vote_average, release_date, id } }) {
  return (
    <article className="media-card">
      <Link to={`/movie/${id}`} className="media-card-link">
        <img
          src={backdrop_path || poster_path ? `https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}` : `${import.meta.env.BASE_URL}no-movie.svg`}
          alt={title} loading="lazy"
          className={`media-poster ${!backdrop_path ? "media-poster-fallback" : ""}`}
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = `${import.meta.env.BASE_URL}no-movie.svg`; }}
        />
        <div className="media-card-title" title={title}>{title}</div>
      </Link>
      <div className="media-card-rating">
        <img src={`${import.meta.env.BASE_URL}star-2768.svg`} alt="Rating" width="12" height="12" />
        <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
        <span className="year">• {release_date ? release_date.split("-")[0] : "N/A"}</span>
      </div>
    </article>
  );
}
