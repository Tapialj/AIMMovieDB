import { useNavigate } from "react-router-dom";

import Button from "/components/Button";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <article className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Button title="Go Back" onClick={navigate(-1)} />
    </article>
  );
};

export default NotFound;
