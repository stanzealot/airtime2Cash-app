import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './withdrawbalance.css';
import { toast } from 'react-toastify';
import axios from '../../axios';

export default function WithdrawBalance() {
    const [accounts, setAccounts] = useState([]);
    const [password, setPassword] = useState('');
    const [selectedAccount, setSelectedAccount] = useState({
        id: '',
        bank: '',
        name: '',
        number: '',
        bankCode: '',
    });

    const [withdrawal, setWithdrawal] = useState({
        name: '',
        number: '',
        bank: '',
        code: '',
        amount: 0
    });

    const getAccounts = async () => {
        try {
            const res = await axios.get('/account')
            if (res.status === 200) {
                setAccounts(res.data.accounts)
            }
        } catch (err) {
            toast.error(err.response?.data?.msg || "Something went wrong");
        }
    };

    useEffect(() => {
        getAccounts()
    }, []);

    const fillAccountDetails = (e) => {
        const account = accounts.find(account => account.id === e.target.value)
        setSelectedAccount(account)
        setWithdrawal({
            name: account.name,
            number: account.number,
            bank: account.bank,
            code: account.bankCode,
            amount: ''
        })
    };

    const amounHandler = (e) => {
        const { name, value } = e.target;
        setWithdrawal({ ...withdrawal, [name]: value })
    };
    
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    };

    const onSubmit = async () => {
        const body = { ...withdrawal, password };
        try {
            const res = await axios.post('/withdrawal', body);
            if (res.status === 201) {
                toast.success(res.data.msg);
            }
        } catch (err) { toast.error(err.response?.data?.msg || "Something went wrong") }
    };

    const initialValues = {
        amount: '',
        password: ''
    };

    const accountOptions = accounts.map((account) =>
        <option value={account.id} key={account.id}>{account.bank} - {account.number} - {account.name}</option>
    );

    const renderError = (message) => <p className='warning'>{ message }</p>

    return (
        <div className='withdraw-container'>
            <div className="withdraw-body">
                <h3 className="withdraw_h3">Withdraw</h3>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className='user-form'>
                        <label className='select_account_label'> Select Account</label>
                        <Field
                            name='account'
                            as='select'
                            className='select'
                            type='text'
                            placeholder='Select'
                            id='dropdown'    
                            onInput={fillAccountDetails}
                            value={selectedAccount.id}
                        >
                        <option className='select_account_dropdown' value={''}>Select</option>
                            {accountOptions}
                        </Field>

                        <ErrorMessage name='account' render={renderError}/>

                        <label className='select_account_label'>Account Name</label>
                        <Field
                            type='text'
                            className='withdraw_balance_input'
                            name='name'
                            value={selectedAccount.name}
                        />
                        <ErrorMessage name='name' render={renderError}/>

                        <label className='select_account_label'>Account Number</label>
                        <Field
                            type='text'
                            className='withdraw_balance_input'
                            name='number'
                            value={selectedAccount.number}
                        />
                        <ErrorMessage name='number' render={renderError} />
                        
                        <label className='select_account_label'>Bank</label>
                        <Field
                            type='text'
                            className='withdraw_balance_input'
                            name='bank'
                            value={selectedAccount.bank}
                        />
                        <ErrorMessage name='bank' render={renderError}/>

                        <label className='select_account_label'>Amount</label>
                        <Field
                            type='number'
                            placeholder='NGN'
                            className='withdraw_balance_input'
                            name='amount'
                            value={withdrawal.amount}
                            onChange={amounHandler}
                        />
                        <ErrorMessage name='amount' render={renderError} />
                        
                        <label className='select_account_label'>Password</label>
                        <Field
                            type='password'
                            placeholder='Password'
                            className='withdraw_balance_input'
                            name='password'
                            value={password}
                            onChange={passwordHandler}
                        />
                        <ErrorMessage name='password' render={renderError}/>
                        <button type='submit' className='withdrawBtn'>Withdraw</button> 
                    </Form>
                </Formik>
            </div>
        </div>
    
    )
};
