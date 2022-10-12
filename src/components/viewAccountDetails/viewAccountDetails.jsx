import React, { useState, useEffect } from 'react'
import './viewAccountDetails.css'
import { Dashboardbtn } from '../'
import axios from '../../axios'
import { toast } from 'react-toastify'

function ViewAccountDetails({makeTrue}) {
  const [accounts, setAccounts] = useState([])

  const getAccounts = async () => {
    try {
      const res = await axios.get('/account')
      if (res.status === 200) {
        setAccounts(res.data.accounts)
      }
    } catch (err) {
      if (err.response?.status === 404) {
        toast.info("Add a Bank Account to view details")
      } else {
        toast.error(err.response?.data?.msg || "Something went wrong");
      }
    }
  }

  useEffect(() => {
    getAccounts()
  }, [])

  const removeItem = async(id) => {
    try {
      const res = await axios.delete(`/account/delete/${id}`)
      if (res.status === 200) {
        toast.success("Account deleted successfully")
        setAccounts(prev =>
          prev.filter(account => {
            return account.id !== id
          })
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  }

return (
    <div className="mgboardcontainer">
      <div className="mgboardheader">
        <div className="mgbordtitle">
          <h1>Bank Account</h1>
        </div>
        <div className="mgboardsubtitle" onClick = {makeTrue}>
          <p>Manage Bank accounts</p>
        </div>
      </div>
      
      {accounts.map(item=>{
        return (
          <div className='veiwAccContainer' key={item.id}>
            <div className="veiwAccText">
                <p>{item.bank}</p>
                <p>{item.number}</p>
                <p>{item.name}</p>
            </div>
            <div className="viewAccBtn">
                <button onClick={removeItem.bind(null, item.id)}>Remove</button>
            </div>
          </div>
        )  
      })}
    
      <div onClick = {makeTrue}><Dashboardbtn value="Add New Bank"/></div>
    </div>
  )
};

export default ViewAccountDetails;