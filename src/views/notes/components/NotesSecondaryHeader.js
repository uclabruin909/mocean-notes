import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CRow, CCol, CCard, CFormSelect, CInputGroup, CInputGroupText } from '@coreui/react';
import { cilCheckCircle } from '@coreui/icons';

import BodyConfigService from 'src/services/bodyConfigService';
import * as ACTIONS from 'src/constants/actions';

import './NotesSecondaryHeader.scss';

// util function to create select options
const createSelectionOptions = (list, placeHolderText) => {
  return list.reduce(
    (arr, item) => {
      arr.push({ label: item, value: item });
      return arr;
    },
    [{ label: `${placeHolderText}`, value: selectPlaceHolderValue }],
  );
};
const selectPlaceHolderValue = 'placeholder';
const bodyPartsList = BodyConfigService.getBodyParts() || [];
const initialBodyPartOptions = createSelectionOptions(bodyPartsList, '1. Select a Body Part');

const NotesSecondaryHeader = () => {
  const dispatch = useDispatch();

  const [bodyPartsSelectOptions, setBodyPartsSelectOptions] = useState([initialBodyPartOptions]);
  const [bodyCategorySelectOptions, setBodyCategorySelectOptions] = useState([]);
  const [bodySpecificSelectOptions, setBodySpecificSelectOptions] = useState([]);

  // Body Selections
  const selectedBodyPart = useSelector((state) => state.selectedBodyPart);
  const selectedBodyCategory = useSelector((state) => state.selectedBodyCategory);
  const selectedBodySpecific = useSelector((state) => state.selectedBodySpecific);
  const isBodyPartSelectionComplete = useSelector((state) => state.isBodyPartSelectionComplete);
  const isAutoGenerationEnabled = useSelector((state) => state.isAutoGenerationEnabled);

  // Event Handlers
  const onBodyPartSelect = (evt) => {
    const { value } = evt.target;
    // if the selected value is the placeholder, update to undefined
    const selectValue = value !== selectPlaceHolderValue ? value : undefined;

    if (selectValue !== selectedBodyPart) {
      dispatch({
        type: ACTIONS.SET_BODY_SELECTION,
        selectedBodyPart: selectValue,
        selectedBodyCategory: undefined,
        selectedBodySpecific: undefined,
      });
    }
  };

  const onBodyCategorySelect = (evt) => {
    const { value } = evt.target;
    // if the selected value is the placeholder, update to undefined
    const selectValue = value !== selectPlaceHolderValue ? value : undefined;

    if (selectValue !== selectedBodyCategory) {
      dispatch({
        type: ACTIONS.SET_BODY_SELECTION,
        selectedBodyCategory: selectValue,
        selectedBodySpecific: undefined,
      });
    }
  };

  const onBodySpecificSelect = (evt) => {
    const { value } = evt.target;
    // if the selected value is the placeholder, update to undefined
    const selectValue = value !== selectPlaceHolderValue ? value : undefined;

    if (selectValue !== selectedBodySpecific) {
      dispatch({ type: ACTIONS.SET_BODY_SELECTION, selectedBodySpecific: selectValue });
    }
  };

  const onAutoGenerateToggle = (evt) => {
    const enableAutoGeneration = evt.target.value === 'on' ? true : false;
    dispatch({ type: 'set', isAutoGenerationEnabled: enableAutoGeneration });
  };

  // if selectedBodyPart has been selected, update body cateogy selection options based on new body part.
  useEffect(() => {
    // If undefined, reset search options for category and specific dropdown
    if (!selectedBodyPart) {
      setBodyPartsSelectOptions(initialBodyPartOptions);
      setBodyCategorySelectOptions(createSelectionOptions([], '2. Select a Category'));
    } else {
      const categoriesForBodyPart = BodyConfigService.getBodyPartCategories(selectedBodyPart);

      const bodyCategorySelectOptions = createSelectionOptions(
        categoriesForBodyPart,
        '2. Select a Category',
      );

      setBodyCategorySelectOptions(bodyCategorySelectOptions);
    }
  }, [selectedBodyPart]);

  // if selectedBodyPart has been selected, update body cateogy selection options based on new body part.
  useEffect(() => {
    // If undefined, reset search options for category and specific dropdown
    if (!selectedBodyCategory) {
      setBodySpecificSelectOptions(createSelectionOptions([], '3. Select specific'));
    }

    if (selectedBodyPart && selectedBodyCategory) {
      const specificsForBodyPart = BodyConfigService.getBodyPartSpecifics(
        selectedBodyPart,
        selectedBodyCategory,
      );
      const bodySpecificSelectOptions = createSelectionOptions(
        specificsForBodyPart,
        '3. Select specific',
      );

      setBodySpecificSelectOptions(bodySpecificSelectOptions);
    }
  }, [selectedBodyCategory, selectedBodyPart]);

  console.log('selectedBodyPart:', selectedBodyPart);
  console.log('selectedBodyCategory:', selectedBodyCategory);
  console.log('selectedBodySpecific:', selectedBodySpecific);
  console.log('isBodyPartSelectionComplete:', isBodyPartSelectionComplete);

  // Render helper methods
  const getSelectClassName = (active = false) => {
    return `body-select-dropdown ${active ? 'active' : ''}`;
  };

  return (
    <div className="notes-secondary-header flex-grow-1">
      <CRow className="justify-content-between align-items-center d-sm-flex">
        <CCol sm={4} className="d-sm-flex align-items-center gap-2">
          {/* <span>
            <CIcon
              className={isBodyPartSelectionComplete ? 'text-success' : 'text-failure'}
              icon={cilCheckCircle}
              aria-hidden
              height={14}
            ></CIcon>
          </span> */}
          {/* <CBadge color={isBodyPartSelectionComplete ? 'success' : 'light'} shape="rounded-pill">
            OK
          </CBadge> */}

          {/* BodyParts Select Dropdown */}
          <CCard className="flex-grow-1">
            <CInputGroup>
              {!!selectedBodyPart && (
                <CInputGroupText component="label" htmlFor="body-part-select">
                  Body Part:
                </CInputGroupText>
              )}
              <CFormSelect
                id="body-part-select"
                size="md"
                aria-label="Body Part"
                className={getSelectClassName(!selectedBodyPart)}
                options={bodyPartsSelectOptions}
                onChange={onBodyPartSelect}
                value={!!selectedBodyPart ? selectedBodyPart : selectPlaceHolderValue}
              />
            </CInputGroup>
          </CCard>
        </CCol>
        <CCol sm={4}>
          {/* Body Category Select Dropdown */}
          <CCard>
            <CInputGroup>
              {!!selectedBodyCategory && (
                <CInputGroupText component="label" htmlFor="body-category-select">
                  Category:
                </CInputGroupText>
              )}
              <CFormSelect
                id="body-category-select"
                disabled={!selectedBodyPart}
                size="md"
                aria-label="Body Category"
                className={getSelectClassName(!selectedBodyPart && selectedBodyCategory)}
                options={bodyCategorySelectOptions}
                onChange={onBodyCategorySelect}
                value={!!selectedBodyCategory ? selectedBodyCategory : selectPlaceHolderValue}
              ></CFormSelect>
            </CInputGroup>
          </CCard>
        </CCol>
        <CCol sm={4}>
          {/* Body Specific Select Dropdown */}
          <CCard>
            <CInputGroup>
              {!!selectedBodySpecific && (
                <CInputGroupText component="label" htmlFor="body-specific-select">
                  Specific:
                </CInputGroupText>
              )}
              <CFormSelect
                id="body-specific-select"
                disabled={!selectedBodyCategory}
                size="md"
                className={getSelectClassName(!selectedBodyCategory && selectedBodySpecific)}
                aria-label="Specific"
                options={bodySpecificSelectOptions}
                onChange={onBodySpecificSelect}
                value={!!selectedBodySpecific ? selectedBodySpecific : selectPlaceHolderValue}
              ></CFormSelect>
            </CInputGroup>
          </CCard>
        </CCol>
        {/* <CCol sm={2} className="align-items-center" style={{ textAlign: 'center' }}>
          <strong style={{ marginRight: '8px' }}>Auto Generate</strong>
          <CTooltip
            content="After body part is selected, you can enable the note to be auto-generated."
            placement="left"
          >
            <CFormSwitch
              id="formSwitchCheckChecked"
              onChange={onAutoGenerateToggle}
              defaultChecked={isAutoGenerationEnabled}
            />
          </CTooltip>
        </CCol> */}
      </CRow>
    </div>
  );
};

export default NotesSecondaryHeader;
