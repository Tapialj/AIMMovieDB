

const Error = ({ errRef, error }) => {
  return (
    <p 
      ref={errRef}
      className={error ? "error" : "offscreen"}
      aria-live="assertive"
    >
      {error}
    </p>
  );
};

export default Error;
