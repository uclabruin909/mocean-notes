import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CRow,
  CCol,
  CCard,
  CFormCheck,
  CTooltip,
  CFormSelect,
  CFormSwitch,
  CBadge,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';

import NotesService from '../../../services/notesService';
import * as ACTIONS from '../../../constants/actions';

const selectPlaceHolderValue = 'placeholder';
const bodyPartsList = NotesService.getBodyParts() || [];
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

const NotesSecondaryHeader = () => {
  const dispatch = useDispatch();

  const bodyPartsSelectOptions = createSelectionOptions(bodyPartsList, 'Select a Body Part');
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
      dispatch({ type: ACTIONS.SET_BODY_SELECTION, selectedBodyPart: selectValue });
    }
  };

  const onBodyCategorySelect = (evt) => {
    const { value } = evt.target;
    // if the selected value is the placeholder, update to undefined
    const selectValue = value !== selectPlaceHolderValue ? value : undefined;

    if (selectValue !== selectedBodyCategory) {
      dispatch({ type: ACTIONS.SET_BODY_SELECTION, selectedBodyCategory: selectValue });
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
      setBodyCategorySelectOptions([]);
      dispatch({
        type: ACTIONS.SET_BODY_SELECTION,
        selectedBodyCategory: undefined,
        selectedBodySpecific: undefined,
      });
    } else {
      const categoriesForBodyPart = NotesService.getBodyPartCategories(selectedBodyPart);

      const bodyCategorySelectOptions = createSelectionOptions(
        categoriesForBodyPart,
        'Select a Category',
      );

      setBodyCategorySelectOptions(bodyCategorySelectOptions);
    }
  }, [selectedBodyPart]);

  // if selectedBodyPart has been selected, update body cateogy selection options based on new body part.
  useEffect(() => {
    // If undefined, reset search options for category and specific dropdown
    if (!selectedBodyCategory) {
      setBodySpecificSelectOptions([]);
    }

    if (selectedBodyPart && selectedBodyCategory) {
      const specificsForBodyPart = NotesService.getBodyPartSpecifics(
        selectedBodyPart,
        selectedBodyCategory,
      );
      const bodySpecificSelectOptions = createSelectionOptions(
        specificsForBodyPart,
        'Select specific',
      );

      setBodySpecificSelectOptions(bodySpecificSelectOptions);
    }
  }, [selectedBodyCategory]);

  console.log('selectedBodyPart:', selectedBodyPart);
  console.log('selectedBodyCategory:', selectedBodyCategory);
  console.log('selectedBodySpecific:', selectedBodySpecific);
  console.log('isBodyPartSelectionComplete:', isBodyPartSelectionComplete);

  return (
    <div className="flex-grow-1">
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
          <CBadge color={isBodyPartSelectionComplete ? 'success' : 'light'} shape="rounded-pill">
            OK
          </CBadge>
          {/* BodyParts Select Dropdown */}
          <CCard className="flex-grow-1">
            <CFormSelect
              size="md"
              className=""
              aria-label="Body Part"
              options={bodyPartsSelectOptions}
              onChange={onBodyPartSelect}
            ></CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={3}>
          {/* Body Category Select Dropdown */}
          <CCard>
            <CFormSelect
              disabled={!selectedBodyPart}
              size="md"
              className=""
              aria-label="Body Category"
              options={bodyCategorySelectOptions}
              onChange={onBodyCategorySelect}
            ></CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={3}>
          <CCard>
            <CFormSelect
              disabled={!selectedBodyCategory}
              size="md"
              className=""
              aria-label="Specific"
              options={bodySpecificSelectOptions}
              onChange={onBodySpecificSelect}
            ></CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={2} className="align-items-center" style={{ textAlign: 'center' }}>
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
        </CCol>
      </CRow>
    </div>
  );
};

export default NotesSecondaryHeader;
