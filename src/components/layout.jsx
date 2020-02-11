/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import HelmetProps from "./helmet";

const Layout = ({ children }) => {
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
