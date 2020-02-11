/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import HelmetProps from "./helmet";

const Layout = ({ children }) => {
  const isSSR = typeof window === "undefined";
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <Helmet {...HelmetProps} />
          <HeightFix />
          <main className="layout">{children}</main>
        </React.Suspense>
      )}
    </>
  );
};

const HeightFix = () => {
  // We listen to the resize event
  return window.addEventListener("resize", () => {
    // We execute the same script as before
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
