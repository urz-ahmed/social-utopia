import React from "react";

const Footer = () => {
  return (
    <footer className="footer-center w-full p-4 bg-gray-900 text-gray-100">
      <div className="text-center">
        <p>
          Copyright © {new Date().getFullYear()} -
          <a className="font-semibold" href="/">
            Social Utopia
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
