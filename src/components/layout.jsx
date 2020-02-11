/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import Div100vh from "react-div-100vh";
import Helmet from "react-helmet";
import HelmetProps from "./helmet";

const Layout = ({ children }) => {
  const isSSR = typeof window === "undefined";
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <Div100vh>
            <Helmet {...HelmetProps} />
            <main className="layout">{children}</main>
          </Div100vh>
        </React.Suspense>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
