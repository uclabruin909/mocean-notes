import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CRow, CCol, CCard, CFormCheck, CTooltip, CFormSelect, CFormSwitch } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';

import NotesService from '../../../services/notesService';

const selectPlaceHolderValue = 'placeholder';
const bodyPartsList = NotesService.getBodyParts() || [];

const NotesSecondaryHeader = () => {
  const dispatch = useDispatch();
  const bodyPartsSelectOptions = bodyPartsList.reduce(
    (list, item) => {
      list.push({ label: item, value: item });
      return list;
    },
    [{ label: 'Select a Body Part', value: selectPlaceHolderValue }],
  );
  const [bodyCategorySelectOptions, setBodyCategorySelectOptions] = useState([]);

  // Body Selections
  const selectedBodyPart = useSelector((state) => state.selectedBodyPart);
  const [selectedBodyCategory, setBodyCategory] = useState(undefined);

  // Event Handlers
  const onBodyPartSelect = (evt) => {
    // if the selected value is the placeholder, update to undefined
    const selectValue = evt.target.value !== selectPlaceHolderValue ? evt.target.value : undefined;

    if (selectValue !== selectedBodyPart) {
      dispatch({ type: 'set', selectedBodyPart: selectValue });
    }
  };

  // if selectedBodyPart has been selected, update body cateogy selection options based on new body part.
  useEffect(() => {
    // If undefined, reset search options for category and specific dropdown
    if (!selectedBodyPart) {
      setBodyCategorySelectOptions([]);
    }

    if (selectedBodyPart) {
      const categoriesForBodyPart = NotesService.getBodyPartCategories(selectedBodyPart);

      const bodyCategorySelectOptions = categoriesForBodyPart.reduce(
        (list, item) => {
          list.push({ label: item, value: item });
          return list;
        },
        [{ label: 'Select a Category', value: selectPlaceHolderValue }],
      );

      setBodyCategorySelectOptions(bodyCategorySelectOptions);
    }
  }, [selectedBodyPart]);

  return (
    <div className="flex-grow-1">
      <CRow className="justify-content-between align-items-center d-sm-flex">
        <CCol sm={4} className="d-sm-flex align-items-center gap-2">
          <span>
            <CIcon className="text-success" icon={cilCheckCircle} aria-hidden height={14}></CIcon>
          </span>
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
              disabled={!bodyCategorySelectOptions.length}
              size="md"
              className=""
              aria-label="Body Category"
              options={bodyCategorySelectOptions}
            ></CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={3}>
          <CCard>
            <CFormSelect size="md" className="" aria-label="Specific">
              <option>Specific</option>
              <option value="1">Thorasic</option>
              <option value="2">Shoulder</option>
              <option value="3">Legs</option>/
            </CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={2} className="align-items-center" style={{ textAlign: 'center' }}>
          <strong style={{ marginRight: '8px' }}>Auto Generate</strong>
          <CTooltip
            content="After body part is selected, you can enable the note to be auto-generated."
            placement="left"
          >
            <CFormSwitch id="formSwitchCheckChecked" defaultChecked />
          </CTooltip>
        </CCol>
      </CRow>
    </div>
  );
};

export default React.memo(NotesSecondaryHeader);
