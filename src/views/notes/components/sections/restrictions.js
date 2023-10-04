import React, { useState } from 'react';
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

import NotesService from '../../../../services/notesService';
import './restrictions.scss';

const restrictionsConfig = NotesService.getRestrictions();
const restrictionCategories = NotesService.getRestrictionCategories();

// helper render function to render restrictions for a particular category key i.e. joints
const renderRestrictionsByKey = (restrictionsObject, categoryKey, selectedCategory) => {
  const restrictions = restrictionsObject[categoryKey];
  const disabled = categoryKey !== selectedCategory;

  return (
    <CListGroup className="flex-grow-1">
      <CListGroupItem active>{categoryKey}</CListGroupItem>
      {restrictions.map((restrictionItem, index) => {
        return (
          <CListGroupItem key={index}>
            <CFormCheck
              disabled={!!disabled}
              key={restrictionItem}
              id={restrictionItem}
              value={restrictionItem}
              label={restrictionItem}
              onChange={(evt) => console.log('evt', evt.target.checked)}
            />
          </CListGroupItem>
        );
      })}
    </CListGroup>
  );
};

const Restrictions = () => {
  const [visible, setVisible] = useState(true);

  const selectedBodyCategory = useSelector((state) => state.selectedBodyCategory);

  return (
    <React.Fragment>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span>
                  <CIcon icon={cilCheckCircle} height={14} customClassName="note-card-icon"></CIcon>
                </span>

                <strong>Restriction</strong>
              </div>

              <CButton onClick={() => setVisible(!visible)} variant="ghost">
                <CIcon icon={cilChevronBottom} height={24}></CIcon>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={visible}>
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
