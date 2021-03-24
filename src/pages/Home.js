import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/home.css";
import hook from "../img/hook.svg"

const Home = () => {
  return (
    <div
      classsName="home-container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <motion.div
        style={{ textAlign: "center" }}
        initial={{
          y: 500,
          color: "#000"
        }}
        animate={{
          y: -20,
          color: ["#552B72", "#8A2E60", "#CECE66", "#FFFFFF"]
        }}
        transition={{
          duration: 1.5,
          delay: 0.1
        }}
      >
        {" "}
        <div style={{ marginTop: "2rem" }}>
         <img width="250px" src={hook}/>
        </div>
        <h1 style={{ color: "rgba(59, 89, 147, 1)" }}>Bienvenue chez Direct-Pêcheur!</h1>
        <Link
          className="button-style-link"
          to="/signup"
          style={{
            textDecoration: "none",
            margin: 12,
            padding: 12,
            borderRadius: 12,
            background: "rgba(59, 89, 147, 1)",
            color: "white",
            fontSize: "2rem"
          }}
        >
          S'inscrire
        </Link>
        <Link
          className="button-style-link"
          to="/login"
          style={{
            textDecoration: "none",
            margin: 12,
            padding: 12,
            borderRadius: 12,
            background: "white",
            border:"2px solid rgba(59, 89, 147, 1)",
            color: "rgba(59, 89, 147, 1)",
            fontSize: "2rem"
          }}
        >
          Entrer
        </Link>
      </motion.div>
    </div>
  );
};
export default Home;
