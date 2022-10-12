import React,{useState} from 'react'
import styled from "styled-components"
import { NavBar, DashboardButton, SellAirtime, WithdrawBalance, ManageAccountDetails, Transactions, WithdrawalHistory } from '../../components'
import { FiChevronDown } from 'react-icons/fi';


function Dashboard() {
  const [title,setTitle] = useState("Dashboard")
  const [clicked,setClicked] = useState([{ "sell": false, "withdraw": false, "account": false, "history": false, "withdrawalTransaction": false }])
  const [page,setPage] = useState("sellAirtime");
  const [isMobile, setIsMobile] = useState(false)

  const handleSellAirtime = () => {
    setTitle("Dashboard");
    const newArr = clicked.map((val) => {
      return { ...val, sell: true, widthraw: false, account: false, history: false, withdrawalTransaction: false }
    })
    setPage("sellAirtime")
    setClicked(newArr)
  };

  const handleWithdraw = () => {
    setTitle("Dashboard")
    const newArr = clicked.map((val) => {
      return { ...val, sell: false, widthraw: true, account: false, history: false, withdrawalTransaction: false }
    })
    setPage("withdraw")
    setClicked(newArr)
  };

  const handleAccount = () => {
    setTitle("Manage Bank Accounts")
    const newArr = clicked.map((val) => {
      return { ...val, sell: false, widthraw: false, account: true, history: false, withdrawalTransaction: false }
    })
    setPage("account")
    setClicked(newArr)
  };

  const handleHistroy = () => {
    setTitle("Transactions")
    const newArr = clicked.map((val) => {
      return { ...val, sell: false, widthraw: false, account: false, history: true, withdrawalTransaction: false }
    })
    setPage("history")
    setClicked(newArr)
  };

  const handlewithdrawalTransaction = () => {
    setTitle("Withdrawal")
    const newArr = clicked.map((val) => {
      return { ...val, sell: false, widthraw: false, account: false, history: false, withdrawalTransaction: true }
    })
    setPage("withdrawalTransaction")
    setClicked(newArr)
  };
  
  const renderPage = () => {
    if (page === "sellAirtime") return <SellAirtime/>
    if (page === "withdraw") return <WithdrawBalance/>
    if (page === "account") return <ManageAccountDetails/>
    if (page === "history") return <Transactions/>
    if (page === "withdrawalTransaction") return <WithdrawalHistory/>
  };

  return (
    <DashboardStyle>  
      <NavBar dashboard/>
      <div className='dashboard-bar'></div>
      <div className='container'>
          <h1 className='dashboard-title'>{title}</h1>

          <div className='inner-container'>
              <div className='button-container'>
                  {(page === "sellAirtime" || page === "withdraw") &&
                    <DashboardButton /> 
                  }
                  
                  <div className={isMobile ? 'dashbord-mobil-nav' : 'dashboard-navigation'} onClick={()=>setIsMobile(false)}>
                      <p className={`nav-link sell ${clicked[0]["sell"] && "selected"}`} onClick={handleSellAirtime}>Transfer Airtime</p>
                      <p className={`nav-link withdraw ${clicked[0]["widthraw"] && "selected"}`} onClick={handleWithdraw}>Withdraw Balance</p>
                      <p className={`nav-link account ${clicked[0]["account"] && "selected"}`} onClick={handleAccount}>Manage Bank Account</p>
                      <p className={`nav-link history ${clicked[0]["history"] && "selected"}`} onClick={handleHistroy}>Transaction History</p>
                      <p className={`nav-link history ${clicked[0]["withdrawalTransaction"] && "selected"}`} onClick={handlewithdrawalTransaction}>Withdrawal History</p>
                  </div>
                  <FiChevronDown className='icon' onClick={()=>setIsMobile(!isMobile)} />
              </div>
              {renderPage()}
          </div>
      </div>
    </DashboardStyle>
  )
};

const DashboardStyle = styled.div`
  max-width: 1440px;
  width:100%;
  padding-bottom: 8.9375em;
  position: relative;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;


  .dashboard-bar{
    max-width: 1440px;
    width:100%;
    height: 271px;
    background: rgba(222, 61, 109, 0.1);
  }

  .container{
    position:absolute;
    top:11em;
    max-width: 90%;
    width: 679px;
    border: 1px solid #D9D9D9;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    box-sizing: border-box;
  }

  .inner-container{
    max-width: 559px;
    width:100%;
    position:relative;
    display:flex;
    flex-direction:column;
  }

  .button-container{
    max-width: 553px;
    width:100%;
    margin-bottom:2rem;
    display:flex;
    flex-direction:column;
    align-item:center;
    position:relative;
  
  }
  
  .dashboard-navigation{
    display: flex;
    flex-direction: row;
    padding: 0px;
    gap: 25px;
    max-width: 553px;
    width:100%;
    margin-top:2em;
    
    .nav-link{
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 0.75em;
      line-height: 1.3em;
      color: #012A4A;
      text-decoration:none;
      max-width:25%;
      cursor: pointer;
    }

    .nav-link::hover{
      cursor:pointer;
    }

    .selected{
      border-bottom:2px solid #DE3D6D;
    }

    .sell{
      flex: 0 0 74px;
    }

    .withdraw{
      flex: 1 1 127px;
    }

    .account{
      flex: 1 1 150px;
    }

    .history{
      flex: 1 1 127px;
    }
  }

  .bank-account-bar{
    max-width: 553px;
    width:100%;
    display:flex;
    align-items: center;
    margin-top:2rem;
    justify-content:space-between;
  }

  .bank-account-h1{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #012A4A;
  }

  .bank-account-p{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #DE3D6D;
  }

  .icon { 
    width: 40px;
    height: 40px;
    position: absolute;
    display:none;
    right:0px;
    top:100%;
    z-index:3;
    color:black;
  }

  .icon:hover{
    color: red;
  }

  @media (max-width:1066px){
    .dashboard-navigation{
      display:none;
    }

    .icon{
      display:block;
    }

    .dashbord-mobil-nav{
      position:absolute;
      display:flex;
      flex-direction:column;
      justify-content:center
      width:100%;
      background:#fff;
      align-item:center;
      top:100%;
      right:0;
      box-shadow: 5px 10px 8px 10px #888888;
      padding:2rem;
      cursor:pointer;
      z-index:2;
    }
  }
`
export default Dashboard
