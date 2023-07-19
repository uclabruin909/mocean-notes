import React from 'react';

import { CRow, CCol, CCard, CProgress, CProgressBar, CFormSelect } from '@coreui/react';

const NotesSecondaryHeader = () => {
  return (
    <div className="flex-grow-1">
      <CRow className="justify-content-between align-items-center">
        <CCol sm={5}>
          <CCard>
            <CFormSelect size="md" className="" aria-label="Body Part">
              <option>Select a body part</option>
              <option value="1">Thorasic</option>
              <option value="2">Shoulder</option>
              <option value="3">Legs</option>/
            </CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={4}>
          <CCard>
            <CFormSelect size="md" className="" aria-label="Body Category">
              <option>Category</option>
              <option value="1">Thorasic</option>
              <option value="2">Shoulder</option>
              <option value="3">Legs</option>/
            </CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={3}>
          <CCard>
            <CProgress color="success" value={25}>
              <CProgressBar>25%</CProgressBar>
            </CProgress>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default React.memo(NotesSecondaryHeader);
