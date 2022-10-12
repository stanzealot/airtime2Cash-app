import React,{useState} from 'react'
import styled from 'styled-components'

function DashboardButton() {
    const { wallet } = JSON.parse(localStorage.getItem('userInfo'))
    const [balance] = useState(wallet);
    
    return (
        <DashboardButtonStyle>
            <div className='btn-container'>
                <div className='btn-balance'>
                    <h6 className='btn-balance-h6'>wallet balance</h6>
                    <h2 className='btn-balance-h2'>{`₦${balance}`}</h2>
                </div>
                <p className='btn-container-p'>Account is active</p>
            </div>
        </DashboardButtonStyle>
    )
};

const DashboardButtonStyle = styled.div`
    max-width: 553px;
    width:100%;
    padding:1rem 0px;
    
    background: #DE3D6D;
    border-radius: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    box-sizing:border-box;

    .btn-container{
        max-width: 183px;
        width:33.092%;
        display: flex;
        flex-direction: column;
        align-items: center;   
        padding: 0px;
        

    }
    .btn-balance{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px;
        width:100%;
        max-width: 183px;
        heigth:74%;
        max-height:74px;
        

    }
    .btn-balance-h6{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        padding:0;
        margin:0px 0px 0.8em 0px;
        line-height: 1.1875em;
        color: #FFFFFF;
        height: 26.1%;
        max-height: 19px;
    }
    .btn-balance-h2{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 2rem;
        line-height: 39px;
        color: #FFFFFF;
        padding:0px;
        margin:0px;
    }
    .btn-container-p{
        padding: 8px 10px 8px 8px;
        background: rgba(0, 0, 0, 0.05);
        opacity: 0.8;
        border: 1px solid rgba(0, 0, 0, 0.04);
        border-radius: 6.25em;
        padding: 0.5em;
        margin:0.3em 0px 0px 0px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;

        line-height: 12px;
        color: #FFFFFF;
    }

    @media (max-width:890px){
        .btn-container{
            width:70%;
        }
        .btn-balance-h2{
            font-size:1.5rem;
        }
        .btn-balance-h6{
            margin-bottom:0.3rem;
        }
    }

    @media (max-width:454px){
        .btn-balance-h2{
            font-size:1rem;
            margin-top:0px;
        }
        .btn-balance-h6{
            font-size:0.6rem;
            font-weight:400;
            margin-bottom:0px;
        }
    }
    
`

export default DashboardButton;