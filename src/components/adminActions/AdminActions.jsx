import './adminActions.scss';
import { useState, useEffect, useRef } from 'react';
import { ActionMenu, OptionModal } from '../../components';
import blurHandler from './blurHandler';
import axios from '../../axios';
import { toast } from 'react-toastify';

const AdminActions = ({ transaction }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleActionMenu = (e) => {
    setShowMenu(!showMenu);
  }

  const hideActionMenu = (e) => {
    setShowMenu(false);
  }

  const cancelTransaction = () => {
    axios.patch(`/transfer/cancel/${transaction.id}`)
    .then(res => {
      if (res.status === 200) {
        toast.info("Transaction Cancelled");
        transaction.status = "cancelled";
      }
    }).catch(err => {
      toast.error("Transaction failed to update");
    })
  }

  const menuRef = useRef();
  const [listening, setListening] = useState(false);

  useEffect(blurHandler(listening, setListening, menuRef, hideActionMenu));

  return (
    <div className="dots" onClick={toggleActionMenu} ref={menuRef}>
      <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.001 0.799805C9.71195 0.799805 9.42574 0.856735 9.1587 0.967346C8.89166 1.07796 8.64903 1.24008 8.44465 1.44446C8.24026 1.64884 8.07814 1.89148 7.96753 2.15852C7.85692 2.42556 7.79999 2.71177 7.79999 3.0008C7.79999 3.28984 7.85692 3.57605 7.96753 3.84309C8.07814 4.11013 8.24026 4.35276 8.44465 4.55715C8.64903 4.76153 8.89166 4.92365 9.1587 5.03426C9.42574 5.14487 9.71195 5.2018 10.001 5.2018C10.5847 5.20167 11.1445 4.96965 11.5572 4.55679C11.9699 4.14393 12.2016 3.58405 12.2015 3.0003C12.2014 2.41656 11.9693 1.85678 11.5565 1.44411C11.1436 1.03144 10.5837 0.799672 9.99999 0.799805H10.001ZM3.00099 0.799805C2.71195 0.799805 2.42574 0.856735 2.1587 0.967346C1.89166 1.07796 1.64903 1.24008 1.44465 1.44446C1.24026 1.64884 1.07814 1.89148 0.967529 2.15852C0.856918 2.42556 0.799988 2.71177 0.799988 3.0008C0.799988 3.28984 0.856918 3.57605 0.967529 3.84309C1.07814 4.11013 1.24026 4.35276 1.44465 4.55715C1.64903 4.76153 1.89166 4.92365 2.1587 5.03426C2.42574 5.14487 2.71195 5.2018 3.00099 5.2018C3.58473 5.20167 4.14451 4.96965 4.55718 4.55679C4.96986 4.14393 5.20162 3.58405 5.20149 3.0003C5.20135 2.41656 4.96934 1.85678 4.55648 1.44411C4.14362 1.03144 3.58373 0.799672 2.99999 0.799805H3.00099ZM17.001 0.799805C16.7119 0.799805 16.4257 0.856735 16.1587 0.967346C15.8917 1.07796 15.649 1.24008 15.4446 1.44446C15.2403 1.64884 15.0781 1.89148 14.9675 2.15852C14.8569 2.42556 14.8 2.71177 14.8 3.0008C14.8 3.28984 14.8569 3.57605 14.9675 3.84309C15.0781 4.11013 15.2403 4.35276 15.4446 4.55715C15.649 4.76153 15.8917 4.92365 16.1587 5.03426C16.4257 5.14487 16.7119 5.2018 17.001 5.2018C17.5847 5.20167 18.1445 4.96965 18.5572 4.55679C18.9699 4.14393 19.2016 3.58405 19.2015 3.0003C19.2014 2.41656 18.9693 1.85678 18.5565 1.44411C18.1436 1.03144 17.5837 0.799672 17 0.799805H17.001Z" fill="black"/>
      </svg>
      {showMenu &&  
        <div>
          <ActionMenu actions={[
            { text: 'Edit', handler: () => { setShowModal(true) } },
            { text: 'Cancel', handler: () => { cancelTransaction() } },
          ]} close={hideActionMenu}/>
        </div>
      }
      {showModal && <OptionModal close={() => { setShowModal(false) }} transaction={transaction} />}
    </div>
  )
}

export default AdminActions;