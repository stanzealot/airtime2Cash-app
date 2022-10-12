import "./WithdrawalHistory.scss";
import React, { useState, useEffect } from "react";
import { Pagination } from "..";
import axios from "../../axios";
import { toast } from "react-toastify";

const WithdrawalHistory = () => {
  const [withdraw, setWithdraw] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getWithdrawal = async () => {
    try {
      const res = await axios.get(`/withdrawal/all`);
      let accounts = res.data.withdrawals;
      setWithdraw(accounts);
    } catch (err) { toast.error(err.response?.data?.msg || "Something went wrong") }
  };

  useEffect(() => {
    getWithdrawal();
  }, []);

  const idxOfLastItem = curPage * itemsPerPage;
  const idxOfFirstItem = idxOfLastItem - itemsPerPage;
  const itemsToShow = withdraw.slice(idxOfFirstItem, idxOfLastItem);

  const paginate = (pageNumber) => setCurPage(pageNumber);

  const weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

  return (
    <>
      <div className="withdraws">
        {itemsToShow.map((withdraw) => (
          <div className="withdrawal" key={withdraw.id}>
            <div className="withdraw-details">
              <p className="wd1">
                {weekday[new Date(withdraw.createdAt).getUTCDay()] +
                  "," +
                  " " +
                  withdraw.createdAt.slice(11, 19)}
              </p>
              <p className="wd2">{withdraw.bank}</p>
              <p className="wd3">{withdraw.createdAt.slice(0, 10)}</p>
            </div>
            <div className="withdraw-status">
              <div className="withdrawal-status">
                {withdraw.status ? "Received" : "Pending"}
              </div>
              <p className="withdrawal-amount">&#8358;{withdraw.amount}</p>
            </div>
          </div>
        ))}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={withdraw.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default WithdrawalHistory;
