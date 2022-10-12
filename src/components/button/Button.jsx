import "./button.scss";
import { useEffect, useState } from "react";

const Button = ({ children, type = "button", handleClick, disabled = false, className }) => {
  const [disable, setDisable] = useState(disabled);

  useEffect(() => {
    setDisable(disabled);
  }, [disabled]);

  const preHandleClick = (e) => {
    if (type !== "submit") {
      e.preventDefault();
      setDisable(true);
      typeof handleClick === 'function' && handleClick(e);
      setTimeout(() => {
        setDisable(false);
      }, 3000);
    }
  };
  
  return (
    <button className={"buttonComponent " + className} type={type} onClick={preHandleClick} disabled={disable}>
      {children}
    </button>
  )
};

export default Button;