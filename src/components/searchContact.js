import React from "react";
import { useState, useEffect } from "react";
import { findContact } from "../helpersFunctions/get";
import addFriends from "../img/addFriends.svg";
import mystery from "../img/mystery.svg";
import SearchResult from "./searchResult";
import "../css/searchContact.css";
import arrow from "../img/arrow.svg";
import { motion, AnimatePresence } from "framer-motion"

function SearchContact() {
  const [search, setSearch] = useState("");
  const [searchInfo, setSearchInfo] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [displaySearch, setDisplaySearch] = useState(false);

  const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100
  }
  const arrowMotion = {
    on: {
      rotate: 0
    },
    off: {
      rotate: 180
    }
  };
  const openMotion = {

    on: {
      height: "auto",
      overFlow: "visible"
    },
    off: {
      height: 0,
      overFlow: "hidden"
    }
  };
  useEffect(() => {
    console.log(searchInfo);
  }, [searchInfo]);

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
        alignItems: "baseline",
        flexDirection: "column",
        paddingTop: "1rem",

      }}
    ><motion.div positionTransition={{
      duration: .5,
      ease: "easeInOut"
    }}
      style={{
        margin: "0.5rem auto",
        textAlign: "center"
      }}
    >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setDisplaySearch(!displaySearch);
          }}
        >
          <img
            src={addFriends}
            alt="add friends"
            style={{
              height: "1rem",
              margin: ".5rem",
              transform: "translateY(50%)"
            }}
          />
        Add Friend
        <motion.img
            variants={arrowMotion}
            alt="arrow"
            initial={`off`}
            animate={displaySearch ? `off` : `on`}
            transition={{
              duration: 1,
              delay: 0.01,
              ease: "easeInOut"
            }}
            style={{ marginLeft: 5, width: ".9rem", height: ".6rem" }}
            src={arrow}
          />
        </div>
        <AnimatePresence>
          {displaySearch &&

            <motion.div
              style={{ overflow: "hidden", display: "flex", width: "100vw" }}
              variants={openMotion}
              initial={`off`}
              animate={!displaySearch ? `off` : `on`}
              exit={`off`}
              transition={{
                duration: 0.5,
                delay: 0.01,
                ease: "easeInOut"
              }}
            >
              <div style={{
                margin: "0 auto",
                paddingBottom: "1rem"
                ,
                background: 'lavender'
              }}>
                <form
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "1rem",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onSubmit={e => {
                    e.preventDefault();
                    setSearchInfo(null);
                    findContact(setSearchInfo, search, setSearchResults);
                    setSearch("");
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
                    <input
                      placeholder="Try Totoro!"
                      style={{ width: "10rem", height: ".75rem", margin: ".5rem" }}
                      value={search}
                      onChange={e => {
                        setSearch(e.target.value);
                      }}
                    />
                    <button className="search" style={{ margin: ".5rem" }} type="submit">
                      Search
        </button></div>
                </form>
                <br />
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  {!searchResults && (
                    <motion.div positionTransition
                      style={{
                        padding: ".75rem",
                        borderRadius: "12px",
                        border: "1px solid rebeccapurple",
                        background: "rgba(102,51,153,.03)",
                        width: "150px",
                        height: "150px",
                        textAlign: "center",
                        position: "relative"
                      }}
                    >
                      <img
                        src={mystery}
                        alt="interogation point"
                        style={{
                          margin: "0 auto",
                          transform: "translateY(50%)"
                        }}
                      />

                      {searchInfo ? (
                        <span
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%)",
                            width: 150,
                            position: "absolute"
                          }}
                        >
                          {searchInfo}
                        </span>
                      ) : null}
                    </motion.div>
                  )}
                  {searchResults &&
                    searchResults.map(r => (
                      <SearchResult
                        key={r + "SR"}
                        setSearchResults={setSearchResults}
                        contactUID={r}
                      />
                    ))}
                </div></div>

            </motion.div>}</AnimatePresence>
      </motion.div>
    </div >
  );
}

export default SearchContact;
