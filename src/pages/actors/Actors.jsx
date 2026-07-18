import { useNavigate } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import ActorList from "/components/actor/ActorList";
import Button from "/components/Button";


const Actors = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const onAddActorClick = () => {
    navigate("/actors/new");
  };

  return (
    <main className="actors">
      <section className="flex row">
        <h1>Actors</h1>
        {
          auth?.user?.roles?.includes("USER") &&
            <Button title="Add Actor" onClick={onAddActorClick} />
        }
      </section>
      <ActorList />
    </main>
  );
};

export default Actors;
