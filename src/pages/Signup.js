import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup, createUser } from "../validation/auth";
import { config, auth } from "../firebase";
import "../css/loginAndSignup.css";
import { motion } from "framer-motion";
import paw from "../img/paw.svg";

const Signup = () => {
  const [state, setState] = useState({
    error: null,
    contacts: [],
    email: "",
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/default-image.png?alt=media`,
    password: "",
    username: "",
    friendRequests: ['QuO4Fv9OZEfPXkgSoXQZoUJilEE3']
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setState({ ...state, error: "" });
    try {
      await signup(state.email, state.password);
      await createUser(
        auth.currentUser.uid,
        state.username,
        state.email,
        state.imageUrl,
        state.contacts,
        state.friendRequests
      );
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up to Chatty Cats</h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={state.email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Choose a Username"
            name="username"
            type="text"
            onChange={handleChange}
            value={state.username}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={state.password}
            type="password"
          ></input>
        </div>
        {state.error ? <p>{state.error}</p> : null}
        <motion.button
          style={{
            background: "rebeccapurple",
            color: "white",
            border: 0,
            borderRadius: 12,
            paddingTop: 8,
            margin: "0 auto",
            fontSize: 24,
            cursor: "pointer"
          }}
          whileHover={{
            scale: 1.2
          }}
          type="submit"
        >
          <img alt="sign-up" style={{ height: "3rem" }} src={paw} />
        </motion.button>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default Signup;
