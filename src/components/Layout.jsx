/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import helmetProps from './helmet';

const Layout = ({ children }) => {
  const isSSR = typeof window === 'undefined';
  return (
    <>
      {!isSSR && (
        // Gatsby SSR - window breaks build
        <React.Suspense fallback={<div />}>
          <Helmet {...helmetProps} />
          <main className="layout">{children}</main>
        </React.Suspense>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
