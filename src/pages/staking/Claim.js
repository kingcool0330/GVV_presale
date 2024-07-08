import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WalletIcon from "@mui/icons-material/Wallet";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CalculateIcon from "@mui/icons-material/Calculate";
import TokenIcon from "@mui/icons-material/Token";
import PaymentsIcon from "@mui/icons-material/Payments";
import { handleLoading } from "../../actions/loadingActions";

const Claim = (props) => {
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    setEmail(props.auth.isAuthenticated ? props.auth.user.email : "");
  }, [props]);

  return (
    <div className="claim-section">
      <div className="claim-logo">
        <CloseIcon />
      </div>
      <div className="claim-title">xxx@gmail.com</div>
      <div className="amount-group">
        <p className="amount">$GVV500000</p>
        <p className="status">Available</p>
      </div>
      <div className="input-groups">
        <div className="email-group">
          <div className="email-icon">
            <MailOutlineIcon />
          </div>
          <input
            type="text"
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            value={email}
            disabled
          />
        </div>
        <div className="email-group">
          <div className="email-icon">
            <WalletIcon />
          </div>
          <input
            type="text"
            className="email-input"
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Your Wallet"
            value={account}
            disabled
          />
        </div>
      </div>
      <div className="button-groups">
        <div className="button-group">
          <button type="button" className="claim-btn">
            <ArrowDownwardIcon />
          </button>
          <p className="btn-title">Instant Claim</p>
        </div>
        <div className="button-group">
          <button type="button" className="claim-btn">
            <CalculateIcon />
          </button>
          <p className="btn-title">Set Claim schedule</p>
        </div>
        <div className="button-group">
          <button type="button" className="claim-btn">
            <PaymentsIcon />
          </button>
          <p className="btn-title">Stake</p>
        </div>
        <div className="button-group">
          <button type="button" className="claim-btn">
            <TokenIcon />
          </button>
          <p className="btn-title">Buy $GVV</p>
        </div>
      </div>
    </div>
  );
};

Claim.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { handleLoading })(Claim);
