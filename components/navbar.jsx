import React from "react";
import { useRouter } from "next/router";
import { useStore } from "../contexts/storeContext";

const navbarHidePaths = ["/", "/auth/signin"];

const hideNavbar = (router) => {
  const path = router.pathname;
  if (navbarHidePaths.includes(path)) return true;
  return false;
};

const GetNavbar = (router) => {
  const { store } = useStore();
  const { isLogin, username } = store;
  const showForLoggedInUser = (prop) => {
    if (!isLogin) return "";
    return prop;
  };
  const showForNotLoggedInUser = (prop) => {
    if (isLogin) return "";
    return prop;
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={() => router.push("/")} href="#">
          Standings
        </a>

        <ul className="navbar-nav me-auto">
          {/* <li className="nav-item">
            <a className="nav-link active" href="#">Home
              <span className="visually-hidden">(current)</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => router.push("/admin")}
              href="#"
            >
              Admin
            </a>
          </li>
        </ul>
        <div className="cd-flex dropdown">
          <button
            className="btn btn-dark my-2 my-sm-0 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            id="dropdownMenuButton1"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="20px"
              height="20px"
              viewBox="0 0 448 512"
            >
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
            </svg>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-left porfile-menu"
            aria-labelledby="dropdownMenuButton1"
          >
            {showForLoggedInUser(
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => router.push("auth/user")}
                >
                  Porfile
                </a>
              </li>
            )}
            {showForLoggedInUser(
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => router.push("auth/signout")}
                >
                  Signout
                </a>
              </li>
            )}
            {showForNotLoggedInUser(
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => router.push("auth/signin")}
                >
                  Signin
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const router = useRouter();
  if (hideNavbar(router)) return "";
  return GetNavbar(router);
};

export default Navbar;
