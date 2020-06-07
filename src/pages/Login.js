import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../validation/auth";
import { motion } from "framer-motion";
import paw from "../img/paw.svg";

const Login = () => {
  const [state, setState] = useState({
    error: null,
    email: null,
    password: null
  });
  function handleChange(event) {
    console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setState({ ...state, error: "" });
    try {
      await signin(state.email, state.password);
    } catch (error) {
      setState({ error: error.message });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <h1>Login to Chatty Cats</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <input
            style={{
              fontSize: 24,
              height: 32,
              width: "auto",
              padding: 12,
              margin: "1rem"
            }}
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={state.email}
          />
        </div>
        <div>
          <input
            style={{
              fontSize: 24,
              height: 32,
              width: "auto",
              padding: 12,
              margin: "1rem"
            }}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={state.password}
            type="password"
          />
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          {state.error ? <p>{state.error}</p> : null}
          <motion.button
            style={{
              background: "rebeccapurple",
              color: "white",
              border: 0,
              borderRadius: 12,
              paddingTop: 7,
              margin: 24,
              fontSize: 24,
              cursor: "pointer"
            }}
            whileHover={{
              scale: 1.2
            }}
            type="submit"
          >
            <img alt="login" style={{ height: "3rem" }} src={paw} />
          </motion.button>
        </div>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
