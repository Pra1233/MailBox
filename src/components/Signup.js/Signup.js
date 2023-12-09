import React, { useRef, useState } from "react";
import classes from "./Signup.module.css";
import axios from "axios";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [login, setLogin] = useState(true);

  const postSignup = async (obj) => {
    console.log(obj, "obj");
    try {
      const res = await axios.post("http://localhost:4000/user/adduser", obj);

      console.log(res, "res");
      //    console.log(res.data.message);
      if (res.status === 201) {
        alert(res.data.message);
      } else {
        throw new Error(res.data.e);
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
    <div>
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
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          ref={confirmPassword}
          className={classes.inputLogin}
          required
        />

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
