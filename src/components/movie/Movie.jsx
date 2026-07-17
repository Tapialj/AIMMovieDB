import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "/context/AuthProvider";


const Movie = ({ movie, onClick, onDelete }) => {
  const { auth } = useAuth();

  return (
    <li className="movie">
      <div className="title" onClick={() => onClick(movie.id)}>
        {movie.title}
      </div>
      {
        auth?.user?.roles?.includes("ADMIN") &&
          <FontAwesomeIcon
            icon={faDeleteLeft}
            className="delete"
            onClick={() => onDelete(movie)}
          />
      }
    </li>
  );
};

export default Movie;
