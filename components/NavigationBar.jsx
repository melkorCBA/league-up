import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AcountDropdown from "./AccountDropdown";
import useLoginUser from "../hooks/useLoginUser";

const Navbar = () => {
  const { showForLoggedInUser } = useLoginUser();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {showForLoggedInUser(
          <>
            <Link className="navbar-brand" href="/admin">
              Admin
            </Link>
          </>
        )}

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            {showForLoggedInUser(
              <>
                <Link
                  className="nav-link"
                  href="/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Standings
                </Link>
              </>
            )}
          </li>
        </ul>
        <AcountDropdown />
      </div>
    </nav>
  );
};

const navbarHidePaths = ["/", "/auth/signin"];

const hideNavbar = (router) => {
  const path = router.pathname;
  if (navbarHidePaths.includes(path)) return true;
  return false;
};
const NavigationBar = () => {
  const router = useRouter();
  if (hideNavbar(router)) return "";
  return Navbar();
};

export default NavigationBar;
