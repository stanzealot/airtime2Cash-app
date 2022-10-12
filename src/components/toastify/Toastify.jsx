import { ToastContainer } from "react-toastify";

const Toastify  = ()=>{
  return (
    <ToastContainer position="top-right"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={true}
      limit={2}
      draggable
      pauseOnHover
      theme='light'
    />
  )
};

export default Toastify;