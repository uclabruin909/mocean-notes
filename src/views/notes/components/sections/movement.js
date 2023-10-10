import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CButton,
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
import CIcon from '@coreui/icons-react';
import { cilCheckCircle, cilChevronBottom } from '@coreui/icons';

import { UPDATE_MOVEMENT_SELECTION } from '../../../../constants/actions';
import { getMovementConfig, getSelectionRangeByMovementCategory, standardizeWord } from './utils';
import './movement.scss';

// movement configs values
const MovementConfig = getMovementConfig();
const QualityKey = 'quality';
const TypesKey = 'types';
const TasksKey = 'tasks';
const {
  minSelection: movementQualityMinSelection = 1,
  maxSelection: movementQualityMaxSelection = 1,
} = getSelectionRangeByMovementCategory(QualityKey);
const { minSelection: movementTypeMinSelection = 1, maxSelection: movementTypeMaxSelection = 1 } =
  getSelectionRangeByMovementCategory(TypesKey);
const { minSelection: movementTasksMinSelection = 1, maxSelection: movementTasksMaxSelection = 1 } =
  getSelectionRangeByMovementCategory(TasksKey);

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
  const [isMovementQualityCompleted, setMovementQualityCompleted] = useState(false);
  const [isMovementTypeCompleted, setMovementTypeCompleted] = useState(false);
  const [isMovementTasksCompleted, setMovementTasksCompleted] = useState(false);
  const [isCompleted, setMovementSelectionCompleted] = useState(false);

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

  // Movement Selection logic
  useEffect(() => {
    console.log('selectedMovementQuality has updated:', selectedMovementQuality);
    const isCompleted = selectedMovementQuality.length >= movementQualityMinSelection;

    setMovementQualityCompleted(isCompleted);
  }, [selectedMovementQuality]);

  useEffect(() => {
    console.log('selectedMovementType has updated:', selectedMovementType);
    const isCompleted = selectedMovementType.length >= movementTypeMinSelection;

    setMovementTypeCompleted(isCompleted);
  }, [selectedMovementType]);

  useEffect(() => {
    console.log('selectedMovementTasks has updated:', selectedMovementTasks);
    const isCompleted = selectedMovementTasks.length >= movementTasksMinSelection;

    setMovementTasksCompleted(isCompleted);
  }, [selectedMovementTasks]);

  useEffect(() => {
    const isSelectionCompleted =
      !!isMovementQualityCompleted && !!isMovementTypeCompleted && !!isMovementTasksCompleted;
    setMovementSelectionCompleted(isSelectionCompleted);
  }, [isMovementQualityCompleted, isMovementTypeCompleted, isMovementTasksCompleted]);

  const onMovementSelectHandler = (evt) => {
    let selectedMovementItems = [];
    let maxSelection = 1;
    let stateProp;

    const movementGroup = evt.target.getAttribute('data-movement-group');
    console.log('evt.target:', evt.target);
    switch (movementGroup) {
      case QualityKey: {
        selectedMovementItems = [...selectedMovementQuality];
        maxSelection = movementQualityMaxSelection;
        stateProp = 'selectedMovementQuality';

        break;
      }
      case TypesKey: {
        selectedMovementItems = [...selectedMovementType];
        maxSelection = movementTypeMaxSelection;
        stateProp = 'selectedMovementType';

        break;
      }
      case TasksKey: {
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
  const renderMovementCardByKey = (movementKey) => {
    const movementSelections = currentMovementConfig[movementKey] || [];
    const title = `Movement ${standardizeWord(movementKey)}`;

    // default to 'quality' related values
    let selectedItems = [...selectedMovementQuality];
    let maxSelection = movementQualityMaxSelection;
    if (movementKey === TypesKey) {
      selectedItems = [...selectedMovementType];
      maxSelection = movementTypeMaxSelection;
    } else if (movementKey === TasksKey) {
      selectedItems = [...selectedMovementTasks];
      maxSelection = movementTasksMaxSelection;
    }

    const atMaxSelection = selectedItems.length === maxSelection;

    return (
      <CListGroup className="flex-grow-1 movement-item-container" key={movementKey}>
        <CListGroupItem active>{title}</CListGroupItem>
        {movementSelections.map((movementSelectionItem, index) => {
          const disablePainWhenRestrictedQuality =
            movementKey === QualityKey &&
            movementSelectionItem === 'restricted' &&
            selectedMovementType.includes('pain level');
          const disableRestrictedWhenPainType =
            movementKey === TypesKey &&
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

  return (
    <React.Fragment>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader
              className="section-card-header d-flex justify-content-between align-items-center"
              onClick={() => setVisible(!isVisible)}
            >
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span>
                  <CIcon
                    customClassName={`note-card-icon ${isCompleted ? 'completed' : ''}`}
                    icon={cilCheckCircle}
                    size="xl"
                    height={25}
                  ></CIcon>
                </span>
                <strong>Movement</strong>
              </div>

              <CButton onClick={() => setVisible(!isVisible)} variant="ghost">
                <CIcon icon={cilChevronBottom} height={24}></CIcon>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDER MOVEMENT CARDS */}
                    {[QualityKey, TypesKey, TasksKey].map((movementKey) => {
                      return renderMovementCardByKey(movementKey);
                    })}
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
