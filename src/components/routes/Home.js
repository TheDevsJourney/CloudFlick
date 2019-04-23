import React from "react";
import Trending from "../categories/Trending";
import NowPlaying from "../categories/NowPlaying";
import TopRated from "../categories/TopRated";
import Upcoming from "../categories/Upcoming";
import Header from "../Header";

function Home() {
  return (
    <React.Fragment>
      {/* <div
        className="home"
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center"
        }}
      >
        <Header />
      </div> */}
      <Header />
      <br />
      <br />
      <Upcoming />
      <hr className="hr_style" />
      <Trending />
      <hr className="hr_style" />
      <NowPlaying />
      <hr className="hr_style" />
      <TopRated />
      <br />
      <br />
    </React.Fragment>
  );
}

export default Home;
