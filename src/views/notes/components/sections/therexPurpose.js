import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCallout,
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

import { UPDATE_THEREX_PURPOSE_SELECTION } from 'src/constants/actions';
import { getTherexPuposeConfig, getTherexPuposeSelectionRange } from './utils';
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

  const renderCalloutCard = () => {
    return (
      <CCallout color="danger">
        <strong>Body part has not been selected.</strong> A body part needs to be selected from the
        main dropdown in order to fetch the correct set of therex purposes.
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
                  The available options will be dependent on which <strong>body part</strong> that
                  was selected above.
                </span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDER THEREX PURPOSE CARD */}
                    {!!selectedBodyPart ? renderTherexPurposeCard() : renderCalloutCard()}
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
