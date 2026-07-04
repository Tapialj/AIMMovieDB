

const Actor = ({ actor, movie = null, onClick }) => {

  return (
    <li className="actor">
      <div className="name" onClick={() => onClick(actor.id)}>
        {actor.firstName} {actor.lastName}
      </div>
      <div className="movie">{movie ? movie.title : "----"}</div>
    </li>
  );
};

export default Actor;
