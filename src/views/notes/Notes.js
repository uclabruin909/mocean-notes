import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CContainer,
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
import { cilCheckCircle, cilChevronBottom, cilChevronTop } from '@coreui/icons';
import NotesService from '../../services/notesService';

import { NotesHeader, NotesSidebar } from './components/index';
import './styles.scss';

const restrictionsConfig = NotesService.getRestrictions();

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
            />
          </CListGroupItem>
        );
      })}
    </CListGroup>
  );
};

const Notes = () => {
  const [visible, setVisible] = useState(true);
  const [visibleHorizontal, setVisibleHorizontal] = useState(false);
  const [visibleA, setVisibleA] = useState(false);
  const [visibleB, setVisibleB] = useState(false);

  const selectedBodyPart = useSelector((state) => state.selectedBodyPart);
  const selectedBodyCategory = useSelector((state) => state.selectedBodyCategory);

  return (
    <React.Fragment>
      {/* Restrictions */}
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
                  <CCardBody
                    className="d-md-flex align-items-center gap-2"
                    style={{ flexWrap: 'wrap' }}
                  >
                    {renderRestrictionsByKey(restrictionsConfig, 'muscle', 'joint')}
                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          disabled
                          id="flexCheckDefault"
                          value="disabled"
                          label="disabled"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>

                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>

                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Manual: Treatment and purpose.  Pick 1 from each category (joint, muscle, nerve*/}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span>
                  <CIcon icon={cilCheckCircle} height={14} customClassName="note-card-icon"></CIcon>
                </span>

                <strong>Manual</strong>
              </div>

              <CButton onClick={() => setVisible(!visible)} variant="ghost">
                <CIcon icon={cilChevronBottom} height={24}></CIcon>
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={visible}>
                <CCard className="mt-1">
                  <CCardBody
                    className="d-md-flex align-items-center gap-2"
                    style={{ flexWrap: 'wrap' }}
                  >
                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          disabled
                          id="flexCheckDefault"
                          value="disabled"
                          label="disabled"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>

                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>
                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>
                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>
                    <CListGroup className="flex-grow-1">
                      <CListGroupItem active>Joint Action</CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                      <CListGroupItem>
                        <CFormCheck
                          id="flexCheckDefault"
                          value="hyper-mobility"
                          label="hyper-mobility"
                        />
                      </CListGroupItem>
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Therex Purpose: Pick 2 or 3*/}

      {/* Movement: Quality of Movement, types of Movement quality and Movement task (pick 2 or 3 tasks) */}

      {/* Cues and Results: Type of cue used by Provider and the Results */}
    </React.Fragment>
  );
};

const NotesView = () => {
  const [bodyPartCategory, updateBodyPartCategory] = useState(undefined);
  const [bodyPartSpecific, updateBodySpecific] = useState(undefined);

  return (
    <div>
      <NotesSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <NotesHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <Notes bodyParts />
          </CContainer>
        </div>
      </div>
    </div>
  );
};

export default NotesView;
