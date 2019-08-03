import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Weapons() {
  useEffect(() => {
    FetchItem();
  }, []);

  const [Weapons, SetWeapon] = useState([]);
  const [CategoryWeapons, SetCategoryWeapons] = useState([]);
  var SpecificWeapon = [];

  const FetchItem = async () => {
    const WeaponsData = await fetch(
      "https://fortnite-public-api.theapinetwork.com/weapons/get"
    );
    const Weapons = await WeaponsData.json();
    SetWeapon(Weapons.data.entries);
    SetCategoryWeapons(Weapons.data.entries);
  };

  // const path = window.location.pathname;

  function setTrue(value) {
    if (value === 1) {
      const change = document.getElementById("LegendaryM");
      change.checked = !change.checked;
    } else if (value === 2) {
      const change = document.getElementById("EpicM");
      change.checked = !change.checked;
    } else if (value === 3) {
      const change = document.getElementById("RareM");
      change.checked = !change.checked;
    } else if (value === 4) {
      const change = document.getElementById("UncommonM");
      change.checked = !change.checked;
    } else if (value === 5) {
      const change = document.getElementById("CommonM");
      change.checked = !change.checked;
    }
  }

  let Legendary;
  let Epic;
  let Rare;
  let Common;
  let Uncommon;
  function GetCategory(status) {
    if (status === "mobile") {
      Legendary = document.getElementById("LegendaryM").checked;
      Epic = document.getElementById("EpicM").checked;
      Rare = document.getElementById("RareM").checked;
      Common = document.getElementById("CommonM").checked;
      Uncommon = document.getElementById("UncommonM").checked;
      WeaponRarity(Legendary, Epic, Rare, Common, Uncommon);
    } else {
      Legendary = document.getElementById("Legendary").checked;
      Epic = document.getElementById("Epic").checked;
      Rare = document.getElementById("Rare").checked;
      Common = document.getElementById("Common").checked;
      Uncommon = document.getElementById("Uncommon").checked;
      WeaponRarity(Legendary, Epic, Rare, Common, Uncommon);
    }
  }

  function WeaponRarity(L, E, R, U, C) {
    let SavedWeapon = [];
    Weapons.map(Category => {
      if (L & (Category.rarity === "legendary")) {
        return SavedWeapon.push(Category);
      }
      if (E & (Category.rarity === "epic")) {
        return SavedWeapon.push(Category);
      }
      if (R & (Category.rarity === "rare")) {
        return SavedWeapon.push(Category);
      }
      if (U & (Category.rarity === "uncommon")) {
        return SavedWeapon.push(Category);
      }
      if (C & (Category.rarity === "common")) {
        return SavedWeapon.push(Category);
      }
    });
    SetCategoryWeapons(SavedWeapon);
  }

  function CloseWeapon() {
    const rarity = document.querySelector(".weapon-preview");
    const displayWeapon = document.querySelector(".weapon-views");
    if (SpecificWeapon.length >= 1) {
      rarity.classList.remove("weapon-preview__" + SpecificWeapon[0].rarity);
    }
    displayWeapon.style.display = "none";
    SpecificWeapon = [];
  }

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

  function GetWeapon(id) {
    const image = document.querySelector(".weapon-image");
    const rarityimage = document.querySelector(".weapon-rarity-image");
    const name = document.querySelector(".weapon-name");
    const rarity = document.querySelector(".weapon-preview");
    const displayWeapon = document.querySelector(".weapon-views");
    const raritydescription = document.querySelector(".rarity-description");
    if (SpecificWeapon.length >= 1) {
      rarity.classList.remove("weapon-preview__" + SpecificWeapon[0].rarity);
    }
    SpecificWeapon = [];
    Weapons.map(weapon => {
      if (weapon.identifier === id) {
        return SpecificWeapon.push(weapon);
      }
    });
    rarity.classList.add("weapon-preview__" + SpecificWeapon[0].rarity);
    image.style.backgroundImage = "url(" + SpecificWeapon[0].image + ")";
    image.style.backgroundSize = "contain";
    rarityimage.style.background = "url(" + SpecificWeapon[0].image + ")";
    name.innerHTML = SpecificWeapon[0].name;
    raritydescription.innerHTML = SpecificWeapon[0].rarity;
    displayWeapon.style.display = "block";
    GetWeaponStatus();
  }

  function GetWeaponStatus() {
    let status = SpecificWeapon[0].stats;
    const ammo = document.querySelector(".status-bar__ammo");
    const dps = document.querySelector(".status-bar__dps");
    const firerate = document.querySelector(".status-bar__firerate");
    const hitbody = document.querySelector(".status-bar__hit-body");
    const hithead = document.querySelector(".status-bar__hit-head");
    const megazine = document.querySelector(".status-bar__megazine");
    const reload = document.querySelector(".status-bar__reload");
    ammo.style.width = status.ammocost + "%";
    dps.style.width = (status.dps / 200) * 100 + "%";
    firerate.style.width = status.firerate * 10 + "%";
    hitbody.style.width = (status.hit_body / 200) * 100 + "%";
    hithead.style.width = (status.hit_head / 200) * 100 + "%";
    megazine.style.width = status.magazinesize + "%";
    reload.style.width = status.reloadtime * 10 + "%";
  }

  return (
    <div className="Weapons">
      {WeaponCategory()}
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
              <Link className="link" to="/shops">
                <div className="shop-mobile-nav">
                  <h2>SHOP</h2>
                </div>
              </Link>
            </li>
            {(() => {
              if (window.location.pathname === "/weapons") {
                return (
                  <li>
                    <div className="rarity-selector">
                      <div className="mobile-weapon-category-selector">
                        <div className="category-selector-container">
                          <div className="category-wrapper">
                            <div className="category-container">
                              <input
                                type="checkbox"
                                id="LegendaryM"
                                value="true"
                              />
                              <h3 onClick={() => setTrue(1)}>Legendary</h3>
                            </div>
                            <div className="category-container">
                              <input type="checkbox" id="EpicM" value="true" />
                              <h3 onClick={() => setTrue(2)}>Epic</h3>
                            </div>
                            <div className="category-container">
                              <input type="checkbox" id="RareM" value="true" />
                              <h3 onClick={() => setTrue(3)}>Rare</h3>
                            </div>
                            <div className="category-container">
                              <input
                                type="checkbox"
                                id="UncommonM"
                                value="true"
                              />
                              <h3 onClick={() => setTrue(4)}>Uncommon</h3>
                            </div>
                            <div className="category-container">
                              <input
                                type="checkbox"
                                id="CommonM"
                                value="true"
                              />
                              <h3 onClick={() => setTrue(5)}>Common</h3>
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              GetCategory("mobile");
                              CloseMobileNavigation();
                            }}
                            className="category-button"
                          >
                            CONFIRM
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
            })()}
          </div>
        </div>
      </div>
      <div className="weapon-views">
        <div className="weapon-views-wrapper">
          <div className="weapon-preview">
            <div onClick={() => CloseWeapon()} className="close-btn ">
              <div className="icon fas fa-times" />
            </div>
            <div className="weapon-image" />
            {/* Weapon Stats Goes Here */}
            {WeaponStats()}
            {/* Weapon Stats Goes Here */}
          </div>
        </div>
      </div>
      <div className="weapons-wrapper">
        <div className="weapons-container weapons-container-active">
          {CategoryWeapons.map(weapon => (
            <div key={weapon.identifier} className="weapon-container">
              <li>
                <h3>{weapon.name}</h3>
                <div
                  onClick={() => GetWeapon(weapon.identifier)}
                  className={"image image__" + weapon.rarity}
                >
                  <img className="image-container" src={weapon.image} alt="" />
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  function WeaponStats() {
    return (
      <div className="weapon-stats">
        <div className="rarity-image">
          <div className="rarity" />
          <div className="weapon-rarity-image" />
          <div className="rarity-tag">
            <div className="rarity-description" />
          </div>
        </div>
        <div className="stats">
          <h1 className="weapon-name">A</h1>
          <div className="weapon-chart">
            <div className="stat-name">
              <p className="p-ammo-cost">Ammo Cost </p>
              <p className="p-dps">DPS </p>
              <p className="p-firerate">Fire Rate </p>
              <p className="p-hit-body">Hit Body </p>
              <p className="p-hit-head">Hit Head </p>
              <p className="p-megazine">Megazine Size </p>
              <p className="p-reload">Reload Time </p>
            </div>
            <div className="stat-bar">
              <div className="status-bar status-bar__ammo">
                <div className="weapon-status-fill-active" />
              </div>
              <div className="status-bar status-bar__dps">
                <div className="status-dps weapon-status-fill-active" />
              </div>
              <div className="status-bar status-bar__firerate">
                <div className="status-firerate weapon-status-fill-active" />
              </div>
              <div className="status-bar status-bar__hit-body">
                <div className="status-hitbody weapon-status-fill-active" />
              </div>
              <div className="status-bar status-bar__hit-head">
                <div className="status-hithead weapon-status-fill-active" />
              </div>
              <div className="status-bar status-bar__megazine">
                <div className="status-megazine weapon-status-fill-active" />
              </div>
              <div className="status-bar status-bar__reload">
                <div className="status-reload weapon-status-fill-active" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function WeaponCategory() {
    return (
      <div className="weapon-category-selector-wrapper">
        <div className="weapon-category-selector">
          <div className="category-selector-container">
            <h1>WeaponRarity</h1>
            <div className="category-wrapper">
              <div className="category-container">
                <input type="checkbox" id="Legendary" value="true" />
                <h3>Legendary</h3>
              </div>
              <div className="category-container">
                <input type="checkbox" id="Epic" value="true" />
                <h3>Epic</h3>
              </div>
              <div className="category-container">
                <input type="checkbox" id="Rare" value="true" />
                <h3>Rare</h3>
              </div>
              <div className="category-container">
                <input type="checkbox" id="Uncommon" value="true" />
                <h3>Uncommon</h3>
              </div>
              <div className="category-container">
                <input type="checkbox" id="Common" value="true" />
                <h3>Common</h3>
              </div>
            </div>
            <div onClick={() => GetCategory()} className="category-button">
              CONFIRM
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weapons;
