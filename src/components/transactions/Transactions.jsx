import "./Transaction.scss";
import React, { useState, useEffect } from "react";
import { Pagination } from "../";
import axios from "../../axios";
import { toast } from "react-toastify";

const Transactions = () => {
  const [trans, setTrans] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const getTransaction = async () => {
    const id = JSON.parse(localStorage.getItem("userInfo")).id;
    try {
      const res = await axios.get(`transfer/${id}`);
      setTrans(res.data.transactions.rows);
    } catch (err) { toast.error(err.response?.data?.msg || "Something went wrong") }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const idxOfLastItem = curPage * itemsPerPage;
  const idxOfFirstItem = idxOfLastItem - itemsPerPage;
  const itemsToShow = trans.slice(idxOfFirstItem, idxOfLastItem);

  const paginate = (pageNum) => setCurPage(pageNum);
  const weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

  return (
    <>
      <div className="transactions">
        {itemsToShow.map((trans) => (
          <div className="trans" key={trans.id}>
            <div className="trans-details">
              <p className="td1">
                {weekday[new Date(trans.createdAt).getUTCDay()] +
                  "," +
                  " " +
                  trans.createdAt.slice(11, 19)}
              </p>
              <p className="td2">{trans.network}</p>
              <p className="td3">{trans.createdAt.substring(0, 10)}</p>
            </div>
            <div className="trans-status">
              <div
                className={
                  trans.status === "pending"
                    ? "pending gen"
                    : trans.status === "confirmed"
                    ? "confirmed gen"
                    : trans.status === "sent"
                    ? "sent gen"
                    : "default gen"
                }
              >
                <span className="txt-color"> {trans.status}</span>
              </div>
              <p className="amount">&#8358;{trans.amountToSell}</p>
            </div>
          </div>
        ))}
        <Pagination itemsPerPage={itemsPerPage} totalItems={trans.length} paginate={paginate}/>
      </div>
    </>
  );
};

export default Transactions;
