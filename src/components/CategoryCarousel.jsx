import { Link } from "react-router-dom";
import MovieCard from "./movieCard";
import MediaRow from "./MediaRow";

export default function CategoryCarousel({ title, movies, linkTo }) {
  return (
    <MediaRow title={title} action={<Link to={linkTo}>See all &gt;</Link>}>
      {movies.map((movie) => (
        <div key={movie.id} className="movie-row-card"><MovieCard movie={movie} /></div>
      ))}
    </MediaRow>
  );
}
