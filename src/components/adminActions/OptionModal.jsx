import './optionModal.scss';
import { useState, useRef, useEffect } from 'react';
import { FormInput, Button } from '../../components';
import { toast } from 'react-toastify';
import axios from '../../axios';

const OptionModal = ({ transaction, close }) => {
  const modalRef = useRef();
  const [amtSent, setAmtSent] = useState(transaction.amountToSell);
  const [amtToReceive, setAmtToReceive] = useState(0.7 * amtSent);

  const evalClose = (e) => {
    if (modalRef.current.contains(e.target)) return
    close();
  }

  useEffect(() => {
    setAmtToReceive(0.7 * amtSent);
  }, [amtSent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`/transfer/confirm/${transaction.id}`, {
      amountToSell: amtSent,
      amountToReceive: amtToReceive
    }).then(res => {
      if (res.status === 200) {
        toast.success("Transaction Confirmed");
        transaction.status = "confirmed";
        axios.patch(`/admin/wallet`, {
          email: transaction.customer.email,
          amountToSell: amtSent,
          amountToReceive: amtToReceive,
          transactionId: transaction.id
        }).then(res => {
          if (res.status === 200) {
            toast.success("Wallet Credited!");
            transaction.status = "sent"
          }
        }).catch(err => {
          toast.error("Wallet Credit Failed!");
        })
        close();
      }
    }).catch(err => {
      toast.error("Transaction failed to update");
    })
  }

  const handleAmtSentChange = (e) => {
    const { value } = e.target;
    const numeric = value.split('₦')[1]
    setAmtSent(numeric);
  }

  return (
    <div className='overlay' onClick={evalClose}>
      <div className='optionModal' ref={modalRef}>
        <h2 className='modalHeading'>Enter an amount</h2>
        <form className='modalForm' onSubmit={handleSubmit}>
          <FormInput label="Amount sent" value={"₦" + amtSent} handleChange={handleAmtSentChange} />
          <FormInput label="Amount to receive" disabled={true} value={"₦"+amtToReceive} />
          <Button type="submit">Confirm</Button>
        </form>
      </div>
    </div>
  )
}

export default OptionModal;