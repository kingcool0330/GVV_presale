import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

// icons from MUI
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import Web3 from "web3";

// import logo image
import LogoImage from "../../assets/image/logo.png";

// import style
import "./SignHeader.scss";

const SignHeader = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // set ref for menu
  const presaledropdownRef = useRef(null);
  const stakedropdownRef = useRef(null);
  const venturedropdownRef = useRef(null);

  // menu flag
  const [presaleMenuFlag, setPresaleMenuFalg] = useState(false);
  const [stakeMenuFlag, setStakeMenuFlag] = useState(false);
  const [ventureMenuFlag, setVentureMenuFlag] = useState(false);
  const [responsivePresaleMenuFlag, setResponsivePresaleMenuFalg] =
    useState(false);
  const [responsiveStakeMenuFlag, setResponsiveStakeMenuFlag] = useState(false);
  const [responsiveVentureMenuFlag, setResponsiveVentureMenuFlag] =
    useState(false);
  const [responsiveMenuFlag, setResponsiveMenuFlag] = useState(false);

  // Connect button
  const [account, setAccount] = useState("CONNECT");

  // responsive menu toggle functions
  const handleResponsivePresaleMenuToggle = () => {
    setResponsivePresaleMenuFalg(!responsivePresaleMenuFlag);
  };

  const handleResponsiveStakeMenuToggle = () => {
    setResponsiveStakeMenuFlag(!responsiveStakeMenuFlag);
  };

  const handleResponsiveVentureMenuToggle = () => {
    setResponsiveVentureMenuFlag(!responsiveVentureMenuFlag);
  };

  // menu toggle functions
  const handlePresaleMenuToggle = () => {
    setPresaleMenuFalg(!presaleMenuFlag);
  };

  const handleStakeMenuToggle = () => {
    setStakeMenuFlag(!stakeMenuFlag);
  };

  const handleVentureMenuToggle = () => {
    setVentureMenuFlag(!ventureMenuFlag);
  };

  const handleClickOutside = (event) => {
    if (
      presaledropdownRef.current &&
      !presaledropdownRef.current.contains(event.target)
    ) {
      setPresaleMenuFalg(false);
    }

    if (
      stakedropdownRef.current &&
      !stakedropdownRef.current.contains(event.target)
    ) {
      setStakeMenuFlag(false);
    }

    if (
      venturedropdownRef.current &&
      !venturedropdownRef.current.contains(event.target)
    ) {
      setVentureMenuFlag(false);
    }
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask not detected. Please install MetaMask.");
    }
  };

  const handleDisConnectWallet = () => {
    setAccount(null);
    console.log("Disconnected from wallet");
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // set initial menu drop as show/close
  useEffect(() => {
    location.pathname.includes("/presale")
      ? setResponsivePresaleMenuFalg(true)
      : setResponsivePresaleMenuFalg(false);
    location.pathname.includes("/staking")
      ? setResponsiveStakeMenuFlag(true)
      : setResponsiveStakeMenuFlag(false);
    location.pathname.includes("/venture")
      ? setResponsiveVentureMenuFlag(true)
      : setResponsiveVentureMenuFlag(false);
  }, []);
  // end

  const handleToggleMenuBar = () => {
    setResponsiveMenuFlag(!responsiveMenuFlag);
  };

  return (
    <div className="sign-header">
      <div className="container">
        <div className="section">
          <div className="logo">
            <img src={LogoImage} className="image" />
            <h2 className="title">GVV</h2>
            <button
              type="button"
              className="responsive-menu-btn"
              onClick={handleToggleMenuBar} // toggle responsive menu action
            >
              <MenuIcon />
            </button>
          </div>
          <div className="menu-bar">
            <div className="item">
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                {t("Home")}
              </Link>
            </div>
            <div className="item" ref={presaledropdownRef}>
              <button
                type="button"
                className={
                  location.pathname.includes("/presale") ? "active" : ""
                }
                onClick={handlePresaleMenuToggle}
              >
                {t("Sales Round")}{" "}
                <KeyboardArrowDownIcon
                  className={presaleMenuFlag ? "arrow-btn" : ""}
                />
              </button>

              {presaleMenuFlag && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link
                      to="/presale"
                      className={
                        location.pathname === "/presale" ? "active" : ""
                      }
                    >
                      {t("Presale")}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link
                      to="/presale1"
                      className={
                        location.pathname === "/presale1" ? "active" : ""
                      }
                    >
                      {t("Presale")} 1
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link
                      to="/presale2"
                      className={
                        location.pathname === "/presale2" ? "active" : ""
                      }
                    >
                      {t("Presale")} 2
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="item" ref={stakedropdownRef}>
              <button
                type="button"
                className={
                  location.pathname.includes("/staking") ? "active" : ""
                }
                onClick={handleStakeMenuToggle}
              >
                {t("Staking")}{" "}
                <KeyboardArrowDownIcon
                  className={stakeMenuFlag ? "arrow-btn" : ""}
                />
              </button>
              {stakeMenuFlag && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link
                      to="/staking/withdraw"
                      className={
                        location.pathname === "/staking/withdraw"
                          ? "active"
                          : ""
                      }
                    >
                      {t("Withdraw")}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link
                      to="/staking/stake"
                      className={
                        location.pathname === "/staking/stake" ? "active" : ""
                      }
                    >
                      {t("Stake")}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="item" ref={venturedropdownRef}>
              <button
                type="button"
                className={
                  location.pathname.includes("/venture") ? "active" : ""
                }
                onClick={handleVentureMenuToggle}
              >
                {t("Our Ventures")}{" "}
                <KeyboardArrowDownIcon
                  className={ventureMenuFlag ? "arrow-btn" : ""}
                />
              </button>
              {ventureMenuFlag && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link
                      to="/venture/description"
                      className={
                        location.pathname === "/venture/description"
                          ? "active"
                          : ""
                      }
                    >
                      {t("Description")}
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link
                      to="/venture/list"
                      className={
                        location.pathname === "/venture/list" ? "active" : ""
                      }
                    >
                      {t("List")}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="sign">
            {account ? (
              <button
                type="button"
                onClick={() => handleDisConnectWallet()}
                className="sign-btn"
              >
                <p>
                  {account.substring(0, 6)}...{account.substring(37, 42)}
                </p>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleConnectWallet()}
                className="sign-btn"
              >
                {t("connect")}
              </button>
            )}
          </div>
        </div>
        <div
          className={
            responsiveMenuFlag ? "responsive-menu active" : "responsive-menu"
          }
        >
          <div className="responsive-section">
            <div className="logo-section">
              <img src={LogoImage} className="logo-image" />
              <h2 className="logo-title">GVV</h2>
            </div>
            <div className="responsive-menu-list">
              <div className="menu-item">
                <Link
                  to="/"
                  className={
                    location.pathname === "/" ? "a-link active" : "a-link"
                  }
                  onClick={handleToggleMenuBar}
                >
                  {t("Home")}
                </Link>
              </div>
              <div className="menu-item">
                <button
                  type="button"
                  className={
                    location.pathname.includes("/presale")
                      ? "button-link active"
                      : "button-link"
                  }
                  onClick={handleResponsivePresaleMenuToggle}
                >
                  {t("Sales Round")}{" "}
                  <KeyboardArrowDownIcon
                    className={responsivePresaleMenuFlag ? "arrow-btn" : ""}
                  />
                </button>
                {responsivePresaleMenuFlag ? (
                  <div className="drop-menu">
                    <Link
                      to="/presale"
                      className={
                        location.pathname === "/presale"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("Presale")}
                    </Link>
                    <Link
                      to="/presale1"
                      className={
                        location.pathname === "/presale1"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("Presale")} 1
                    </Link>
                    <Link
                      to="/presale2"
                      className={
                        location.pathname === "/presale2"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("Presale")} 2
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="menu-item">
                <button
                  type="button"
                  className={
                    location.pathname.includes("/staking")
                      ? "button-link active"
                      : "button-link"
                  }
                  onClick={handleResponsiveStakeMenuToggle}
                >
                  {t("Staking")}{" "}
                  <KeyboardArrowDownIcon
                    className={responsiveStakeMenuFlag ? "arrow-btn" : ""}
                  />
                </button>

                {responsiveStakeMenuFlag ? (
                  <div className="drop-menu">
                    <Link
                      to="/staking/withdraw"
                      className={
                        location.pathname === "/staking/withdraw"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("Withdraw")}
                    </Link>
                    <Link
                      to="/staking/stake"
                      className={
                        location.pathname === "/staking/stake"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("Stake")}
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="menu-item">
                <button
                  type="button"
                  className={
                    location.pathname.includes("/venture")
                      ? "button-link active"
                      : "button-link"
                  }
                  onClick={handleResponsiveVentureMenuToggle}
                >
                  {t("Our ventures")}
                  <KeyboardArrowDownIcon
                    className={responsiveVentureMenuFlag ? "arrow-btn" : ""}
                  />
                </button>
                {responsiveVentureMenuFlag ? (
                  <div className="drop-menu">
                    <Link
                      to="/venture/description"
                      className={
                        location.pathname === "/venture/description"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("Description")}
                    </Link>
                    <Link
                      to="/venture/list"
                      className={
                        location.pathname === "/venture/list"
                          ? "a-link active"
                          : "a-link"
                      }
                      onClick={handleToggleMenuBar}
                    >
                      {t("List")}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={handleToggleMenuBar}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignHeader;
