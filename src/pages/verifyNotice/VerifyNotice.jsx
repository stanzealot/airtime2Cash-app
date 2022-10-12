import "./verifyNotice.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components";
import axios from "../../axios";

const VerifyNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const resendVerification = () => {
    if (!id) return;

    axios.get(`/user/verify/${id}`)
      .then((res) => {
        res.status === 200 ? toast.success(res.data.msg) : toast.error(res.data.msg);
      })
      .catch(err => {
        toast.error(err.message);
      })
  };

  const goToLogin = () => {
    navigate('/login')
  };

  return (
  <div className="verify-notice">
    <div className="verify-notice_container">
      <main className="verify-notice_main">
        <section className="verify-notice_section">
          <div className="mail-icon">
            <svg width="90" height="72" viewBox="0 0 90 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M90 52L70 72L56 58L62 52L70 60L84 46L90 52ZM48 56H8V16L40 36L72 16V36H80V8C80 3.6 76.4 0 72 0H8C3.6 0 0 3.6 0 8V56C0 60.4 3.6 64 8 64H48V56ZM72 8L40 28L8 8H72Z" fill="#03435F"/>
            </svg>
          </div>
          <div className="verify-notice_content">
            <h1 className="verify-notice_title">Check your mail</h1> 
            <p className="verify-notice_message">We've sent a link to your email to verify your account. This is to prevent others from signing up with your info. Please check your mail and click the link.</p>
            <p className="verify-notice_resend-prompt">Didn't receive the email?<span onClick={resendVerification} className="resend-verification">Click to Resend link</span></p>
            <Button handleClick={goToLogin} type="button" disabled={false}>Continue to Login</Button>
          </div>
        </section>
      </main>
    </div>
  </div>
  )
};

export default VerifyNotice;