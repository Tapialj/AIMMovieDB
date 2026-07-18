import RadioButton from "/components/forms/RadioButton";


const RadioButtonSection = ({ ref, title, options, checkedOption, onChange }) => {

  return (
    <>
      <fieldset className="form-control radio-container flex" onChange={onChange}>
        <label htmlFor="option">{title}</label>
        <div className="grid check-container">
          {
            options.map((option) => {
              let display;

              if(Object.hasOwn(option, "firstName") && Object.hasOwn(option, "lastName")) {
                display = `${option.firstName} ${option.lastName}`;
              }
              else if(Object.hasOwn(option, "rating")) {
                display = option.rating;
              }

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
