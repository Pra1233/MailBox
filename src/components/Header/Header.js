import React, { useEffect } from "react";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { mailAction } from "../../store/mail";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.mail.count);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  const getSentMessages = async () => {
    //user sent mail to other
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:4000/message/getSentMessage",
        {
          headers: { Authorization: token },
        }
      );
      dispatch(mailAction.sent(res.data.data));
      // console.log("getSentMail", res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getInboxMail = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:4000/message/getInbox", {
        headers: { Authorization: token },
      });
      dispatch(mailAction.inbox(res.data.data));
      dispatch(mailAction.countUnreadMail(res.data.count));

      // console.log("getinboxMail", res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getInboxMail();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.header}>
      <NavLink
        to="/inbox"
        activeClassName={classes.linke}
        className={classes.link}
        // onClick={getInboxMail}
      >
        Inbox <span className={classes.span}>{count > 0 ? count : ""}</span>
      </NavLink>
      <NavLink
        to="/compose"
        activeClassName={classes.linke}
        className={classes.link}
      >
        Compose
      </NavLink>
      <NavLink
        to="/sent"
        onClick={getSentMessages}
        activeClassName={classes.linke}
        className={classes.link}
      >
        Sent Mail
      </NavLink>
      <NavLink
        to="/login"
        onClick={logoutHandler}
        activeClassName={classes.linke}
        className={classes.link}
      >
        Logout
      </NavLink>
    </div>
  );
};

export default Header;
