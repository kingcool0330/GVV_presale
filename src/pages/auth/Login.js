import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import { handleAuthLoading } from "../../actions/loadingActions";
import { signUser } from "../../actions/authActions";

//load assets
import "./login.scss";

const Login = (props) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    props.handleAuthLoading(true);

    fetch("https://restcountries.com/v3.1/all")
      .then(async (response) => response.json())
      .then(async (data) => {
        const countries = await data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        await countries.sort((a, b) => a.name.localeCompare(b.name));
        await setCountryList(countries);
        await props.handleAuthLoading(false);
      })
      .catch((error) => {
        props.handleAuthLoading(false);
        console.error("Error fetching country data:", error);
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = !props.flag ? "hidden" : "auto";
  }, [props.flag]);

  const handleSignUp = async () => {
    const params = {
      email,
      country,
    };

    await props.handleAuthLoading(true);
    await props.signUser(params);
    await props.handleAuthLoading(false);
  };

  return (
    <div className={props.flag ? "login" : "login up"}>
      <div className="login-section">
        <h1 className="login-title">Purchase your order</h1>
        <div className="sign-groups">
          <div className="sign-group">
            <div className="sign-icon">
              <MailOutlineIcon />
            </div>
            <input
              type="text"
              className="sign-input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              value={email}
            />
          </div>
          <div className="sign-group">
            <div className="sign-icon">
              <LanguageIcon />
            </div>
            <select
              className="sign-input"
              placeholder="COUNTRY"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">COUNTRY</option>
              {countryList?.map((item, key) => {
                return (
                  <option value={item.code} key={key}>
                    {t(item.name)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button className="pruchase-btn" type="button" onClick={handleSignUp}>
          Proceed to purchase
        </button>
        {/* <button className="close-btn" type="button">
          <CloseIcon />
        </button> */}
      </div>
    </div>
  );
};

Login.propTypes = {
  signUser: PropTypes.func.isRequired,
  handleAuthLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { signUser, handleAuthLoading })(Login);
