import { useNavigate } from "react-router-dom";

import Button from "/components/Button";

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <article className="unauthorized">
      <h1>403</h1>
      <p>Unauthorized</p>
      <Button title="Go Back" onClick={navigate(-1)} />
    </article>
  );
};

export default Unauthorized;
