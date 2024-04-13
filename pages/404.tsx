import Image from "next/image";
import React from "react";

export default function NotFound() {
  return (
    <div className="not-found-container row justify-content-center">
      <div className="col-md-6 text-center">
        <Image
          src="/Noball.png"
          alt="not-found clipart"
          width="250"
          height="350"
        ></Image>
        <div>Oops! Page not found!</div>
      </div>
    </div>
  );
}
