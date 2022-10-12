import "./manageAccountDetails.css";
import { ViewAccountDetails, Dashboardbtn, BankAccountModal } from "../";
import { useState } from "react";
import axios from '../../axios';
import { toast } from "react-toastify";
import bankObjs from './banks';

function ManageAccountDetails() {

  const [show, setShow] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    bank: '',
    number: ''
  });
  const [banks] = useState(bankObjs.map(bank => bank.name));

  const displayModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }
  
  const addAccount = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/account/add', {...details})
      if (res.status === 201) {
        displayModal();
      } else {
        toast.error(res.data.msg);
      }
    }
    catch(err) {
        toast.error(err.response?.data?.msg || "Something went wrong");
    }
  }

  const handleTrue = () =>{
    setShow(true)
  }

  return (
    <>
    {showModal && <BankAccountModal closeModal={ closeModal} />}
    {show && (<div className="mgboardcontainer">
      <div className="mgboardheader">
        <div className="mgbordtitle">
          <h3>Bank Account</h3>
        </div>
        <div className="mgboardsubtitle" onClick={()=>{setShow(false)}}>
          <p>View Bank accounts</p>
        </div>
      </div>

      <div className="mgboardform">
        <form onSubmit={addAccount}>
          <label>
            <p>Bank Name</p>
            <select placeholder="Select Bank" name="bank" defaultValue='' onInput={handleChange}>
              <option value="" disabled>Select Bank</option>
              {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
            </select>
          </label>
          <label>
            <p>Account Name</p>
            <input placeholder="Account Name" onChange={handleChange} name="name" ></input>
          </label>
          <label>
            <p>Account Number</p>
            <input placeholder="Account Number" name="number" onChange={handleChange} minLength={10} maxLength={10} /> 
          </label>
            <Dashboardbtn value="Add Bank"/>
        </form>
      </div>
    </div>)}

    {!show && (<div><ViewAccountDetails makeTrue={handleTrue}/></div>)}
    </>
  )
};

export default ManageAccountDetails;
