import { Link } from "react-router-dom";

import ListItem from "/components/ListItem";


const CastCrew = ({ movie }) => {
  return (
    <div className="cast-crew grid">
      <div className="director">
        <h2>Directed By:</h2>
        
        <Link to={`/director-details/${movie.director.id}`}>
          <ListItem>
            {movie.director.firstName}  {movie.director.lastName}
          </ListItem>
        </Link>
      </div>
      <aside className="cast">
        <h2>Actors:</h2>
        <div className="actors grid">
          {
            movie.actors.map((actor) => {
              return (
                <div key={actor.id} className="actor">
                  <Link to={`/actor-details/${actor.id}`}>
                    <ListItem>
                      {actor.firstName} {actor.lastName}
                    </ListItem>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </aside>
    </div>
  );
};

export default CastCrew;
