import React from "react";
import "./Swiper.css";
let isDown = false;
let startX;
let scrollLeft;
let slideTimer;

function Swiper(props) {
  return (
    <React.Fragment>
      <div className="container">
        <i
          className="fas fa-chevron-left"
          onClick={() => {
            slideLeft(props.slider);
          }}
          onMouseDown={() => {
            slideLeftContinue(props.slider);
          }}
          onMouseUp={() => {
            window.clearInterval(slideTimer);
          }}
        />
        <i
          className="fas fa-chevron-right"
          onClick={() => {
            slideRight(props.slider);
          }}
          onMouseDown={() => {
            slideRightContinue(props.slider);
          }}
          onMouseUp={() => {
            window.clearInterval(slideTimer);
          }}
        />
        <h2
          style={{ marginBottom: "20px", color: "#18181e", fontSize: "1.8rem" }}
        >
          {props.category}
        </h2>
        <div
          className="items"
          ref={props.slider}
          onMouseDown={e => {
            mouseDown(e, props.slider);
          }}
          onMouseLeave={() => {
            mouseLeave(props.slider);
          }}
          onMouseUp={() => {
            mouseUp(props.slider);
          }}
          onMouseMove={e => {
            mouseMove(e, props.slider);
          }}
        >
          <React.Fragment>
            {props.movies.map(
              movie =>
                movie.title &&
                movie.poster_path && (
                  <div className="item" key={movie.id}>
                    <div
                      className="itemImgContainer"
                      onClick={e => {
                        e.preventDefault();
                        props.handleClick(movie.id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        className="itemImg"
                        src={`http://image.tmdb.org/t/p/w185//${
                          movie.poster_path
                        }`}
                        alt={movie.title}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        marginTop: "8px",
                        width: "154px"
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          color: "#18181e"
                        }}
                      >
                        {movie.title.length < 17
                          ? movie.title
                          : movie.title.substring(0, 17) + "..."}
                      </h3>
                      <p
                        style={{
                          marginTop: "3px",
                          fontSize: ".9rem"
                        }}
                      >
                        {movie.vote_average
                          ? `${movie.vote_average}/10`
                          : "No Rating"}
                      </p>
                    </div>
                  </div>
                )
            )}
            {/* Display Actors. Refactor this code -- dry*/}
            {props.movies.map(
              actor =>
                actor.name &&
                actor.profile_path && (
                  <div className="item" key={actor.id}>
                    <div
                      className="itemImgContainer"
                      onClick={e => {
                        e.preventDefault();
                        props.handleClick(actor.id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        className="itemImg"
                        src={`http://image.tmdb.org/t/p/w185//${
                          actor.profile_path
                        }`}
                        alt={actor.name}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        marginTop: "8px",
                        width: "154px"
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          color: "#18181e"
                        }}
                      >
                        {actor.name.length < 17
                          ? actor.name
                          : actor.name.substring(0, 17) + "..."}
                      </h3>
                    </div>
                  </div>
                )
            )}
          </React.Fragment>
        </div>
      </div>
      {/* <hr className="hr_style" /> */}
    </React.Fragment>
  );
}

const mouseDown = (e, slider) => {
  isDown = true;
  slider.current.classList.add("active");
  startX = e.pageX - slider.current.offsetLeft;
  scrollLeft = slider.current.scrollLeft;
};

const mouseLeave = slider => {
  isDown = false;
  slider.current.classList.remove("active");
};

const mouseUp = slider => {
  isDown = false;
  slider.current.classList.remove("active");
};

const mouseMove = (e, slider) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.current.offsetLeft;
  const walk = x - startX;
  slider.current.scrollLeft = scrollLeft - walk;
};

// Arrow Sliders
const slideLeft = slider => {
  let scrollAmount = 0;
  var slideTimer = setInterval(function() {
    slider.current.scrollLeft -= 10;
    scrollAmount += 10;
    if (scrollAmount >= 160) {
      window.clearInterval(slideTimer);
    }
  }, 15);
};

const slideRight = slider => {
  let scrollAmount = 0;
  var slideTimer = setInterval(function() {
    slider.current.scrollLeft += 10;
    scrollAmount += 10;
    if (scrollAmount >= 160) {
      window.clearInterval(slideTimer);
    }
  }, 15);
};

const slideLeftContinue = slider => {
  slideTimer = setInterval(() => {
    slider.current.scrollLeft -= 9;
  }, 15);
};

const slideRightContinue = slider => {
  slideTimer = setInterval(() => {
    slider.current.scrollLeft += 9;
  }, 15);
};

export default Swiper;
