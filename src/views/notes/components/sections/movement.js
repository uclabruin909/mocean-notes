import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCard,
  CCallout,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CListGroup,
  CListGroupItem,
  CFormCheck,
} from '@coreui/react';

import { UPDATE_MOVEMENT_SELECTION } from '../../../../constants/actions';
import { getMovementConfig, getSelectionRangeByKey, standardizeWord } from './utils';
import './movement.scss';

// movement configs values
const MovementConfig = getMovementConfig();
const QualityKey = 'movementQuality';
const TypesKey = 'movementTypes';
const TasksKey = 'movementTasks';
const {
  minSelection: movementQualityMinSelection = 1,
  maxSelection: movementQualityMaxSelection = 1,
} = getSelectionRangeByKey(QualityKey);
const { minSelection: movementTypeMinSelection = 1, maxSelection: movementTypeMaxSelection = 1 } =
  getSelectionRangeByKey(TypesKey);
const { minSelection: movementTasksMinSelection = 1, maxSelection: movementTasksMaxSelection = 1 } =
  getSelectionRangeByKey(TasksKey);

console.log('movementTasksMinSelection', movementTasksMinSelection);
console.log('movementTasksMaxSelection', movementTasksMaxSelection);

const MovementSection = () => {
  const dispatch = useDispatch();

  const selectedBodyPart = useSelector((state) => state.selectedBodyPart);
  const selectedMovementQuality = useSelector((state) => state.selectedMovementQuality);
  const selectedMovementType = useSelector((state) => state.selectedMovementType);
  const selectedMovementTasks = useSelector((state) => state.selectedMovementTasks);

  const [isVisible, setVisible] = useState(true);
  const [currentMovementConfig, setCurrentMovementConfig] = useState({});

  const updateMovementSelections = useCallback(
    (newMovementSelections = [], statePropName) => {
      dispatch({
        type: UPDATE_MOVEMENT_SELECTION,
        [statePropName]: newMovementSelections,
      });
    },
    [dispatch],
  );

  // update currentMovementConfig based on selectedBodyPart update
  useEffect(() => {
    const newMovementConfig = MovementConfig[selectedBodyPart] || {};
    console.log('selectedBodyPart has updated:', selectedBodyPart);
    console.log('updating to movement config:', newMovementConfig);
    setCurrentMovementConfig(newMovementConfig);
  }, [selectedBodyPart]);

  const onMovementSelectHandler = (evt) => {
    let selectedMovementItems = [];
    let maxSelection = 1;
    let stateProp;

    const movementGroup = evt.target.getAttribute('data-movement-group');
    console.log('evt.target:', evt.target);
    switch (movementGroup) {
      case 'quality': {
        selectedMovementItems = [...selectedMovementQuality];
        maxSelection = movementQualityMaxSelection;
        stateProp = 'selectedMovementQuality';

        break;
      }
      case 'types': {
        selectedMovementItems = [...selectedMovementType];
        maxSelection = movementTypeMaxSelection;
        stateProp = 'selectedMovementType';

        break;
      }
      case 'tasks': {
        selectedMovementItems = [...selectedMovementTasks];
        maxSelection = movementTasksMaxSelection;
        stateProp = 'selectedMovementTasks';

        break;
      }
      default:
        break;
    }

    console.log('selectedMovementItems:', selectedMovementItems);
    console.log('stateProp:', stateProp);
    console.log('maxSelection:', maxSelection);

    if (!stateProp) {
      return;
    }

    const { value, checked } = evt.target;
    const canAdd = selectedMovementItems.length < maxSelection;

    // add selection if checked
    if (checked && canAdd) {
      selectedMovementItems.push(value);
    } else {
      selectedMovementItems = selectedMovementItems.filter((item) => item !== value);
    }

    updateMovementSelections(selectedMovementItems, stateProp);
  };

  // helper render function to render movement cards
  const renderMovementCardByKey = (key) => {
    let movementKey = 'quality';
    if (key === TypesKey) {
      movementKey = 'types';
    } else if (key === TasksKey) {
      movementKey = 'tasks';
    }

    const movementSelections = currentMovementConfig[movementKey] || [];
    const title = `Movement ${standardizeWord(movementKey)}`;

    // default to 'quality' related values
    let selectedItems = [...selectedMovementQuality];
    let maxSelection = movementQualityMaxSelection;
    if (movementKey === 'types') {
      selectedItems = [...selectedMovementType];
      maxSelection = movementTypeMaxSelection;
    } else if (movementKey === 'tasks') {
      selectedItems = [...selectedMovementTasks];
      maxSelection = movementTasksMaxSelection;
    }

    const atMaxSelection = selectedItems.length === maxSelection;

    return (
      <CListGroup className="flex-grow-1 movement-item-container" key={movementKey}>
        <CListGroupItem active>{title}</CListGroupItem>
        {movementSelections.map((movementSelectionItem, index) => {
          const disablePainWhenRestrictedQuality =
            movementKey === 'quality' &&
            movementSelectionItem === 'restricted' &&
            selectedMovementType.includes('pain level');
          const disableRestrictedWhenPainType =
            movementKey === 'types' &&
            movementSelectionItem === 'pain level' &&
            selectedMovementQuality.includes('restricted');

          const isSelected = selectedItems.includes(movementSelectionItem);
          let isDisabled =
            (atMaxSelection && !isSelected) ||
            disablePainWhenRestrictedQuality ||
            disableRestrictedWhenPainType;

          return (
            <CListGroupItem key={index} className="movement-action-item">
              <CFormCheck
                data-movement-group={movementKey}
                disabled={!!isDisabled}
                checked={isSelected}
                key={movementSelectionItem}
                id={movementSelectionItem}
                value={movementSelectionItem}
                label={movementSelectionItem}
                onChange={onMovementSelectHandler}
              />
            </CListGroupItem>
          );
        })}
      </CListGroup>
    );
  };

  const renderCalloutCard = () => {
    return (
      <CCallout color="danger">
        <strong>Body part has not been selected.</strong> A body part needs to be selected from the
        main dropdown in order to fetch the correct set of movement options.
      </CCallout>
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
                  Select <strong>{movementQualityMinSelection}</strong> movement quality,{' '}
                  <strong>{movementTypeMinSelection}</strong> movement type and at least{' '}
                  <strong>{movementTasksMinSelection}</strong> movement tasks (up to{' '}
                  <strong>{movementTasksMaxSelection}</strong>). The available options will be
                  dependent on which <strong>body part</strong> that was selected om in the above
                  dropdown.
                </span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDER MOVEMENT CARDS */}
                    {!!selectedBodyPart
                      ? [QualityKey, TypesKey, TasksKey].map((movementKey) => {
                          return renderMovementCardByKey(movementKey);
                        })
                      : renderCalloutCard()}
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

export default MovementSection;
