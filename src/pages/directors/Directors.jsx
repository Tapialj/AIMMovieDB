import { useNavigate } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";
import DirectorList from "/components/director/DirectorList";


const Directors = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const onAddDirectorClick = () => {
    navigate("/directors/new");
  };

  return (
    <main className="directors flex no-align">
      <section className="flex row">
        <h1>Directors</h1>
        {
          auth?.user?.roles?.includes("USER") &&
            <Button title="Add Director" onClick={onAddDirectorClick} />
        }
      </section>
      <DirectorList />
    </main>
  );
};

export default Directors;
