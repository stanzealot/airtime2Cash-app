import './adminTransactions.scss';
import { useState, useEffect } from 'react';
import { Table, Status } from '../../components';
import axios  from '../../axios';

const AdminTransactions = () => {
  const [data, setData] = useState([]);
  const [columns] = useState([
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
      Header: 'Network',
      accessor: 'network'
    },
    {
      Header: 'Status',
      accessor: 'status'
    }
  ]);
  
  const getPage = async (page=0, size=4) => {
    const res = await axios.get(`/transfer/transactions/all?page=${page}&size=${size}`)
    const { rows } = res.data.transactions;
    rows.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setData(rows.map(row => {
      return {
        ...row,
        status: <Status status={row.status} />
      }
    }))
  }

  useEffect(() => {
    getPage()
  }, [])

  return (
    <div className='transactions-tab'>
      <h1 className='tab-title'>Transactions</h1>
      <div className='scroll-container'>
        <div className='transactions'>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default AdminTransactions;