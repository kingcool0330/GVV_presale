import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleLoading } from "../actions/loadingActions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LineChart from "../components/LineChart";
import DoughnutChart from "../components/DoughnutChart";
import { useTranslation } from "react-i18next";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// load assets
import PresaleOverviewImage from "../assets/image/overview.png";
import StakingOverviewImage from "../assets/image/stake-overview.png";

// load style
import "./home.scss";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Home = (props) => {
  const { t } = useTranslation();
  const [chartFilter, setChartFilter] = useState("day");

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  return (
    <div className="home">
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
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { handleLoading })(Home);
