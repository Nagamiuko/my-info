import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./nav.css";
const Nav = ({ TitleName }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const Link = (page) => {
    location.href = `./${page}`;
  };
  return (
    <>
      <div className="box-bg-bar">
        <div className="box-s-wh">
          <div className="lh">{TitleName}</div>
          <div className="menu-item" onClick={() => setOpenMenu(!openMenu)}>
            <FontAwesomeIcon
              icon={openMenu === false ? faEllipsisVertical : faXmark}
              className="close"
            />
          </div>
          <div className="rh">
            <ul>
              <li onClick={() => Link("#about")}>About</li>
              <li onClick={() => Link("#experience")}>Experience</li>
              <li onClick={() => Link("#project")}>Projects</li>
              <li onClick={() => Link("#contact")}>Contact</li>
            </ul>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="menuMobile">
          <nav>
            <ul>
              <li onClick={() => Link("#about")}>About</li>
              <li onClick={() => Link("#experience")}>Experience</li>
              <li onClick={() => Link("#project")}>Projects</li>
              <li onClick={() => Link("#contact")}>Contact</li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Nav;
