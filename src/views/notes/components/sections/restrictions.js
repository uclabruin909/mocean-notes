import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CBadge,
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
  standardizeWord,
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
      <CListGroup className="flex-grow-1 restriction-item-container" key={categoryKey}>
        <CListGroupItem active className={`header-item ${isDifferentCategory ? 'disabled' : ''}`}>
          {standardizeWord(categoryKey)}
        </CListGroupItem>
        {restrictions.map((restrictionItem, index) => {
          const isSelected = selectedRestriction.includes(restrictionItem) && !isDifferentCategory;
          const isDisabled = isDifferentCategory || (atMaxSelection && !isSelected);

          return (
            <CListGroupItem
              key={index}
              className={`restriction-item ${isDisabled ? 'disabled' : ''}`}
            >
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
      <CRow className="root-section-row">
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="section-card-header d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span>
                  Select <strong>{minSelection}</strong> restriction from the body category selected
                  in the above dropdown (joint, muscle, nerve, etc). All other categories will be
                  disabled.
                </span>
              </div>

              {isCompleted ? (
                <CBadge color="success">COMPLETED</CBadge>
              ) : (
                <CBadge color="warning">INCOMPLETE</CBadge>
              )}
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
