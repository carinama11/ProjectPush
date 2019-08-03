import React from "react";
import { Link } from "react-router-dom";

function Home() {
  let corNum = 1;

  function CloseMobileNavigation() {
    const close = document.querySelector(".mobile-cat-selector");
    close.style.display = "none";
    const DiAnimate = document.querySelector(".mobile-navigation-bar-active");
    DiAnimate.classList.remove("mobile-navigation-bar-active");
  }

  function OpenMobileNavigation() {
    const open = document.querySelector(".mobile-cat-selector");
    open.style.display = "block";
    const animate = document.querySelector(
      ".mobile-weapon-navigation-container"
    );
    animate.classList.add("mobile-navigation-bar-active");
  }

  function CourNavButton(Left) {
    const courselSlide = document.querySelector(".coursel-slider");
    courselSlide.style.transition = "transform .8s ease-in-out";
    if (Left === true) {
      if (corNum <= 0) return;
      corNum -= 1;
      courselSlide.style.transform = "translateX(" + corNum * -100 + "%)";
      CorNavigator(corNum, false);
      courselSlide.addEventListener("transitionend", () => {
        if (corNum === 0) corNum = 3;
        TransitionEnd(corNum);
      });
    } else if (Left === false) {
      if (corNum >= 4) return;
      corNum += 1;
      courselSlide.style.transform = "translateX(" + corNum * -100 + "%)";
      CorNavigator(corNum, false);
      courselSlide.addEventListener("transitionend", () => {
        if (corNum === 4) corNum = 1;
        TransitionEnd(corNum);
      });
    }
  }

  function TransitionEnd(number) {
    const courselSlide = document.querySelector(".coursel-slider");
    courselSlide.style.transition = "none";
    courselSlide.style.transform = "translateX(" + number * -100 + "%)";
    CorNavigator(number, false);
  }

  function CorNavigator(number, click) {
    if (number < 1 || number > 3) return;
    if (click) {
      let circle = document.querySelector(`.icon__${number}`);
      let activeCircle = document.querySelector(".circle-active");
      activeCircle.classList.remove("circle-active");
      circle.classList.add("circle-active");
      corNum = number + 1;
      CourNavButton(true);
    } else {
      let circle = document.querySelector(`.icon__${number}`);
      let activeCircle = document.querySelector(".circle-active");
      activeCircle.classList.remove("circle-active");
      circle.classList.add("circle-active");
    }
  }

  return (
    <div className="home">
      <div className="mobile-navigation">
        <div
          onClick={() => OpenMobileNavigation()}
          className="mobile-menu-button"
        >
          <div className="icon fas fa-caret-square-down" />
        </div>
        <div className="mobile-cat-selector">
          <div className="navigation-bar">
            <div
              onClick={() => CloseMobileNavigation()}
              className="close-button"
            >
              CLOSE
            </div>
          </div>
          <div className="mobile-weapon-navigation-container">
            <li>
              <Link className="link" to="/weapons">
                <div className="home-mobile-nav">
                  <h2>WEAPONS</h2>
                </div>
              </Link>
            </li>
            <li>
              <Link className="link" to="/shops">
                <div className="shop-mobile-nav">
                  <h2>SHOP</h2>
                </div>
              </Link>
            </li>
          </div>
        </div>
      </div>
      <div className="banner-container">
        <div className="banner-image">
          <div className="banner-btn-get-started">
            <h1>GET STARTED</h1>
          </div>
          <div className="banner-btn banner-btn-secret-shop">
            <h1>SECRET SHOP</h1>
          </div>
          <div className="banner-btn banner-btn-weapon-stats">
            <h1>GUNS STATS</h1>
          </div>
        </div>
      </div>
      <div className="body-main-content">
        <div className="main-content-text">
          <h1>FEATURE WE OFFER!</h1>
          <p>
            Using
            <span>
              {" "}
              <a
                href="https://fortniteapi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                FORTNITE-PUBLIC-API
              </a>{" "}
            </span>
            in this website you can check your favourite weapon stats how much
            damage it does on Head-Shot and Body-Shot. You can also see our
            Upcoming Cosmetic Page which provide of what is says, in that page
            you can see what are the new upcoming feature that are about to be
            updated into Fortnite's Live Server.
          </p>
        </div>
        <div className="main-content-coursel">
          <div className="button-left" onClick={() => CourNavButton(true)}>
            <div className="icon icon__left fas fa-chevron-left" />
          </div>
          <div className="button-right" onClick={() => CourNavButton(false)}>
            <div className="icon icon__right fas fa-chevron-right" />
          </div>
          <div className="coursel-container">
            <div className="coursel-slider">
              <div className="coursel-image coursel-image__3" />
              <div className="coursel-image coursel-image__1" />
              <div className="coursel-image coursel-image__2" />
              <div className="coursel-image coursel-image__3" />
              <div className="coursel-image coursel-image__1" />
            </div>
          </div>
          <div className="coursel-dot-slider">
            <div onClick={() => CorNavigator(1, true)}>
              <li className="icon icon__1 fas fa-circle circle-active" />
            </div>
            <div onClick={() => CorNavigator(2, true)}>
              <li className="icon icon__2 fas fa-circle " />
            </div>
            <div onClick={() => CorNavigator(3, true)}>
              <li className="icon icon__3 fas fa-circle " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
