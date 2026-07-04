import moment from "moment";


const MovieInfo = ({ movie }) => {
  return (
    <div className="flex flex-info info">
      <span className="details">{movie.rating.rating}</span>
      {" | "}
      <span className="details">{movie.movieLength}</span>
      {" | "}
      <span className="details">{movie.genre.genre}</span>
      {" | "}
      <span className="details">{moment(movie.releaseDate).format("D MMMM YYYY")}</span>
    </div>
  );
};

export default MovieInfo;
