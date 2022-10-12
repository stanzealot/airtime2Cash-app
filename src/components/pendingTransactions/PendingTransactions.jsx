import './pendingTransactions.scss';
import { useState, useEffect } from 'react';
import { Table, AdminActions, Status } from '../../components';
import axios from '../../axios';

const PendingTransactions = () => {
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber'
    },
    {
      Header: 'Amount Sent',
      accessor: 'amountToSell'
    },
    {
      Header: 'Amount to Receive',
      accessor: 'amountToReceive'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'Action',
      accessor: 'action'
    }
  ]);
  
  const getPage = async (page=0, size=4) => {
    const res = await axios.get(`/transfer/transactions/pending?page=${page}&size=${size}`)
    const { rows } = res.data.pending;
    rows.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setData(rows.map(row => { 
      return {
        ...row,
        status: <Status status={row.status} />,
        action: <AdminActions transaction={row} />,
        email: row.customer.email
      }
    }))

  }

  useEffect(() => {
    getPage()
  }, [])

  return (
    <div className='overview-tab'>
      <h1 className='tab-title'>Admin Dashboard</h1>
      {!!data.length && <div className='scroll-container'>
        <div className='pending-transactions'>
          <Table columns={columns} data={data} />
        </div>
      </div>}
      {!data.length && <div className='no-pending'>No pending transactions</div>}
    </div>
  );
}

export default PendingTransactions;