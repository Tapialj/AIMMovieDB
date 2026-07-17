import { Link } from "react-router-dom";

import ListItem from "/components/ListItem";


const CastCrew = ({ actors, directors }) => {
  return (
    <div className="cast-crew grid">
      <div className="directors">
        <h2>Directed By:</h2>
        
        <div className="flex">
          {
            directors.map((director) => {
              return (
                <div key={director.id} className="director">
                  <Link to={`/directors/${director.id}`}>
                    <ListItem>
                      {director.firstName}  {director.lastName}
                    </ListItem>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>
      <aside className="cast">
        <h2>Actors:</h2>
        <div className="actors grid">
          {
            actors.map((actor) => {
              return (
                <div key={actor.id} className="actor">
                  <Link to={`/actors/${actor.id}`}>
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
