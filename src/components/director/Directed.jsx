import { Link } from "react-router-dom";

import ListItem from "/components/ListItem";


const Directed = ({ directedMovies }) => {
  
  return (
    <div className="movies-section">
      <h2>Directed:</h2>

      <div className="movies grid">
        {
          directedMovies.map((movie) => {
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

export default Directed;
