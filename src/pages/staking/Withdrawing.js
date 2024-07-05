import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { handleLoading } from "../../actions/loadingActions";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoughnutChart from "../../components/DoughnutChart";
import LineChart from "../../components/LineChart";

// load assets
import StakingOverviewImage from "../../assets/image/stake-overview.png";

const Withdrawing = (props) => {
  const { t } = useTranslation();
  const [chartFilter, setChartFilter] = useState("day");

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  return (
    <>
      <div className="chart-section">
        <div className="chart">
          <div className="charting">
            <DoughnutChart />
          </div>
        </div>
        <div className="content">
          <p className="text">{t("account balance")}</p>
          <h2 className="content-title">$GVV 500,000</h2>
          <div className="staking-overview">
            <img
              src={StakingOverviewImage}
              className="staking-overview-image"
            />
            <div className="sub-title-section">
              <p className="sub-title">
                {t("Profits")} ( 1 {t("month")} )
              </p>
              <p className="sub-text">
                <ArrowUpwardIcon />
                +164%
              </p>
            </div>
            <div className="sub-content-section">$GVV 1000</div>
          </div>
          <div className="staking-overview">
            <img
              src={StakingOverviewImage}
              className="staking-overview-image"
            />
            <div className="sub-title-section">
              <p className="sub-title">{t("Withdraw in Progress")}</p>
              <p className="sub-text">
                <ArrowUpwardIcon />
                +164%
              </p>
            </div>
            <div className="sub-content-section">$GVV 10</div>
          </div>
          <div className="button-group">
            <button type="button" className="button-stake staking">
              {t("stake")} $GVV
            </button>
            <button type="button" className="button-stake withdraw">
              {t("withdraw")} $GVV
            </button>
          </div>
        </div>
      </div>
      <div className="line-chart-section">
        <div className="search-section">
          <h2 className="search-title">{t("Real annual chart title")}</h2>
          <div className="search-list">
            <button
              type="button"
              className={
                chartFilter === "day" ? "list-item active" : "list-item"
              }
              onClick={() => setChartFilter("day")}
            >
              {t("Day")}
            </button>
            <button
              type="button"
              className={
                chartFilter === "week" ? "list-item active" : "list-item"
              }
              onClick={() => setChartFilter("week")}
            >
              {t("Week")}
            </button>
            <button
              type="button"
              className={
                chartFilter === "month" ? "list-item active" : "list-item"
              }
              onClick={() => setChartFilter("month")}
            >
              {t("Month")}
            </button>
            <button
              type="button"
              className={
                chartFilter === "year" ? "list-item active" : "list-item"
              }
              onClick={() => setChartFilter("year")}
            >
              {t("Year")}
            </button>
          </div>
        </div>
        <div className="line-chart">
          <LineChart />
        </div>
      </div>
    </>
  );
};

Withdrawing.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { handleLoading })(Withdrawing);
