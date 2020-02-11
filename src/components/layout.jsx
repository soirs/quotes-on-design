/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import HelmetProps from "./helmet";

const Layout = ({ children }) => {
  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  return (
    <>
      <Helmet {...HelmetProps} />
      <main className="layout">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
