import RadioButton from "/components/forms/RadioButton";


const RadioButtonSection = ({ ref, title, options, checkedOption, onChange }) => {

  return (
    <>
      <fieldset className="form-control flex" onChange={onChange}>
        <label htmlFor="option">{title}</label>
        <div className="grid check-container">
          {
            options.map((option) => {
              const display = `${option.firstName} ${option.lastName}`;

              return (
                <RadioButton
                  ref={ref}
                  key={option.id}
                  display={display}
                  option={option}
                  isChecked={option.id === checkedOption}
                />
              );
            })
          }
        </div>
      </fieldset>
    </>
  );
};

export default RadioButtonSection;
