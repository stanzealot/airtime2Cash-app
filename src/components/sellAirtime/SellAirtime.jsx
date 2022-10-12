import React, { useState, useEffect, useRef,useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./SellAirtime.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { NotifyAdminModal } from "../";
import { toast } from "react-toastify";
import axios from "../../axios";
import { InfinitySpin } from 'react-loader-spinner'
import "./SellAirtime.css";


const SellAirtime = () => {
    const allNetworks = ["Select Network", "AIRTEL", "MTN", "9MOBILE", "GLO"];
    const [networks] = useState(allNetworks);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //CLOSE POP-UP
    const closeModal = () => {
        setShowModal(false);
    };

    const initialValues = {
        network: "",
        phoneNumber: "",
        amountToSell: "",
        ussd: "",
        amountToReceive: "",
        destinationPhoneNumber: "",
    };

    //currency formater
    const formatter = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    //Input field validator
    const validate = (values) => {
        let errors = {};
        if (!values.phoneNumber) {
            errors.phoneNumber = "phone number is required";
        } else if (values.phoneNumber.length < 11) {
            errors.phoneNumber = "phone number can't be less than 11";
        } else if (values.phoneNumber.length > 11) {
            errors.phoneNumber = "phone number can't be more than 11";
        }
        if (!values.amountToSell) {
            errors.amountToSell = "amount to sell is required";
        } else if (values.amountToSell < 50) {
            errors.amountToSell = `Minimum amount is ${formatter.format(50)}`;
        } else if (values.amountToSell > 5000) {
            errors.amountToSell = `Maximum amount(${formatter.format(
                5000
            )}) exceeded`;
        }
        return errors;
    };

    //REFS
    const creditRef = useRef(null);
    const sellRef = useRef(null);
    const networkRef = useRef(null);
    const ussdRef = useRef(null);
    const phoneNumRef = useRef(null);
    const destinationNumberRef = useRef(null);

    //ADMIN NUMBERS
    const airtelNumber = "08121449020";
    const mtnNumber = "08135520498";
    const gloNumber = "08113792805";
    const etisalatNumber = "08186152364";
    const [networkCode, setNetworkCode] = useState("network-code");
    const [networkName, setNetworkName] = useState("network-name");
    const [recipientNumber, setRecipientNumber] = useState("recipient-number");
    const [userPin, setUserPin] = useState("*userPin");

    const changeNetwork = useCallback(() => {
        if (networkRef.current.value === "AIRTEL") {
            setNetworkCode("432");
            setNetworkName("AIRTEL");
            setRecipientNumber(airtelNumber);
            setUserPin("");
        }
        if (networkRef.current.value === "MTN") {
            setNetworkCode("777");
            setNetworkName("MTN");
            setRecipientNumber(mtnNumber);
            setUserPin("*userPin");
        }
        if (networkRef.current.value === "GLO") {
            setNetworkCode("131");
            setNetworkName("GLO");
            setRecipientNumber(gloNumber);
            setUserPin("*userPin");
        }
        if (networkRef.current.value === "9MOBILE") {
            setNetworkCode("223");
            setNetworkName("9MOBILE");
            setRecipientNumber(etisalatNumber);
            setUserPin("*userPin");
        }
    }, []);

    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const ID = userData.id

    const handleSubmit = async (values, { resetForm }) => {
        const creditedAmount = creditRef.current.value;
        let phoneNumber = phoneNumRef.current.value;
        let amountToSell = sellRef.current.value;

        const data = {
            network: networkName,
            phoneNumber,
            amountToSell,
            amountToReceive: creditedAmount
        }
        try {
            setIsLoading(true)
            const res = await axios.post(`/transfer/${ID}`, data)
            if (res.status === 201) {
                setIsLoading(false)
                setShowModal(true);
                resetForm({ values: "" })
            }
            else {
                toast.error("Error 403: Incorrect input values");
            }
        }
        catch (err) {
            toast.error("Error 500 : Transaction unsuccessful, server down");
        }
    };

    const networkOptions = networks.map((network, key) => (
        <option defaultValue={network} key={key}>
            {network}
        </option>
    ));

    return (
        <div className="dashboard_frame">
            {showModal && <NotifyAdminModal closeModal={closeModal} />}
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    const { values, handleChange, handleSubmit, errors, touched } =
                        formik;
                    return (
                        <>
                            {isLoading && (
                            <div className="loader_overlay">
                                <InfinitySpin className="loader"
                                    width='200'
                                    color="#4fa94d"
                                />
                            </div>)}

                            <form className="form_container" onSubmit={handleSubmit}>
                                <div style={{ width: "100%" }}>

                                    <h3 className="selected_title">sell airtime</h3>
                                    {/* NETWORK */}
                                    <div className="form_group">
                                        <div className="label_container">
                                            <label className="form_label" htmlFor="network">
                                                Network
                                            </label>
                                        </div>
                                        <div className="input_container">
                                            <select
                                                name="network"
                                                as="select"
                                                className={
                                                    errors.network && touched.network
                                                        ? "input-error"
                                                        : "form_input"
                                                }
                                                id="network"
                                                data-testid="network-input"
                                                title="input-input"
                                                type="text"
                                                ref={networkRef}
                                                defaultValue={values.network}
                                                onChange={changeNetwork}
                                            >
                                                <option value={""} disabled>
                                                    Select network
                                                </option>
                                                {networkOptions}
                                            </select>
                                            {errors.network && touched.network && (
                                                <span className="error">{errors.network}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* PHONE NUMBER */}
                                    <div className="form_group">
                                        <div className="label_container">
                                            <label className="form_label" htmlFor="phoneNumber">
                                                Phone Number
                                            </label>
                                        </div>
                                        <div className="input_container">
                                            <input
                                                type="text"
                                                className={
                                                    errors.phoneNumber && touched.phoneNumber
                                                        ? "input-error"
                                                        : "form_input"
                                                }
                                                placeholder="phone number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                ref={phoneNumRef}
                                                data-testid="number-input"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                            />
                                            {errors.phoneNumber && touched.phoneNumber && (
                                                <span className="error">{errors.phoneNumber}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* AMOUNT TO SELL */}
                                    <div className="form_group">
                                        <div className="label_container">
                                            <label className="form_label" htmlFor="amountToSell">
                                                Amount to Sell
                                            </label>
                                        </div>
                                        <div className="input_container">
                                            <input
                                                type="text"
                                                className={
                                                    errors.amountToSell && touched.amountToSell
                                                        ? "input-error"
                                                        : "form_input"
                                                }
                                                placeholder="NGN"
                                                id="amountToSell"
                                                name="amountToSell"
                                                ref={sellRef}
                                                value={values.amountToSell}
                                                onChange={handleChange}
                                            />
                                            {errors.amountToSell && touched.amountToSell && (
                                                <span className="error">{errors.amountToSell}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* USD */}
                                    <div className="form_group">
                                        <div className="label_container">
                                            <label className="form_label" htmlFor="ussd">
                                                USSD
                                            </label>
                                        </div>
                                        <div className="input_container ussd">
                                            <input
                                                type="text"
                                                className={
                                                    errors.ussd && touched.ussd
                                                        ? "input-error"
                                                        : "form_input filled"
                                                }
                                                placeholder="*780*amount*09088765433*5000#"
                                                id="ussd"
                                                name="ussd"
                                                disabled
                                                ref={ussdRef}
                                                value={`*${networkCode}*${recipientNumber}*${values.amountToSell}${userPin}#`}
                                                onChange={handleChange}
                                            />
                                            <CopyToClipboard
                                                text={`*${networkCode}*${recipientNumber}*${values.amountToSell}${userPin}#`}
                                                onCopy={() =>
                                                    toast.success("ussd code copied to clipboard", {
                                                        position: toast.POSITION.TOP_CENTER,
                                                    })
                                                }
                                            >
                                                <span className="copy_icon">
                                                    <FaRegCopy />
                                                </span>
                                            </CopyToClipboard>
                                            {errors.ussd && touched.ussd && (
                                                <span className="error">{errors.ussd}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* AMOUNT TO RECEIVE */}
                                    <div className="form_group">
                                        <div className="label_container">
                                            <label className="form_label" htmlFor="amountToReceive">
                                                Amount to Receive
                                            </label>
                                        </div>
                                        <div className="input_container">
                                            <input
                                                type="text"
                                                className={
                                                    errors.amountToReceive && touched.amountToReceive
                                                        ? "input-error"
                                                        : "form_input filled"
                                                }
                                                placeholder="NGN"
                                                id="amountToReceive"
                                                name="amountToReceive"
                                                disabled
                                                ref={creditRef}
                                                value={`${Math.round(
                                                    Number(values.amountToSell) * 0.7
                                                )}`}
                                                onChange={handleChange}
                                            />
                                            {errors.amountToReceive && touched.amountToReceive && (
                                                <span className="error">{errors.amountToReceive}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* DESTINATION PHONE NUMBER */}
                                    <div className="form_group">
                                        <div className="label_container">
                                            <label
                                                className="form_label"
                                                htmlFor="destinationPhoneNumber"
                                            >
                                                Destination Phone Number
                                            </label>
                                        </div>
                                        <div className="input_container">
                                            <input
                                                type="text"
                                                className={
                                                    errors.destinationPhoneNumber &&
                                                        touched.destinationPhoneNumber
                                                        ? "input-error"
                                                        : "form_input filled"
                                                }
                                                placeholder="destination phone number"
                                                id="destinationPhoneNumber"
                                                name="destinationPhoneNumber"
                                                data-testid="recipient-number-input"
                                                disabled
                                                ref={destinationNumberRef}
                                                value={recipientNumber}
                                                onChange={handleChange}
                                            />
                                            {errors.destinationPhoneNumber &&
                                                touched.destinationPhoneNumber && (
                                                    <span className="error">
                                                        {errors.destinationPhoneNumber}
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                    <p className="text">
                                        After transferring the airtime, click on the "Send" button
                                        below
                                    </p>
                                    <button type="submit" className="sell_btn" name="sellBtn">
                                        send
                                    </button>
                                </div>
                            </form>
                        </>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SellAirtime;
