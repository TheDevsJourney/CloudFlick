import React from "react";
import tmdb from "../../images/tmdb.png";

function Footer() {
  return (
    <footer
      style={{
        height: "350px",
        width: "100%",
        backgroundColor: "#18181E",
        color: "#f5f5f5",
        position: "absolute",
        bottom: "0"
        // Fix this by making footer responsive ...
        // overflow: "hidden"
      }}
    >
      <div
        className="footerContainer"
        // style={{
        //   width: "80%",
        //   height: "100%",
        //   margin: "0 auto",
        //   padding: "70px 0",
        //   display: "flex",
        //   flexDirection: "column",
        //   position: "relative"
        // }}
      >
        <div
          className="footerInfo"
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h1 style={{ fontSize: "28px" }}>CloudFlick</h1>
          <div>
            <p
              className="footerContactMe"
              style={{
                marginBottom: "10px",
                fontSize: "24px",
                color: "rgba(255,255,255,0.8)"
              }}
            >
              Contact Me
            </p>
            <p style={{ marginTop: "2px", color: "rgba(250,250,250,0.5)" }}>
              Portfolio:{" "}
              <a
                href="https://TimUpchurchtech.com"
                style={{
                  textDecoration: "none",
                  color: "rgba(225,225,225,0.7)",
                  marginLeft: "10px"
                }}
              >
                TimUpchurchtech.com
              </a>
            </p>
            <p style={{ marginTop: "2px", color: "rgba(250,250,250,0.5)" }}>
              Github:{" "}
              <a
                href="https://github.com/TheDevsJourney"
                style={{
                  textDecoration: "none",
                  color: "rgba(225,225,225,0.7)",
                  marginLeft: "10px"
                }}
              >
                TheDevsJourney
              </a>
            </p>
          </div>
          <img
            className="footerTMDB"
            src={tmdb}
            style={{ height: "100px", width: "100px" }}
            alt="tmdb"
          />
        </div>

        <div
          className="footerCopyright"
          // style={{
          //   marginTop: "15px",
          //   display: "flex",
          //   flexDirection: "column",
          //   position: "absolute",
          //   bottom: "40px",
          //   width: "100%"
          // }}
        >
          <p style={{ color: "rgba(225,225,225,0.7)", marginBottom: "5px" }}>
            Copyright ©2019
          </p>
          <p style={{ color: "rgba(225,225,225,0.7)" }}>
            Code and Design By Timothy Upchurch
          </p>
        </div>
        <div />
      </div>
    </footer>
  );
}

export default Footer;
