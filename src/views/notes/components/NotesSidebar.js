import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultCompletionStatus } from 'src/store';

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
import { cilSpeedometer, cilMediaRecord } from '@coreui/icons';
import { deepEqual } from 'src/views/notes/components/sections/utils';
import { UPDATE_COMPLETION_STATUS } from 'src/constants/actions';
import SelectionService from 'src/services/selectionService';
import StoreService from 'src/services/storeService';

import logoPath from 'src/assets/images/mocean_logo.png';
import './NotesSidebar.scss';

// sidebar nav config

const NotesSidebar = () => {
  const dispatch = useDispatch();
  const [completionStatus, setCompletionStatus] = useState({ ...defaultCompletionStatus });

  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // all selections
  const selectedBodyPart = useSelector((state) => state.selectedBodyPart);
  const selectedBodyCategory = useSelector((state) => state.selectedBodyCategory);
  const selectedBodySpecific = useSelector((state) => state.selectedBodySpecific);
  const selectedRestriction = useSelector((state) => state.selectedRestriction);
  const selectedManualJoint = useSelector((state) => state.selectedManualJoint);
  const selectedManualMuscle = useSelector((state) => state.selectedManualMuscle);
  const selectedManualNerve = useSelector((state) => state.selectedManualNerve);
  const selectedMovementQuality = useSelector((state) => state.selectedMovementQuality);
  const selectedMovementType = useSelector((state) => state.selectedMovementType);
  const selectedMovementTasks = useSelector((state) => state.selectedMovementTasks);
  const selectedTherexPurposes = useSelector((state) => state.selectedTherexPurposes);
  const selectedCues = useSelector((state) => state.selectedCues);
  const selectedResults = useSelector((state) => state.selectedResults);

  const dispatchCompletionStatusUpdate = useCallback(
    (completionStatusObj) => {
      dispatch({
        type: UPDATE_COMPLETION_STATUS,
        ...completionStatusObj,
      });
    },
    [dispatch],
  );

  useEffect(() => {
    const currentCompletionStatus = SelectionService.constructCompletionStatusMap();

    if (!deepEqual(completionStatus, currentCompletionStatus)) {
      setCompletionStatus(currentCompletionStatus);
      dispatchCompletionStatusUpdate(currentCompletionStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedBodyPart,
    selectedBodyCategory,
    selectedBodySpecific,
    selectedRestriction,
    selectedManualJoint,
    selectedManualMuscle,
    selectedManualNerve,
    selectedMovementQuality,
    selectedMovementType,
    selectedMovementTasks,
    selectedTherexPurposes,
    selectedCues,
    selectedResults,
  ]);

  useEffect(() => {
    const currentCompletionStatus = SelectionService.constructCompletionStatusMap();
    if (!deepEqual(completionStatus, currentCompletionStatus)) {
      setCompletionStatus(currentCompletionStatus);
    }
  }, []);

  const setActiveNotesTab = useCallback((evt, newTabNum) => {
    evt.preventDefault();
    evt.stopPropagation();

    StoreService.updateActiveNotesTab(newTabNum);
  }, []);

  const renderStatusBadge = (isComplete) => {
    return !!isComplete ? (
      <CBadge color="success ms-auto">Done</CBadge>
    ) : (
      <CBadge color="warning ms-auto">!</CBadge>
    );
  };

  const {
    bodyPart: isBodyPartComplete,
    bodyCategory: isBodyCategoryComplete,
    bodySpecific: isBodySpecificComplete,
    restrictions: isRestrictionsComplete,
    manualJoint: isManualJointComplete,
    manualMuscle: isManualMuscleComplete,
    manualNerve: isManualNerveComplete,
    therex: isTherexComplete,
    movementQuality: isMovementQualityComplete,
    movementTypes: isMovementTypesComplete,
    movementTasks: isMovementTasksComplete,
    cues: isCuesComplete,
    result: isResultComplete,
  } = completionStatus;

  return (
    <CSidebar
      className="notes-sidebar-container"
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
        <CNavTitle>Progress </CNavTitle>
        <CNavItem href="#">
          {<CIcon customClassName="nav-icon" size="sm" icon={cilMediaRecord} />}
          Body Part
          {renderStatusBadge(isBodyPartComplete)}
        </CNavItem>
        <CNavItem href="#">
          {<CIcon customClassName="nav-icon" size="sm" icon={cilMediaRecord} />}
          Body Category
          {renderStatusBadge(isBodyCategoryComplete)}
        </CNavItem>
        <CNavItem href="#">
          {<CIcon customClassName="nav-icon" size="sm" icon={cilMediaRecord} />}
          Body Specific
          {renderStatusBadge(isBodySpecificComplete)}
        </CNavItem>
        <CNavItem href="#" onClick={(evt) => setActiveNotesTab(evt, 1)}>
          {<CIcon customClassName="nav-icon" size="sm" icon={cilMediaRecord} />}
          Restriction
          {renderStatusBadge(isRestrictionsComplete)}
        </CNavItem>
        <CNavItem href="#" onClick={(evt) => setActiveNotesTab(evt, 2)}>
          <CIcon customClassName="nav-icon" icon={cilMediaRecord} />
          Manual Actions
          {renderStatusBadge(
            isManualJointComplete && isManualMuscleComplete && isManualNerveComplete,
          )}
        </CNavItem>
        <CNavItem href="#" onClick={(evt) => setActiveNotesTab(evt, 3)}>
          <CIcon customClassName="nav-icon" icon={cilMediaRecord} />
          Therex
          {renderStatusBadge(isTherexComplete)}
        </CNavItem>
        <CNavItem href="#" onClick={(evt) => setActiveNotesTab(evt, 4)}>
          <CIcon customClassName="nav-icon" icon={cilMediaRecord} />
          Movement
          {renderStatusBadge(
            isMovementQualityComplete && isMovementTypesComplete && isMovementTasksComplete,
          )}
        </CNavItem>
        <CNavItem href="#" onClick={(evt) => setActiveNotesTab(evt, 5)}>
          <CIcon customClassName="nav-icon" icon={cilMediaRecord} />
          Cue & Result
          {renderStatusBadge(isCuesComplete && isResultComplete)}
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
