import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CListGroup,
  CListGroupItem,
  CFormCheck,
} from '@coreui/react';

import { UPDATE_MANUAL_TYPE_SELECTION } from '../../../../constants/actions';
import { getConfigByKey, getSelectionRangeByKey } from './utils';
import './manual.scss';

// manualJoint related values
const manualJointConfigKey = 'manualJoint';
const manualJointActions = getConfigByKey(manualJointConfigKey).map(({ name }) => name);
const { minSelection: manualJointMinSelection = 1, maxSelection: manualJointMaxSelection = 1 } =
  getSelectionRangeByKey(manualJointConfigKey);

// manualMuscle related values
const manualMuscleConfigKey = 'manualMuscle';
const manualMuscleActions = getConfigByKey(manualMuscleConfigKey).map(({ name }) => name);
const { minSelection: manualMuscleMinSelection = 1, maxSelection: manualMuscleMaxSelection = 1 } =
  getSelectionRangeByKey(manualMuscleConfigKey);

// manualNerve related values
const manualNerveConfigKey = 'manualNerve';
const manualNerveActions = getConfigByKey(manualNerveConfigKey).map(({ name }) => name);
const { minSelection: manualNerveMinSelection = 1, maxSelection: manualNerveMaxSelection = 1 } =
  getSelectionRangeByKey(manualNerveConfigKey);

const ManualSection = () => {
  const dispatch = useDispatch();

  const selectedManualJoint = useSelector((state) => state.selectedManualJoint);
  const selectedManualMuscle = useSelector((state) => state.selectedManualMuscle);
  const selectedManualNerve = useSelector((state) => state.selectedManualNerve);

  const [isVisible, setVisible] = useState(true);

  const updateSelectedManualActions = useCallback(
    (newSelectedManualActions = [], statePropName) => {
      dispatch({
        type: UPDATE_MANUAL_TYPE_SELECTION,
        [statePropName]: newSelectedManualActions,
      });
    },
    [dispatch],
  );

  const onManualActionSelectHandler = (evt) => {
    let selectedManualActions = [];
    let maxSelection = 1;
    let stateProp;

    const manualType = evt.target.getAttribute('data-manual-type');
    console.log('evt.target:', evt.target);
    switch (manualType) {
      case manualJointConfigKey: {
        selectedManualActions = [...selectedManualJoint];
        maxSelection = manualJointMaxSelection;
        stateProp = 'selectedManualJoint';

        break;
      }
      case manualMuscleConfigKey: {
        selectedManualActions = [...selectedManualMuscle];
        maxSelection = manualMuscleMaxSelection;
        stateProp = 'selectedManualMuscle';

        break;
      }
      case manualNerveConfigKey: {
        selectedManualActions = [...selectedManualNerve];
        maxSelection = manualNerveMaxSelection;
        stateProp = 'selectedManualNerve';

        break;
      }
      default:
        break;
    }

    console.log('selectedManualActions:', selectedManualActions);
    console.log('stateProp:', stateProp);
    console.log('maxSelection:', maxSelection);

    if (!stateProp) {
      return;
    }

    const { value, checked } = evt.target;
    const canAdd = selectedManualActions.length < maxSelection;

    // add selection if checked
    if (checked && canAdd) {
      selectedManualActions.push(value);
    } else {
      selectedManualActions = selectedManualActions.filter((item) => item !== value);
    }

    updateSelectedManualActions(selectedManualActions, stateProp);
  };

  // helper render function to render manual actions based on type
  const renderManualActions = (manualType) => {
    // default to manualJoint
    let title = 'Joint';
    let selectedManualActions = [...selectedManualJoint];
    let manualActions = [...manualJointActions];
    let maxSelection = manualJointMaxSelection;

    if (manualType === manualMuscleConfigKey) {
      title = 'Muscle';
      selectedManualActions = [...selectedManualMuscle];
      manualActions = [...manualMuscleActions];
      maxSelection = manualMuscleMaxSelection;
    } else if (manualType === manualNerveConfigKey) {
      title = 'Nerve';
      selectedManualActions = [...selectedManualNerve];
      manualActions = [...manualNerveActions];
      maxSelection = manualNerveMaxSelection;
    }

    const atMaxSelection = selectedManualActions.length === maxSelection;

    return (
      <CListGroup className="flex-grow-1 manual-item-container" key={manualType}>
        <CListGroupItem active>{title}</CListGroupItem>
        {manualActions.map((manualAction, index) => {
          const isSelected = selectedManualActions.includes(manualAction);
          const isDisabled = atMaxSelection && !isSelected;

          return (
            <CListGroupItem key={`manualAction-${index}`} className="manual-action-item">
              <CFormCheck
                data-manual-type={manualType}
                disabled={!!isDisabled}
                checked={isSelected}
                key={`manualActionCheck-${index}`}
                id={manualAction}
                value={manualAction}
                label={manualAction}
                onChange={onManualActionSelectHandler}
              />
            </CListGroupItem>
          );
        })}
      </CListGroup>
    );
  };

  return (
    <React.Fragment>
      <CRow className="root-section-row">
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="section-card-header d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span>
                  Select <strong>{manualJointMinSelection}</strong> joint manual action,{' '}
                  <strong>{manualMuscleMinSelection}</strong> muscle manual action and{' '}
                  <strong>{manualNerveMinSelection}</strong> nerve manual action.
                </span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDER MANUAL CARDS */}
                    {[manualJointConfigKey, manualMuscleConfigKey, manualNerveConfigKey].map(
                      (manualType) => {
                        return renderManualActions(manualType);
                      },
                    )}
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default ManualSection;
