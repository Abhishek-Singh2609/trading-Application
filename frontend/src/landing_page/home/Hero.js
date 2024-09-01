import React from 'react';
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';

function Hero() {
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
    <div className='container mb-5'>
      <div className='row text-center'>
        <img src='media/images/homeHero.png' alt='Hero Image' className='mb-5' />
        <h1 className='mt-5'>Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <Link to="/signup" className="p-2 btn btn-primary fs-5 mb-5" style={{ width: "18%", margin: "0 auto", textDecoration: 'none' }}>
          Signup Now
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Hero;
