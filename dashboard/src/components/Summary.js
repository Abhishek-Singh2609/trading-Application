import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Summary = () => {
  
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [toastShown, setToastShown] = useState(false);

  const verifyCookie = useCallback(async () => {
    // Check if the token exists; if not, return early (no redirect)
    if (!cookies.token) {
      return;
    }

    try {
      const { data } = await axios.post(
        "https://trading-application-mauve.vercel.app",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      if (status) {
        setUsername(user);
        // Check if the toast has already been shown
        if (!toastShown) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
          setToastShown(true);
        }
      } else {
        removeCookie("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying cookie:", error);
      removeCookie("token");
      navigate("/login");
    }
  }, [cookies, navigate, removeCookie, toastShown]);

  useEffect(() => {
    verifyCookie();
  }, [verifyCookie]);

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      <ToastContainer />
    </>
  );
};

export default Summary;