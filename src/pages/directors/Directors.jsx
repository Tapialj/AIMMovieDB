import { useNavigate } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";

import Button from "/components/Button";
import DirectorList from "/components/director/DirectorList";


const Directors = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const onAddDirectorClick = () => {
    navigate("/add-director");
  };

  return (
    <main className="directors flex no-align">
      <section className="flex row">
        <h1>Directors</h1>
        {
          (auth?.roles?.includes("USER") || auth?.roles?.includes("ADMIN")) &&
            <Button title="Add Director" onClick={onAddDirectorClick} />
        }
      </section>
      <DirectorList />
    </main>
  );
};

export default Directors;
