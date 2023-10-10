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

import { UPDATE_CUES_SELECTION, UPDATE_RESULTS_SELECTION } from '../../../../constants/actions';
import {
  getCueOptions,
  getCueSelectionRange,
  getResultOptions,
  getResultSelectionRange,
} from './utils';
import './cueAndResult.scss';

// Cues related values
const cueOptions = getCueOptions();
const { minSelection: cueMinSelection = 1, maxSelection: cueMaxSelection = 1 } =
  getCueSelectionRange();

// Results related values
const resultOptions = getResultOptions();
const { minSelection: resultMinSelection = 1, maxSelection: resultMaxSelection = 1 } =
  getResultSelectionRange();

const CueAndResultSection = () => {
  const dispatch = useDispatch();

  const selectedCues = useSelector((state) => state.selectedCues);
  const selectedResults = useSelector((state) => state.selectedResults);

  const [isVisible, setVisible] = useState(true);
  const [isCompleted, setCompleted] = useState(false);
  const [isCuesCompleted, setCuesCompleted] = useState(false);
  const [isResultsCompleted, setResultsCompleted] = useState(false);

  const updateSelectedCuesActions = useCallback(
    (newSelectedCues = []) => {
      dispatch({
        type: UPDATE_CUES_SELECTION,
        selectedCues: newSelectedCues,
      });
    },
    [dispatch],
  );

  const updateSelectedResultsActions = useCallback(
    (newSelectedResults = []) => {
      dispatch({
        type: UPDATE_RESULTS_SELECTION,
        selectedResults: newSelectedResults,
      });
    },
    [dispatch],
  );

  const onCueSelectHandler = (evt) => {
    let selectedCueItems = [...selectedCues];
    const { value, checked } = evt.target;
    const canAdd = selectedCueItems.length < cueMaxSelection;

    // add selection if checked
    if (checked && canAdd) {
      selectedCueItems.push(value);
    } else {
      selectedCueItems = selectedCueItems.filter((item) => item !== value);
    }

    updateSelectedCuesActions(selectedCueItems);
  };

  const onResultSelectHandler = (evt) => {
    let selectedResultItems = [...selectedResults];
    const { value, checked } = evt.target;
    const canAdd = selectedResultItems.length < resultMaxSelection;

    // add selection if checked
    if (checked && canAdd) {
      selectedResultItems.push(value);
    } else {
      selectedResultItems = selectedResultItems.filter((item) => item !== value);
    }

    updateSelectedResultsActions(selectedResultItems);
  };

  // Cues Selection logic
  useEffect(() => {
    console.log('selectedCues has updated:', selectedCues);
    const isCompleted = selectedCues.length >= cueMinSelection;

    setCuesCompleted(isCompleted);
  }, [selectedCues]);

  useEffect(() => {
    console.log('selectedResults has updated:', selectedResults);
    const isCompleted = selectedResults.length >= resultMinSelection;

    setResultsCompleted(isCompleted);
  }, [selectedResults]);

  useEffect(() => {
    const isSelectionCompleted = !!isCuesCompleted && !!isResultsCompleted;
    setCompleted(isSelectionCompleted);
  }, [isCuesCompleted, isResultsCompleted]);

  // helper function to render cue card
  const renderCueCard = () => {
    const atMaxSelection = selectedCues.length === cueMaxSelection;

    return (
      <CListGroup className="flex-grow-1 cues-item-container" key="cues-key">
        <CListGroupItem active>Cues</CListGroupItem>
        {cueOptions.map((cueItem, index) => {
          const isSelected = selectedCues.includes(cueItem);
          const isDisabled = atMaxSelection && !isSelected;

          return (
            <CListGroupItem key={`cueItem-${index}`} className="cues-action-item">
              <CFormCheck
                disabled={!!isDisabled}
                checked={isSelected}
                key={`cueItemCheck-${index}`}
                id={cueItem}
                value={cueItem}
                label={cueItem}
                onChange={onCueSelectHandler}
              />
            </CListGroupItem>
          );
        })}
      </CListGroup>
    );
  };

  // helper function to render result card
  const renderResultCard = () => {
    const atMaxSelection = selectedResults.length === resultMaxSelection;

    return (
      <CListGroup className="flex-grow-1 results-item-container" key="results-key">
        <CListGroupItem active>Result</CListGroupItem>
        {resultOptions.map((resultItem, index) => {
          const isSelected = selectedResults.includes(resultItem);
          const isDisabled = atMaxSelection && !isSelected;

          return (
            <CListGroupItem key={`resultItem-${index}`} className="results-action-item">
              <CFormCheck
                disabled={!!isDisabled}
                checked={isSelected}
                key={`resultItemCheck-${index}`}
                id={resultItem}
                value={resultItem}
                label={resultItem}
                onChange={onResultSelectHandler}
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
                <strong>Cue & Result</strong>
              </div>

              <CButton onClick={() => setVisible(!isVisible)} variant="ghost">
                <CIcon icon={cilChevronBottom} height={24}></CIcon>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDER CUE AND RESULT CARDS */}
                    {renderCueCard()}
                    {renderResultCard()}
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

export default CueAndResultSection;
