import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleLoading } from "../../actions/loadingActions";
import { useTranslation } from "react-i18next";
import DoughnutChart from "../../components/DoughnutChart";

// load assets
import GvvbackImage from "../../assets/image/gvv_back.png";

const Description = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  return (
    <div className="desc-section">
      <h2 className="desc-title">{t("Lorem Ipsum")}</h2>
      <div className="desc-main">
        <div className="desc-part">
          <h2 className="sub-title">{t("stake")} $GVV</h2>
          <p className="sub-desc">{t("sub-desc-1")}</p>
          <p className="sub-desc">{t("sub-desc-2")}</p>
          <img src={GvvbackImage} className="desc-image" />
        </div>
        <div className="chart-part">
          <div className="doughnut-chart">
            <DoughnutChart />
          </div>
          <div className="percent-section">
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#0f42f2" }}
              ></div>
              <p className="percent-text">Private Round Stage 1</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#195818" }}
              ></div>
              <p className="percent-text">Private Round Stage 2</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#b8379b" }}
              ></div>
              <p className="percent-text">Public Round</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#deebbc" }}
              ></div>
              <p className="percent-text">Top Influencer's Award</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#3789b8" }}
              ></div>
              <p className="percent-text">Private Round Stage 1</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#cbfb45" }}
              ></div>
              <p className="percent-text">Team</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#deebbc" }}
              ></div>
              <p className="percent-text">Marketing, R&D, Staking</p>
            </div>
            <div className="percent-item">
              <div
                className="round"
                style={{ backgroundColor: "#fa5757" }}
              ></div>
              <p className="percent-text">Treasury</p>
            </div>
          </div>
          <h2 className="purchase-title">$GVV 200,000,000 Purchased</h2>
          <div className="progress-section">
            <p className="progress-title">$GVV 200,000,000</p>
            <div className="progress-bar-main">
              <div className="progress-bar"></div>
            </div>
            <p className="progress-text">$GVV Purchased in 1069 Days</p>
          </div>
          <div className="purchase-btn-group">
            <button type="button" className="whitepaper-btn">
              Read White Paper
            </button>
            <button type="button" className="buygvv-btn">
              Buy $GVV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Description.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { handleLoading })(Description);
