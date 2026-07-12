const FormError = ({ errors }) => {
  return (
    <>
      {
        (errors.length > 0) &&
        <div className="error">
          <label>Please correct the following error(s):</label>
          <ul>
            {
              errors.map((error) => {
                return <li key={error}>{error}</li>;
              })
            }
          </ul>
        </div>
      }
    </>
  );
};

export default FormError;
