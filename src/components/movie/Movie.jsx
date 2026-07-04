

const Movie = ({ movie, director, onClick }) => {
  return (
    <li className="movie">
      <div className="title" onClick={() => onClick(movie.id)}>
        {movie.title}
      </div>
      <div className="director">
        {
          director ?
            `${director.firstName} ${director.lastName}` :
            "----"
        }
      </div>
    </li>
  );
};

export default Movie;
