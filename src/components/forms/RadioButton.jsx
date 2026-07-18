

const RadioButton = ({ ref, display, option, isChecked }) => {

  return (
    <>
      <div key={option.id} className="radiobutton">
        <span>
          <input
            ref={ref}
            key={option.id}
            type="radio"
            name="option"
            value={option.id}
            defaultChecked={isChecked}
          />
        </span>
        <label htmlFor={option.id}>{display}</label>
      </div>
    </>
  );
};

export default RadioButton;
