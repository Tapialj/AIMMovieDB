import { useState } from "react";


const Checkbox = ({ display, option, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  const checkHandler = () => {
    setIsChecked(!isChecked);
    onChange(option, !isChecked);
  };

  return (
    <>
      <div key={option.id} className="checkbox">
        <span>
          <input
            key={option.id}
            type="checkbox"
            name="option"
            value={option.id}
            defaultChecked={isChecked}
            onChange={checkHandler}
          />
        </span>
        <label htmlFor={option.id}>{display}</label>
      </div>
    </>
  );
};

export default Checkbox;
