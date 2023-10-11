import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CProgress,
  CProgressBar,
  CButton,
  CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu, cilLoop, cilNotes, cilPenAlt } from '@coreui/icons';

import NotesService from 'src/services/notesService';
import { NotesSecondaryHeader } from './index';
import logoPath from 'src/assets/images/mocean_logo.png';
import * as ACTIONS from 'src/constants/actions';
import './NotesHeader.scss';

const NotesHeader = () => {
  const dispatch = useDispatch();

  const sidebarShow = useSelector((state) => state.sidebarShow);
  const completionPercentage = useSelector((state) => state.completionPercentage);

  const resetBodySelection = () => {
    dispatch({ type: ACTIONS.RESET_BODY_SELECTION });
  };

  const toggleOffScreenCanvasVisibility = () => {
    dispatch({
      type: ACTIONS.TOGGLE_OFFCANVAS_VISIBILITY,
    });
  };

  const testNotesService = () => {
    NotesService.getBodyPartText();
    NotesService.getManualText();
    NotesService.getTherexPurposeText();
    NotesService.getMovementText();
    NotesService.getCuesText();
    NotesService.getResultsText();
    console.log(NotesService.generateDailyNotesText());
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="header-brand-block d-none d-md-flex me-auto">
          <CNavItem>
            <CImage className="brand-image" align="center" src={logoPath} fluid width={140} />
            <CNavLink className="brand-text" style={{ fontWeight: '700' }}>
              Daily Notes App
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav style={{ width: '260px', marginRight: '20px' }}>
          <CNavItem className="flex-grow-1">
            <CProgress color="success" value={completionPercentage} variant="striped" animated>
              <CProgressBar>{`${completionPercentage}%`}</CProgressBar>
            </CProgress>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="app-header-button-group gap-2">
          <CNavItem>
            <CButton
              color="warning"
              variant="outline"
              className="app-filter-reset-btn d-flex align-items-center gap-2"
              onClick={resetBodySelection}
            >
              <strong>Reset Selections</strong>
              <CIcon icon={cilLoop} size="lg" />
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton
              onClick={toggleOffScreenCanvasVisibility}
              color="primary"
              variant="outline"
              className="app-editor-btn d-flex align-items-center gap-2"
            >
              <strong>Note Editor</strong>
              <CIcon icon={cilPenAlt} size="lg" />
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton
              onClick={testNotesService}
              variant="outline"
              color="primary"
              className="app-note-generate-btn d-flex align-items-center gap-2"
            >
              <strong>Generate Note</strong>
              <CIcon icon={cilNotes} size="lg" />
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
