import React, { useRef, useState } from "react";
import classes from "./Signup.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.auth.islogin);
  // console.log(islogin, "islogin");

  const [login, setLogin] = useState(true);

  const postSignup = async (obj) => {
    console.log(obj, "obj");
    try {
      const response = await axios.post(
        "http://localhost:4000/user/adduser",
        obj
      );

      // console.log(res, "res");
      //    console.log(res.data.message);
      if (response.status === 201) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        localStorage.setItem("email", obj.email);
        history.push("/mailbox");
      } else {
        throw new Error(response.data.e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postLogin = async (obj) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/loginuser",
        obj
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", obj.email);
      dispatch(authActions.login());
      history.push("/mailbox");
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailInput = email.current.value;
    const passwordInput = password.current.value;
    const confirmPasswordInput = confirmPassword.current.value;

    if (passwordInput !== confirmPasswordInput) {
      alert("Password and Confirm Password Not match");
      return;
    }
    const obj = {
      email: emailInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
    };
    // console.log(obj);
    !login && postSignup(obj);
    login && postLogin(obj);
  };

  return (
    <div className={classes.main}>
      <form>
        <h3>{login ? "Login Here" : "Signup"}</h3>

        <label htmlFor="username">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          ref={email}
          className={classes.inputLogin}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          ref={password}
          className={classes.inputLogin}
          required
        />
        {!islogin && <label htmlFor="password">Confirm Password</label>}
        {!islogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            className={classes.inputLogin}
            required
          />
        )}
        <button onClick={submitHandler} className={classes.loginbutton}>
          Submit
        </button>
      </form>
      <div className={classes.forgot}>
        <button
          onClick={() => setLogin((prev) => !prev)}
          className={classes.switchMode}
        >
          {login ? "Create New Account" : "Login With Existing Account"}
        </button>

        <button
          // onClick={forgotPasswordHandler}
          className={classes.forgotPassword}
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default Signup;
