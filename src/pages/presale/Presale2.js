import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ethers, BigNumber } from "ethers";
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
import CONTRACT_ABI_PRESALE from "../../utils/presaleVesting.json";
import CONTRACT_ABI_ETH_USDT from "../../utils/eth_usdt.json";
import CONTRACT_ABI_BSC_USDT from "../../utils/bsc_usdt.json";
import CONTRACT_ABI_POLY_USDT from "../../utils/poly_usdt.json";

const Presale2 = (props) => {
  const { t } = useTranslation();
  const [presaleCost, setPresaleCost] = useState(0.23);
  const [presaleCount, setPresaleCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buyModalFlag, setBuyModalFlag] = useState(false);

  const [ETH_loading, setETH_Loading] = useState(false);
  const [BNB_loading, setBNB_Loading] = useState(false);
  const [MATIC_loading, setMATIC_Loading] = useState(false);

  const [ERC20_loading, setERC20_Loading] = useState(false);
  const [BEP20_loading, setBEP20_Loading] = useState(false);
  const [MATIC_USDT_loading, setMATIC_USDT_Loading] = useState(false);

  useEffect(() => {
    props.handleLoading(true);
    setTimeout(() => {
      props.handleLoading(false);
    }, 200);
  }, []);

  useEffect(() => {
    setPresaleCost(Number(Number(0.23 * Number(presaleCount)).toFixed(2)));
  }, [presaleCount]);

  const handleChangePresaleCount = (flag) => {
    setPresaleCount(
      flag ? presaleCount + 1 : presaleCount === 1 ? 1 : presaleCount - 1
    );
  };

  const switchNetwork = async (chainId) => {
    console.log(chainId);
    const ethereum = window.ethereum;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyGVV_Ethereum = async () => {
    setETH_Loading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== "0x1") {
        await switchNetwork("0x1");
      }

      try {
        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instance
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[1]
        );

        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
          );
          const data = await response.json();

          const ethAmount = Number(presaleCost) / Number(data.ethereum.usd);

          // Correct way to call the contract method
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByNativeCoin(String(presaleCount), String(2))
            .send({
              from: accounts[0],
              value: web3Instance.utils.toWei(String(ethAmount), "ether"),
            });

          console.log("Transaction successful:", buytokenprogress);
          setETH_Loading(false);
        } catch (error) {
          console.log(error);
          setETH_Loading(false);
        }
      } catch (error) {
        console.error("Error calling contract method:", error);
        setETH_Loading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setETH_Loading(false);
    }
  };

  const handleBuyGVV_BNB = async () => {
    setBNB_Loading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        if (chainId !== "0x38") {
          await switchNetwork("0x38");
        }

        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instance
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[1]
        );

        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
          );
          const data = await response.json();

          const ethAmount = Number(presaleCost) / Number(data.binancecoin.usd);

          // Correct way to call the contract method
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByNativeCoin(String(presaleCount), String(2))
            .send({
              from: accounts[0],
              value: web3Instance.utils.toWei(String(ethAmount), "ether"),
            });

          console.log("Transaction successful:", buytokenprogress);
          setBNB_Loading(false);
        } catch (error) {
          console.log(error);
          setBNB_Loading(false);
        }
      } catch (error) {
        console.log(error);
        setBNB_Loading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setBNB_Loading(false);
    }
  };

  const handleBuyGVV_MATIC = async () => {
    setMATIC_Loading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        console.log(chainId);
        if (chainId !== "0x89") {
          await switchNetwork("0x89");
        }

        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instance
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[1]
        );

        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
          );
          const data = await response.json();

          const ethAmount =
            Number(presaleCost) / Number(data["matic-network"].usd);

          // Correct way to call the contract method
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByNativeCoin(String(presaleCount), String(2))
            .send({
              from: accounts[0],
              value: web3Instance.utils.toWei(String(ethAmount), "ether"),
            });

          console.log("Transaction successful:", buytokenprogress);
          setMATIC_Loading(false);
        } catch (error) {
          console.log(error);
          setMATIC_Loading(false);
        }
      } catch (error) {
        console.log(error);
        setMATIC_Loading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setMATIC_Loading(false);
    }
  };

  const handleBuyGVV_ERC20_USDT = async () => {
    setERC20_Loading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x1") {
          await switchNetwork("0x1");
        }

        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instances
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[1]
        );

        const USDTContract = new web3Instance.eth.Contract(
          CONTRACT_ABI_ETH_USDT,
          CONTRACT_ADDRESS.USDTAddr[1]
        );

        const amountToApprove = ethers.utils.parseUnits(String(presaleCost), 6);

        // Check current allowance
        const currentAllowance = await USDTContract.methods
          .allowance(accounts[0], CONTRACT_ADDRESS.PresaleVestingAddr[1])
          .call();

        const currentAllowanceBN = BigNumber.from(currentAllowance);
        const amountToApproveBN = BigNumber.from(amountToApprove);

        if (currentAllowanceBN.lt(amountToApproveBN)) {
          // Approve if current allowance is less than required
          try {
            const approveTransaction = await USDTContract.methods
              .approve(
                CONTRACT_ADDRESS.PresaleVestingAddr[1],
                String(amountToApprove)
              )
              .send({ from: accounts[0] });

            console.log("Approval successful:", approveTransaction);
          } catch (error) {
            console.error("Approval failed:", error);
            setERC20_Loading(false);
            return;
          }
        }

        // Now proceed with buying tokens
        try {
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByUSDT(String(presaleCount), String(2))
            .send({
              from: accounts[0],
            });

          console.log("Transaction successful:", buytokenprogress);
        } catch (error) {
          console.error("Buy tokens failed:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setERC20_Loading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setERC20_Loading(false);
    }
  };

  const handleBuyGVV_BEP20_USDT = async () => {
    setBEP20_Loading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x38") {
          await switchNetwork("0x38");
        }

        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instances
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[1]
        );

        const USDTContract = new web3Instance.eth.Contract(
          CONTRACT_ABI_BSC_USDT,
          CONTRACT_ADDRESS.USDTAddr[2]
        );

        const amountToApprove = ethers.utils.parseUnits(String(presaleCost), 6);

        // Check current allowance
        const currentAllowance = await USDTContract.methods
          .allowance(accounts[0], CONTRACT_ADDRESS.PresaleVestingAddr[1])
          .call();

        const currentAllowanceBN = BigNumber.from(currentAllowance);
        const amountToApproveBN = BigNumber.from(amountToApprove);

        if (currentAllowanceBN.lt(amountToApproveBN)) {
          // Approve if current allowance is less than required
          try {
            const approveTransaction = await USDTContract.methods
              .approve(
                CONTRACT_ADDRESS.PresaleVestingAddr[1],
                String(amountToApprove)
              )
              .send({ from: accounts[0] });

            console.log("Approval successful:", approveTransaction);
          } catch (error) {
            console.error("Approval failed:", error);
            setBEP20_Loading(false);
            return;
          }
        }

        // Now proceed with buying tokens
        try {
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByUSDT(String(presaleCount), String(2))
            .send({
              from: accounts[0],
            });

          console.log("Transaction successful:", buytokenprogress);
        } catch (error) {
          console.error("Buy tokens failed:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setBEP20_Loading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setBEP20_Loading(false);
    }
  };

  const handleBuyGVV_MATIC_USDT = async () => {
    setMATIC_USDT_Loading(true);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x89") {
          await switchNetwork("0x89");
        }

        // Create Web3 instance
        const web3Instance = new Web3(window.ethereum);

        // Create contract instances
        const presale_contractInstance = new web3Instance.eth.Contract(
          CONTRACT_ABI_PRESALE,
          CONTRACT_ADDRESS.PresaleVestingAddr[1]
        );

        const USDTContract = new web3Instance.eth.Contract(
          CONTRACT_ABI_POLY_USDT,
          CONTRACT_ADDRESS.USDTAddr[3]
        );

        const amountToApprove = ethers.utils.parseUnits(String(presaleCost), 6);

        // Check current allowance
        const currentAllowance = await USDTContract.methods
          .allowance(accounts[0], CONTRACT_ADDRESS.PresaleVestingAddr[1])
          .call();

        const currentAllowanceBN = BigNumber.from(currentAllowance);
        const amountToApproveBN = BigNumber.from(amountToApprove);

        if (currentAllowanceBN.lt(amountToApproveBN)) {
          // Approve if current allowance is less than required
          try {
            const approveTransaction = await USDTContract.methods
              .approve(
                CONTRACT_ADDRESS.PresaleVestingAddr[1],
                String(amountToApprove)
              )
              .send({ from: accounts[0] });

            console.log("Approval successful:", approveTransaction);
          } catch (error) {
            console.error("Approval failed:", error);
            setMATIC_USDT_Loading(false);
            return;
          }
        }

        // Now proceed with buying tokens
        try {
          const buytokenprogress = await presale_contractInstance.methods
            .buyTokensByUSDT(String(presaleCount), String(2))
            .send({
              from: accounts[0],
            });

          console.log("Transaction successful:", buytokenprogress);
        } catch (error) {
          console.error("Buy tokens failed:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setMATIC_USDT_Loading(false);
      }
    } else {
      console.log("Please connect to MetaMask first");
      setMATIC_USDT_Loading(false);
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
              <img src={PresaleImage} alt="overview-image" />
            </div>
            <div className="main">
              <h1 className="title">{t("Private Sales Round")} 2</h1>
              <p className="desc">{t("presale-description")}</p>
              <button type="button" className="presale-btn">
                $GVV 1 -
                <span className="yellow">
                  ${presaleCost} ( {t("presale-discount-2")} )
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
              <img
                className="overview-image"
                src={PresaleOverviewImage}
                alt="overview-image"
              />
              <h2 className="title">{t("total supply")}</h2>
              <p className="content">$GVV 80,000,000</p>
            </div>
            <div className="item">
              <img
                className="overview-image"
                src={PresaleOverviewImage}
                alt="overview-image"
              />
              <h2 className="title">{t("listing date")}</h2>
              <p className="content">02 Feb 24</p>
            </div>
            <div className="item">
              <img
                className="overview-image"
                src={PresaleOverviewImage}
                alt="overview-image"
              />
              <h2 className="title">{t("total buys")}</h2>
              <p className="content">40,000</p>
            </div>
            <div className="item">
              <img
                className="overview-image"
                src={PresaleOverviewImage}
                alt="overview-image"
              />
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
              <img
                className="presale-video"
                src={PresaleVideo}
                alt="presale-video"
              />
              <button type="button" className="presale-video-btn">
                <PlayArrowIcon sx={{ fontSize: 60 }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={buyModalFlag ? "buy-modal up" : "buy-modal"}>
        <div className="buy-section">
          <button
            type="button"
            className="buy-item"
            onClick={() => handleBuyGVV_Ethereum()}
          >
            {!ETH_loading && (
              <img src={EthereumImage} className="coin-image" alt="coin" />
            )}
            Ethereum
            <BeatLoader
              color={"#fff"}
              loading={ETH_loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          <button
            type="button"
            className="buy-item"
            onClick={() => handleBuyGVV_BNB()}
          >
            {!BNB_loading && (
              <img src={BnbImage} className="coin-image" alt="coin" />
            )}
            BNB
            <BeatLoader
              color={"#fff"}
              loading={BNB_loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          <button
            type="button"
            className="buy-item"
            onClick={() => handleBuyGVV_MATIC()}
          >
            {!MATIC_loading && (
              <img src={MaticImage} className="coin-image" alt="coin" />
            )}
            Matic
            <BeatLoader
              color={"#fff"}
              loading={MATIC_loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          <button
            type="button"
            className="buy-item"
            onClick={() => handleBuyGVV_ERC20_USDT()}
          >
            {!ERC20_loading && (
              <img src={UsdtImage} className="coin-image" alt="coin" />
            )}
            ERC20 USDT
            <BeatLoader
              color={"#fff"}
              loading={ERC20_loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          <button
            type="button"
            className="buy-item"
            onClick={() => handleBuyGVV_BEP20_USDT()}
          >
            {!BEP20_loading && (
              <img src={UsdtImage} className="coin-image" alt="coin" />
            )}
            BEP20 USDT
            <BeatLoader
              color={"#fff"}
              loading={BEP20_loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          <button
            type="button"
            className="buy-item"
            onClick={() => handleBuyGVV_MATIC_USDT()}
          >
            {!MATIC_USDT_loading && (
              <img src={UsdtImage} className="coin-image" alt="coin" />
            )}
            Polygon USDT
            <BeatLoader
              color={"#fff"}
              loading={MATIC_USDT_loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
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

Presale2.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { handleLoading })(Presale2);
