import Logo from "../logo/Logo";
import "./logoWithTypeface.scss"; 

const LogoWithTypeface = () => {
  return (
    <div className="logoWithTypeface">
      <Logo width={32} height={56} />
      <p>
        <span className="violet">Airtime</span><span className="orange">2Cash</span>
      </p>
    </div>
  )
};

export default LogoWithTypeface;