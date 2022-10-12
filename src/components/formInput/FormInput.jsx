import { useRef } from "react";
import "./formInput.scss";

const FormInput = ({ handleChange, label, type='text', name, placeholder=null, required=false, value, minLength=0, maxLength=524288, setValidity, disabled=false }) => {
  const field = useRef();
  
  const preHandleChange = (e) => {
    if(field.current.checkValidity()){
      typeof setValidity === 'function' && setValidity(prev => {
        return {
          ...prev,
          [field.current.name]: true
        }
      });
    } else {
      typeof setValidity === 'function' && setValidity(prev => {
        return {
          ...prev,
          [field.current.name]: false
        }
      });
    }
    handleChange(e);
  }

  return (
    <fieldset className="formInputGroup">
      <label className="label" htmlFor={name}>{label}</label>
      <input className="input" type={type} name={name} placeholder={placeholder}
        onChange={preHandleChange} value={value} minLength={minLength}
        maxLength={maxLength} required={required} ref={field} disabled={disabled} />
    </fieldset>
  )
}

export default FormInput;