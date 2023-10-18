import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CImage,
  CNavTitle,
  CNavItem,
  CNavGroup,
  CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilCircle } from '@coreui/icons';

import logoPath from 'src/assets/images/mocean_logo.png';

// sidebar nav config

const NotesSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage align="center" src={logoPath} fluid width={200} />
      </CSidebarBrand>
      <CSidebarNav>
        <CNavTitle>Progress</CNavTitle>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilCircle} />
          Nav item
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
          With badge
          <CBadge color="success ms-auto">NEW</CBadge>
        </CNavItem>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  );
};

export default React.memo(NotesSidebar);
