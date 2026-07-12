import Checkbox from "/components/forms/Checkbox";


const CheckboxSection = ({ title, options, checkedList, onChange }) => {

  const isChecked = (id) => {
    if(checkedList.some((movie) => {
      return movie.id === id;
    }))
      return true;
    return false;
  };

  return (
    <>
      <div className="form-control flex">
        <label htmlFor="option">{title}</label>
        <div className="grid check-container">
          {
            options.map((option) => {
              let display;

              if(Object.hasOwn(option, "title")) {
                display = option.title;
              }
              else if(Object.hasOwn(option, "firstName") && Object.hasOwn(option, "lastName")) {
                display = `${option.firstName} ${option.lastName}`;
              }

              return (
                <Checkbox
                  key={option.id}
                  display={display}
                  option={option}
                  checked={() => isChecked(option.id)}
                  onChange={onChange}
                />
                // <div key={option.id} className="checkbox">
                //   <input
                //     key={option.id}
                //     type="checkbox"
                //     name="option"
                //     value={option.id}
                //     defaultChecked={() => isChecked(option.id)}
                //     // checked={checkedList.includes(option.id) ? true : false} defaultChecked
                //     onChange={onChange}
                //   />
                //   <label htmlFor={option.id}>{display}</label>
                // </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default CheckboxSection;
