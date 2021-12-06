import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderSuperAdmin from "../wrappers/header/HeaderSuperAdmin";

const LayoutSuperAdmin = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass
}) => {
  return (
    <Fragment>
      <HeaderSuperAdmin
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
      />
      {children}

    </Fragment>
  );
};

LayoutSuperAdmin.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerTop: PropTypes.string
};

export default LayoutSuperAdmin;
