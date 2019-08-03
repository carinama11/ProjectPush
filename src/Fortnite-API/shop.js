import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  useEffect(() => {
    FetchItem();
  }, []);

  const [upcomingItem, setupcomingItem] = useState([]);
  let ShopItems = [];
  let bestItem = [];
  let AllItems = [];

  const FetchItem = async () => {
    const UpComingItem = await fetch(
      "https://fortnite-public-api.theapinetwork.com/store/get"
    );

    const upcItems = await UpComingItem.json();
    return setupcomingItem(upcItems.items);
  };

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
  CountItem();
  function CountItem() {
    upcomingItem.map(item => {
      return ShopItems.push(item);
    });
    if (ShopItems.length < 1) {
      return;
    } else {
      let temp;
      for (let i = 0; i < ShopItems.length; i++) {
        for (let j = 0; j < ShopItems.length; j++) {
          let rating = ShopItems[i].ratings.avgStars;
          let rating2 = ShopItems[j].ratings.avgStars;
          if (rating >= rating2) {
            temp = ShopItems[i];
            ShopItems[i] = ShopItems[j];
            ShopItems[j] = temp;
          }
        }
      }
      getBestRating();
    }
  }

  function getBestRating() {
    for (let i = 0; i <= 3; i++) {
      bestItem[i] = ShopItems[i];
    }
    for (let i = 4; i < ShopItems.length; i++) {
      AllItems[i - 4] = ShopItems[i];
    }
    console.log(bestItem);
    console.log(AllItems);
  }

  return (
    <div className="item-shop-container">
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
              <Link className="link" to="/">
                <div className="home-mobile-nav">
                  <h2>HOME</h2>
                </div>
              </Link>
            </li>
            <li>
              <Link className="link" to="/weapons">
                <div className="shop-mobile-nav">
                  <h2>WEAPONS</h2>
                </div>
              </Link>
            </li>
          </div>
        </div>
      </div>
      <div className="item-list">
        <div className="best-rated-bar">
          <h2>Top Rated Items</h2>
        </div>
        <ul className="best-4-item-container">
          {bestItem.map(bestItem => (
            <li
              key={bestItem.itemid}
              className={"item-item item-item__" + bestItem.item.rarity}
            >
              <div className="rating-icon">
                <div className="icon fas fa-star" />
                <h3 className="icon-rating-number">
                  {bestItem.ratings.avgStars}
                </h3>
              </div>
              <img className="item-image" src={bestItem.item.image} alt="s" />
              <div className="item-description">
                <h3 className="item-name">{bestItem.name}</h3>
                <h4 className="item-type">{bestItem.item.type}</h4>
                <div className="price-container">
                  <div className="vbucks-icon" />
                  <h2 className="price">{bestItem.cost}</h2>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="best-rated-bar best-rated-bar__allitem">
          <h2>In-game Shop Items</h2>
        </div>
        <ul className="all-item">
          {AllItems.map(allItem => (
            <li
              key={allItem.itemid}
              className={"item-item item-item__" + allItem.item.rarity}
            >
              <div className="rating-icon">
                <div className="icon fas fa-star" />
                <h3 className="icon-rating-number">
                  {allItem.ratings.avgStars}
                </h3>
              </div>
              <img className="item-image" src={allItem.item.image} alt="s" />
              <div className="item-description">
                <h3 className="item-name">{allItem.name}</h3>
                <h4 className="item-type">{allItem.item.type}</h4>
                <div className="price-container">
                  <div className="vbucks-icon" />
                  <h2 className="price">{allItem.cost}</h2>
                </div>
              </div>
            </li>
          ))}
          <br />
        </ul>
      </div>
    </div>
  );
}

export default Shop;
