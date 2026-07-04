

const Director = ({ director, movie = null, onClick }) => {
  
  return (
    <li className="director">
      <div className="name" onClick={() => onClick(director.id)}>
        {director.firstName} {director.lastName}
      </div>
      <div className="movie">{movie ? movie.title : "----"}</div>
    </li>
  );
};

export default Director;
