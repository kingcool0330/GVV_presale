import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleLoading } from "../../actions/loadingActions";
import Withdrawing from "./Withdrawing";
import Stake from "./Stake";
import Claim from "./Claim";

// load assets
import PresaleOverviewImage from "../../assets/image/overview.png";

// load style
import "./staking.scss";

const Index = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  return (
    <div className="staking">
      <div className="container">
        <div className="section">
          <div className="overview">
            <h1 className="over-title">$GVV {t("Overview")}</h1>
            <div className="overview-list">
              <div className="item">
                <img className="overview-image" src={PresaleOverviewImage} />
                <h2 className="title">80.66%</h2>
                <p className="content">$GVV Annualized Staking Yield</p>
              </div>
              <div className="item">
                <img className="overview-image" src={PresaleOverviewImage} />
                <h2 className="title">$20,000,000</h2>
                <p className="content">Total $GVV Staked</p>
              </div>
              <div className="item">
                <img className="overview-image" src={PresaleOverviewImage} />
                <h2 className="title">55%</h2>
                <p className="content">% $GVV Staking</p>
              </div>
              <div className="item">
                <img className="overview-image" src={PresaleOverviewImage} />
                <h2 className="title">$1000</h2>
                <p className="content">Minimum Allowed Staking</p>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/withdraw" exact element={<Withdrawing />} />
            <Route path="/stake" exact element={<Stake />} />
            <Route path="/claim" exact element={<Claim />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

Index.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { handleLoading })(Index);
