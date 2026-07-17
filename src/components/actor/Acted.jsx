import { Link } from "react-router-dom";

import ListItem from "/components/ListItem";


const Acted = ({ actedMovies }) => {

  return (
    <div className="movies-section">
      <h2>Acted:</h2>

      <div className="movies grid">
        {
          actedMovies.map((movie) => {
            return (
              <div key={movie.id} className="movie">
                <Link to={`/movies/${movie.id}`}>
                  <ListItem>
                    {movie.title}
                  </ListItem>
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Acted;
