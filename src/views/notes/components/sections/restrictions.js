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

import { UPDATE_RESTRICTION_SELECTION } from '../../../../constants/actions';
import {
  getRestrictionsConfig,
  getRestrictionCategories,
  getRestrictionSelectionRange,
} from './utils';
import './restrictions.scss';

const { minSelection = 1, maxSelection = 1 } = getRestrictionSelectionRange();
const restrictionsConfig = getRestrictionsConfig();
const restrictionCategories = getRestrictionCategories();

const Restrictions = () => {
  const dispatch = useDispatch();

  const selectedBodyCategory = useSelector((state) => state.selectedBodyCategory);
  const selectedRestriction = useSelector((state) => state.selectedRestriction);

  const [isVisible, setVisible] = useState(true);
  const [isCompleted, setCompleted] = useState(selectedRestriction.length >= minSelection);

  const updateSelectedRestriction = useCallback(
    (newSelectedRestriction = []) => {
      dispatch({
        type: UPDATE_RESTRICTION_SELECTION,
        selectedRestriction: newSelectedRestriction,
      });
    },
    [dispatch],
  );
  const onChangeHandler = (evt) => {
    const { value, checked } = evt.target;
    const canAdd = selectedRestriction.length < maxSelection;

    let selectionList = [...selectedRestriction];
    // add selection if checked
    if (checked && canAdd) {
      selectionList.push(value);
    } else {
      selectionList = selectionList.filter((item) => item !== value);
    }

    updateSelectedRestriction(selectionList);
  };

  useEffect(() => {
    console.log('selectedRestriction has updated:', selectedRestriction);
    const isCompleted = selectedRestriction.length >= minSelection;
    setCompleted(isCompleted);
  }, [selectedRestriction]);

  useEffect(() => {
    updateSelectedRestriction([]);
  }, [selectedBodyCategory, updateSelectedRestriction]);

  // helper render function to render restrictions for a particular category key i.e. joints
  const renderRestrictionsByKey = (restrictionsObject, categoryKey, selectedCategory) => {
    const restrictions = restrictionsObject[categoryKey];
    // category is different from the selected body category
    const isDifferentCategory = categoryKey !== selectedCategory;
    const atMaxSelection = selectedRestriction.length === maxSelection;

    return (
      <CListGroup className="flex-grow-1 restriction-item-container">
        <CListGroupItem active>{categoryKey}</CListGroupItem>
        {restrictions.map((restrictionItem, index) => {
          const isSelected = selectedRestriction.includes(restrictionItem) && !isDifferentCategory;
          const isDisabled = isDifferentCategory || (atMaxSelection && !isSelected);

          return (
            <CListGroupItem key={index} className="restriction-item">
              <CFormCheck
                disabled={!!isDisabled}
                checked={isSelected}
                key={restrictionItem}
                id={restrictionItem}
                value={restrictionItem}
                label={restrictionItem}
                onChange={onChangeHandler}
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
                <strong>Restriction</strong>
              </div>

              <CButton onClick={() => setVisible(!isVisible)} variant="ghost">
                <CIcon icon={cilChevronBottom} height={24}></CIcon>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={isVisible}>
                <CCard className="mt-1">
                  <CCardBody className="d-md-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {/* RENDERING RESTRICTIONS CARDS */}

                    {restrictionCategories.map((category) => {
                      return renderRestrictionsByKey(
                        restrictionsConfig,
                        category,
                        selectedBodyCategory,
                      );
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

export default Restrictions;
