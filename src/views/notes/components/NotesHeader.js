import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CTooltip,
  CNavItem,
  CButton,
  CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilMenu,
  cilNotes,
  cilPenAlt,
  cilDescription,
  cilSync,
  cilPlaylistAdd,
} from '@coreui/icons';

import NotesService from 'src/services/notesService';
import SelectionService from 'src/services/selectionService';
import ModalService from 'src/services/modalService';
import { NotesSecondaryHeader } from './index';
import logoPath from 'src/assets/images/mocean_logo.png';
import * as ACTIONS from 'src/constants/actions';
import './NotesHeader.scss';

const NotesHeader = () => {
  const dispatch = useDispatch();

  const sidebarShow = useSelector((state) => state.sidebarShow);
  const isSelectionCompleted = useSelector((state) => state.isSelectionCompleted);

  const resetBodySelection = () => {
    dispatch({ type: ACTIONS.RESET_BODY_SELECTION });
  };

  const toggleOffScreenCanvasVisibility = () => {
    dispatch({
      type: ACTIONS.TOGGLE_OFFCANVAS_VISIBILITY,
    });
  };

  const triggerAutoSelectModal = () => {
    const modalOptions = {
      isVisible: true,
      title: 'Auto-select confirmation',
      bodyText:
        'You have selected to auto-select the rest of the selections. This means the app will complete the remaining sections using random selection based on your current selections. \n\n Are you sure you want to continue?',
      primaryBtnText: 'Continue',
      primaryBtnCb: () => {
        SelectionService.autoSelectMain(true);
      },
      secondaryBtnText: 'Cancel',
      secondaryBtnCb: undefined,
    };

    ModalService.showModal(modalOptions);
  };

  const triggerSelectionNotCompletedModal = () => {
    const modalOptions = {
      isVisible: true,
      title: 'Notes cannot be generated: Required selections missing',
      bodyText:
        'All selections must be made before notes can be generated. Please complete the missing selections.',
      primaryBtnText: 'OK',
    };

    ModalService.showModal(modalOptions);
  };

  const testNotesService = () => {
    if (!isSelectionCompleted) {
      triggerSelectionNotCompletedModal();
      return;
    }
    // const bodyPart = SelectionService.autoSelectBodyPart();
    // const bodyCategory = SelectionService.autoSelectBodyCategory(bodyPart);
    // const bodySpecific = SelectionService.autoSelectBodySpecific(bodyCategory);
    // const restrictions = SelectionService.autoSelectRestrictions(bodySpecific);
    // const manualJoint = SelectionService.autoSelectManualJointActions(restrictions);
    // const manualMuscle = SelectionService.autoSelectManualMuscleActions(manualJoint);
    // const manualNerve = SelectionService.autoSelectManualNerveActions(manualMuscle);
    // const therexPurpose = SelectionService.autoSelectTherexPurpose(manualNerve);
    // const movementQuality = SelectionService.autoSelectMovementQuality(therexPurpose);
    // const movementTypes = SelectionService.autoSelectMovementTypes(movementQuality);
    // const movementTasks = SelectionService.autoSelectMovementTasks(movementTypes);
    // const cues = SelectionService.autoSelectCues(movementTasks);
    // const results = SelectionService.autoSelectResults(cues);
    const results = SelectionService.autoSelectMain();
    const total = { ...results };

    dispatch({
      type: 'set',
      ...total,
    });

    setTimeout(() => {
      console.log(
        'SelectionService.constructCompletionStatusMap()',
        SelectionService.constructCompletionStatusMap(),
      );
      NotesService.getBodyPartText();
      NotesService.getManualText();
      NotesService.getTherexPurposeText();
      NotesService.getMovementText();
      NotesService.getCuesText();
      NotesService.getResultsText();
      console.log(NotesService.generateDailyNotesText());
    }, 1000);
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
        {/* <CHeaderNav className="header-brand-block d-none d-md-flex me-auto">
          <CNavItem>
            <CImage className="brand-image" align="center" src={logoPath} fluid width={140} />
            <CNavLink className="brand-text" style={{ fontWeight: '700' }}>
              Notes App
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}

        <CHeaderNav className="app-header-button-group gap-2">
          <CNavItem>
            <CTooltip content="Reset all of the current selections" placement="bottom">
              <CButton
                variant="outline"
                color="primary"
                className="app-filter-reset-btn d-flex align-items-center"
                onClick={resetBodySelection}
              >
                <CIcon icon={cilSync} size="lg" />
              </CButton>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip
              content="Will open the notes editor section.  Newly generated notes will be applied to the text area."
              placement="bottom"
            >
              <CButton
                onClick={toggleOffScreenCanvasVisibility}
                color="primary"
                variant="outline"
                className="app-editor-btn d-flex align-items-center"
              >
                <CIcon icon={cilPenAlt} size="lg" />
              </CButton>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CTooltip
              content="Auto-select the any remaining/incomplete sections based on your current selections."
              placement="bottom"
            >
              <CButton
                onClick={triggerAutoSelectModal}
                color="primary"
                variant="outline"
                className="app-auto-select-btn d-flex align-items-center gap-2"
              >
                <strong>Auto-Select</strong>
                <CIcon icon={cilPlaylistAdd} size="lg" />
              </CButton>
            </CTooltip>
          </CNavItem>
          <CNavItem>
            <CButton
              onClick={testNotesService}
              variant="outline"
              color="primary"
              className={`app-note-generate-btn d-flex align-items-center gap-2 ${
                !isSelectionCompleted ? 'disabled' : ''
              }`}
            >
              <strong>Generate Note</strong>
              <CIcon icon={cilDescription} size="lg" />
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
