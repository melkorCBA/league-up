import React from "react";
import Link from "next/link";
import useLoginUser from "../hooks/useLoginUser";

const DropdownOptions = () => {
  const { currentUser, showForLoggedInUser, showForNotLoggedInUser } =
    useLoginUser();
  return (
    <>
      <ul
        className="dropdown-menu dropdown-menu-left porfile-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        {showForLoggedInUser(
          <>
            <li>
              <Link className="dropdown-item" href="/auth/user">
                {currentUser.email}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/auth/signout">
                Signout
              </Link>
            </li>
          </>
        )}
        {showForNotLoggedInUser(
          <li>
            <Link className="dropdown-item" href="/auth/signin">
              Signin
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

const AcountDropdown = () => {
  return (
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
      <DropdownOptions />
    </div>
  );
};

export default AcountDropdown;
