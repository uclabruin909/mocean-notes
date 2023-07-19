import React from 'react';

import { CRow, CCol, CCard, CFormCheck, CTooltip, CFormSelect, CFormSwitch } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheckCircle } from '@coreui/icons';

const NotesSecondaryHeader = () => {
  return (
    <div className="flex-grow-1">
      <CRow className="justify-content-between align-items-center d-sm-flex">
        <CCol sm={4} className="d-sm-flex align-items-center gap-2">
          <span>
            <CIcon className="text-success" icon={cilCheckCircle} aria-hidden height={14}></CIcon>
          </span>
          <CCard className="flex-grow-1">
            <CFormSelect size="md" className="" aria-label="Body Part">
              <option>Select a body part</option>
              <option value="1">Thorasic</option>
              <option value="2">Shoulder</option>
              <option value="3">Legs</option>/
            </CFormSelect>
          </CCard>
        </CCol>
        <CCol sm={3}>
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
