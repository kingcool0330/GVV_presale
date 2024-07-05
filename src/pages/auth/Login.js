import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

//load assets
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="section">
          <div className="login-section">
            <h1 className="login-title">Purchase your order</h1>
            <div className="sign-groups">
              <div className="sign-group">
                <div className="sign-icon">
                  <MailOutlineIcon />
                </div>
                <input
                  type="number"
                  className="sign-input"
                  placeholder="EMAIL"
                />
              </div>
              <div className="sign-group">
                <div className="sign-icon">
                  <LanguageIcon />
                </div>
                <select className="sign-input" placeholder="COUNTRY">
                  <option value="">COUNTRY</option>
                  <option value="ca">Canada</option>
                  <option value="sr">Serbia</option>
                  <option value="jp">Japna</option>
                </select>
              </div>
            </div>
            <button className="pruchase-btn" type="button">
              Proceed to purchase
            </button>
            <button className="close-btn" type="button">
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
