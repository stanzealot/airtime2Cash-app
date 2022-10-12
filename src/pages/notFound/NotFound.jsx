import "./notFound.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "../../components";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const goToHome = () => {
    navigate('/');
  }

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="not-found">
      <div className="not-found_container">
        <main className="not-found_main">
          <section className="not-found_section">
            <div className="not-found_icon">
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#DE3D6D" d="M12,14a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,14Zm0-1.5a1,1,0,0,0,1-1v-3a1,1,0,0,0-2,0v3A1,1,0,0,0,12,12.5ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"/></svg>
            </div>
            <div className="not-found_content">
              <h1 className="not-found_title">Error: Page Not Found</h1> 
              <p className="not-found_message">The page you requested ({path}) does not exist or the link is broken. Check the URL for any typos.</p>
              <Button handleClick={goToHome} type="button" disabled={false}>Home</Button>
              <button onClick={goBack} className='fpsl-back2login'>
                <IoMdArrowBack />Go Back
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
};

export default NotFound;