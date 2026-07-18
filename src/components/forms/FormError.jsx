

const FormError = ({ errRef, errors }) => {
  
  return (
    <div 
      ref={errRef}
      className={errors.length > 0 ? "error" : "offscreen"}
      aria-live="assertive"
    >
      <label>Please correct the following error(s):</label>
      <ul>
        {
          errors.length > 0 &&
            errors.map((error) => {
              return <li key={error}>{error}</li>;
            })
        }
      </ul>
    </div>
  );
};

export default FormError;
