import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup, createUser } from "../validation/auth";
import { auth } from "../firebase";
import "../css/loginAndSignup.css";
import { motion } from "framer-motion";
import hook from "../img/bluehook.svg";

const Signup = () => {
  const [state, setState] = useState({
    error: null,
    phone: "",
    email: "",
    address:"",
    password: "",
    username: "",
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
      createUser(
        state.phone,
        state.email,
        state.address,
        state.password,
        state.username,
        auth.currentUser.uid
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
            placeholder="Nom Prénom"
            name="username"
            type="name"
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
        <div>
          <input
            placeholder="Téléphone"
            name="phone"
            onChange={handleChange}
            value={state.phone}
            type="tel"
          ></input>
        </div>
        <div>
          <input
            placeholder="1 rue du Gourmet, Saint-François"
            name="address"
            onChange={handleChange}
            value={state.adress}
            type="text"
          ></input>
        </div>


        {state.error ? <p>{state.error}</p> : null}
        <motion.button
          style={{
            background: "navy",
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
          <img alt="sign-up" style={{ height: "3rem" }} src={hook} />
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
