import React, { useState } from "react";
import ImageUpload from "./imageUpload";
import arrow from "../img/arrow.svg";
import { motion } from "framer-motion";
import cat from "../img/chatProfileViolet.svg";

function Profile() {
  const [profileExposed, setProfileExposed] = useState(false);
  const arrowMotion = {
    on: {
      rotate: 0
    },
    off: {
      rotate: 180
    }
  };
  const openMotion = {
    start: { height: 0, overFlow: "hidden" },
    on: {
      height: "auto",
      overFlow: "visible"
    },
    off: {
      height: 0,
      overFlow: "hidden"
    }
  };
  return (
    <div
      style={{
        postition: "relative",
        width: 160,
        margin: "0.5rem 0",
        textAlign: "center"
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setProfileExposed(!profileExposed);
        }}
      >
        <img
          src={cat}
          alt="cat"
          style={{
            height: "1rem",
            margin: ".5rem",
            transform: "translateY(50%)"
          }}
        />
        Profile
        <motion.img
          variants={arrowMotion}
          animate={profileExposed ? `off` : `on`}
          alt="arrow"
          transition={{
            duration: 0.5,
            delay: 0.01,
            ease: "easeInOut"
          }}
          style={{ marginLeft: 5, width: ".9rem", height: ".6rem" }}
          src={arrow}
        />
      </div>

      <motion.div
        style={{ overflow: "hidden", display: "flex", width: "100vw" }}
        variants={openMotion}
        initial={`off`}
        animate={!profileExposed ? `off` : `on`}
        transition={{
          duration: 0.5,
          delay: 0.01,
          ease: "easeInOut"
        }}
      >
        <ImageUpload />
      </motion.div>
    </div>
  );
}

export default Profile;
