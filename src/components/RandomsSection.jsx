import { useNavigate } from "react-router-dom";

import useFetch from "/hooks/useFetch";

import Button from "/components/Button";
import ListItem from "/components/ListItem";
import Loading from "/components/Loading";


const RandomsSection = ({ type }) => {
  
  const { data, loading } = useFetch(`/api/${type.toLowerCase()}/random-list`);
  const { data: randomType } = useFetch(`/api/${type.toLowerCase()}/random`);
  const title = String(type).charAt(0).toUpperCase() + String(type).slice(1);
  const singular = title.substring(0, title.length - 1);
  const navigate = useNavigate();

  const onRandoClick = (randoId) => {
    navigate(`/${singular.toLowerCase()}-details/${randoId}`);
  };

  const onButtonClick = () => {
    navigate(`/${singular.toLowerCase()}-details/${randomType.id}`);
  };

  return (
    <article className="random-list">
      <h2>
        {title}
      </h2>
      <section className="grid random">
        {
          loading ?
            <Loading /> :
            data.map((rando) => {
              let display;

              if(Object.hasOwn(rando, "title")) {
                display = rando.title;
              }
              else if(Object.hasOwn(rando, "firstName") && Object.hasOwn(rando, "lastName")) {
                display = `${rando.firstName} ${rando.lastName}`;
              }

              return (
                <div key={rando.id} onClick={() => onRandoClick(rando.id)}>
                  <ListItem>
                    {display}
                  </ListItem>
                </div>
              );
            })
        }
      </section>
      <Button title={`Random ${singular}`} onClick={onButtonClick} />
    </article>
  );
};

export default RandomsSection;
