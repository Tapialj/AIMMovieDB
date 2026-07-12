

const Button = ({ title, disabled, onClick }) => {
  
  return (
    <>
      <button disabled={disabled} className="btn" onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default Button;
