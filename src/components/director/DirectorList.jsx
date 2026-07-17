import { useNavigate } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Director from "/components/director/Director";
import Loading from "/components/Loading";


const DirectorList = () => {
  const { data, loading } = useFetch("/api/directors");
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`/directors/${id}`);
  };

  return (
    <div>  
      <ol>
        {
          loading ?
            <Loading /> :
            data.map((director) => {
              return (
                <Director key={director.id} director={director} onClick={onClick} />
              );
            })
        }
      </ol>
    </div>
  );
};

export default DirectorList;
