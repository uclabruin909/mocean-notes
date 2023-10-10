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

import { UPDATE_THEREX_PURPOSE_SELECTION } from '../../../../constants/actions';
import { getTherexPuposeConfig, getTherexPuposeSelectionRange, standardizeWord } from './utils';
import './therexPurpose.scss';

// therex purpose configs values
const TherexConfig = getTherexPuposeConfig();
const { minSelection: therexMinSelection = 1, maxSelection: therexMaxSelection = 1 } =
  getTherexPuposeSelectionRange();

const TherexPuposeSection = () => {
  const dispatch = useDispatch();

  const selectedBodyPart = useSelector((state) => state.selectedBodyPart);
  const selectedTherexPurposes = useSelector((state) => state.selectedTherexPurposes);

  const [isVisible, setVisible] = useState(true);
  const [therexPurposeOptions, setTherexPurposeOptions] = useState([]);
  const [isCompleted, setTherexSelectionCompleted] = useState(false);

  const updateTherexPurposeSelections = useCallback(
    (newTherexPurposeSelections = []) => {
      dispatch({
        type: UPDATE_THEREX_PURPOSE_SELECTION,
        selectedTherexPurposes: newTherexPurposeSelections,
      });
    },
    [dispatch],
  );

  // update therexPurposeOptions based on selectedBodyPart update
  useEffect(() => {
    const therexPurposesByBodyPart = TherexConfig[selectedBodyPart] || [];
    setTherexPurposeOptions(therexPurposesByBodyPart);
  }, [selectedBodyPart]);

  // Therex purpose selection logic
  useEffect(() => {
    console.log('selectedTherexPurposes has updated:', selectedTherexPurposes);
    const isCompleted = selectedTherexPurposes.length >= therexMinSelection;

    setTherexSelectionCompleted(isCompleted);
  }, [selectedTherexPurposes]);

  const onTherexSelectHandler = (evt) => {
    let selectedTherexItems = [...selectedTherexPurposes];
    const { value, checked } = evt.target;
    const canAdd = selectedTherexItems.length < therexMaxSelection;

    // add selection if checked
    if (checked && canAdd) {
      selectedTherexItems.push(value);
    } else {
      selectedTherexItems = selectedTherexItems.filter((item) => item !== value);
    }

    updateTherexPurposeSelections(selectedTherexItems);
  };

  // helper render function to render therex purpose card
  const renderTherexPurposeCard = () => {
    const atMaxSelection = selectedTherexPurposes.length === therexMaxSelection;

    return (
      <CListGroup className="flex-grow-1 therex-item-container">
        {/* <CListGroupItem active>{title}</CListGroupItem> */}
        {therexPurposeOptions.map((therexItem, index) => {
          const isSelected = selectedTherexPurposes.includes(therexItem);
          const isDisabled = atMaxSelection && !isSelected;

          return (
            <CListGroupItem key={index} className="therex-action-item">
              <CFormCheck
                disabled={!!isDisabled}
                checked={isSelected}
                key={therexItem}
                id={therexItem}
                value={therexItem}
                label={therexItem}
                onChange={onTherexSelectHandler}
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
                <strong>{`Therex Purpose: ${
                  selectedBodyPart ? standardizeWord(selectedBodyPart) : ''
                }`}</strong>
              </div>

              <CButton onClick={() => setVisible(!isVisible)} variant="ghost">
                <CIcon icon={cilChevronBottom} height={24}></CIcon>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDER THEREX PURPOSE CARD */}
                    {renderTherexPurposeCard()}
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

export default TherexPuposeSection;