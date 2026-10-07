import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbGet } from "../tmdb";
import { Link } from "react-router-dom";
import Loading from "./LoadingPage";

const fallbackImage = `${import.meta.env.BASE_URL}no-movie.svg`;
const imageFallback = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
};

const DescriptionForShows = () => {

  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    let active = true;
    setShow(null);
    setError("");
    window.scrollTo(0, 0);

    tmdbGet(`https://api.themoviedb.org/3/tv/${id}`)
      .then(({ data }) => { if (active) setShow(data); })
      .catch((error) => { if (active) setError(error.message); });

    return () => { active = false; };
  }, [id]);
  

  if (error) return <div className="p-5 text-white" role="alert">{error} <Link to="/">Back to home</Link></div>;
  if (!show) return <Loading />;
const {poster_path,name,vote_average, overview, last_air_date, backdrop_path} =show
  return (
   <main className="movie-detail">
    <section className="movie-detail-hero" aria-labelledby="movie-title">
        <img
          src={backdrop_path || poster_path ? `https://image.tmdb.org/t/p/original${backdrop_path || poster_path}` : fallbackImage}
          alt="" className="movie-detail-backdrop" onError={imageFallback}
        />



        <div className="movie-detail-shade" />

      <div className="movie-detail-copy">
        <h1 id="movie-title">{name}</h1>
        
        <p className="text-lg text-center px-4 md:px-20 text-white">
          {overview && (overview.length > 500 ? `${overview.substring(0, 400)}...` : overview)}
        </p>

        <p>Last Air Date: {last_air_date || "N/A"}</p>

        <div className="flex items-center justify-center gap-2">
          <img src={`${import.meta.env.BASE_URL}star-2768.svg`} alt="Star Icon" className="h-4 w-4" />
          <p className="text-lg para">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>
        <Link className="movie-watch-button show-watch-button" to={`/series/watch/${id}`}>Watch Now</Link>
      </div>
</section>
      </main>
  );
};

export default DescriptionForShows;
