import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleLoading } from "../../actions/loadingActions";
import ErrorIcon from "@mui/icons-material/Error";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BeatLoader from "react-spinners/BeatLoader";
import CloseIcon from "@mui/icons-material/Close";

// load image assets
import PresaleImage from "../../assets/image/presale-gvv.png";
import PresaleOverviewImage from "../../assets/image/overview.png";
import PresaleVideo from "../../assets/image/video.png";
import EthereumImage from "../../assets/image/ethereum.png";
import MaticImage from "../../assets/image/matic.webp";
import UsdtImage from "../../assets/image/usdt.png";
import BnbImage from "../../assets/image/bnb.png";

// load style
import "./presale.scss";
import { useTranslation } from "react-i18next";

// Contract Assets
import Web3 from "web3";
import CONTRACT_ADDRESS from "../../utils/config";
import CONTRACT_ABI_GVV from "../../utils/gvv.json";
import CONTRACT_ABI_PRESALE from "../../utils/presaleVesting.json";

const Presale1 = (props) => {
  const { t } = useTranslation();
  const [presaleCost, setPresaleCost] = useState(0.34);
  const [presaleCount, setPresaleCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buyModalFlag, setBuyModalFlag] = useState(false);

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    setPresaleCost(Number(Number(0.34 * Number(presaleCount)).toFixed(2)));
  }, [presaleCount]);

  const handleChangePresaleCount = (flag) => {
    setPresaleCount(
      flag ? presaleCount + 1 : presaleCount === 1 ? 1 : presaleCount - 1
    );
  };

  const handleBuyGVV = async () => {
    setLoading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      try {
        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instance
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[5]
        );

        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          );
          const data = await response.json();

          console.log(data);

          const ethAmount = Number(presaleCost) / Number(data.ethereum.usd);

          console.log(presaleCount, presaleCost, ethAmount);

          // Correct way to call the contract method
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByNativeCoin(String(presaleCount), String(2))
            .send({
              from: accounts[0],
              value: web3Instance.utils.toWei(String(ethAmount), "ether"),
            });

          console.log("Transaction successful:", buytokenprogress);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error calling contract method:", error);
        setLoading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setLoading(false);
    }
  };

  const handleBuyModal = () => {
    document.body.style.overflow = !buyModalFlag ? "hidden" : "auto";
    setBuyModalFlag(!buyModalFlag);
  };

  return (
    <div className="presale">
      <div className="container">
        <div className="section">
          <div className="presale-section">
            <div className="logo">
              <img src={PresaleImage} />
            </div>
            <div className="main">
              <h1 className="title">{t("Private Sales Round")} 1</h1>
              <p className="desc">{t("presale-description")}</p>
              <button type="button" className="presale-btn">
                $GVV 1 -
                <span className="yellow">
                  ${presaleCost} ( {t("presale-discount-1")} )
                </span>
              </button>
              <div className="count-section">
                <button
                  type="button"
                  className="count-btn"
                  onClick={() => handleChangePresaleCount(false)}
                >
                  -
                </button>
                <div className="count-res">
                  <input
                    type="number"
                    className="count-input"
                    value={presaleCount}
                    onChange={(e) =>
                      setPresaleCount(
                        Number(e.target.value) > 0 ? Number(e.target.value) : 1
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  className="count-btn"
                  onClick={() => handleChangePresaleCount(true)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="presale-buy-btn"
                onClick={handleBuyModal}
              >
                {!loading && t("buy-sgvv")}
                <BeatLoader
                  color={"#000000"}
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            </div>
          </div>
          <div className="presale-overview">
            <div className="item">
              <img className="overview-image" src={PresaleOverviewImage} />
              <h2 className="title">{t("total supply")}</h2>
              <p className="content">$GVV 80,000,000</p>
            </div>
            <div className="item">
              <img className="overview-image" src={PresaleOverviewImage} />
              <h2 className="title">{t("listing date")}</h2>
              <p className="content">02 Feb 24</p>
            </div>
            <div className="item">
              <img className="overview-image" src={PresaleOverviewImage} />
              <h2 className="title">{t("total buys")}</h2>
              <p className="content">40,000</p>
            </div>
            <div className="item">
              <img className="overview-image" src={PresaleOverviewImage} />
              <h2 className="title">{t("unique buyers")}</h2>
              <p className="content">10,000</p>
            </div>
          </div>
          <div className="presale-video-view">
            <div className="guide-title">
              <ErrorIcon sx={{ color: "red" }} />
              <p className="title">{t("presale video guide")}</p>
            </div>
            <div className="video-section">
              <img className="presale-video" src={PresaleVideo} />
              <button type="button" className="presale-video-btn">
                <PlayArrowIcon sx={{ fontSize: 60 }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={buyModalFlag ? "buy-modal up" : "buy-modal"}>
        <div className="buy-section">
          <button type="button" className="buy-item">
            <img src={EthereumImage} className="coin-image" alt="coin" />
            Ethereum
          </button>
          <button type="button" className="buy-item">
            <img src={UsdtImage} className="coin-image" alt="coin" />
            ERC20 USDT
          </button>
          <button type="button" className="buy-item">
            <img src={MaticImage} className="coin-image" alt="coin" />
            Matic
          </button>
          <button type="button" className="buy-item">
            <img src={UsdtImage} className="coin-image" alt="coin" />
            Polygon USDT
          </button>
          <button type="button" className="buy-item">
            <img src={BnbImage} className="coin-image" alt="coin" />
            BNB
          </button>
          <button type="button" className="buy-item">
            <img src={UsdtImage} className="coin-image" alt="coin" />
            BEP20 USDT
          </button>
          <button
            type="button"
            className="close-buy-modal"
            onClick={handleBuyModal}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

Presale1.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { handleLoading })(Presale1);
