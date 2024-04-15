import React from "react";

const Footer = ({ text }: {text?:string}) => {
  return (
    <div className="h4 mt-5 text-center">
      {text}
      {/* Team 1 won the toss and choose to Bat first */}
    </div>
  );
};

export default Footer;
