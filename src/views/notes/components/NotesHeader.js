import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CAlert,
  CAlertLink,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CProgress,
  CProgressBar,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilList, cilBolt, cilMenu, cilLoop } from '@coreui/icons';

import { NotesSecondaryHeader, NotesHeaderDropdown } from './index';
import { logo } from 'src/assets/brand/logo';

const NotesHeader = () => {
  const dispatch = useDispatch();

  const sidebarShow = useSelector((state) => state.sidebarShow);
  const completionPercentage = useSelector((state) => state.completionPercentage);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink style={{ fontWeight: '700' }}>MOCEAN Daily Notes App</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav style={{ width: '260px', marginRight: '20px' }}>
          <CNavItem className="flex-grow-1">
            <CProgress color="success" value={completionPercentage} variant="striped" animated>
              <CProgressBar>{`${completionPercentage}%`}</CProgressBar>
            </CProgress>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="gap-2">
          <CNavItem>
            <CButton color="secondary" className="d-flex align-items-center gap-2">
              <strong>Reset</strong>
              <CIcon icon={cilLoop} size="lg" />
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton color="primary" className="d-flex align-items-center gap-2">
              <strong>Generate</strong>
              <CIcon icon={cilBolt} size="lg" />
            </CButton>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <NotesSecondaryHeader />
      </CContainer>
    </CHeader>
  );
};

export default NotesHeader;
