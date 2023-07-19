import React, { useState } from 'react';
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
import { DocsExample } from 'src/components';

import { NotesHeader, NotesSidebar } from './components/index';
import './styles.scss';

const Notes = () => {
  const [visible, setVisible] = useState(true);
  const [visibleHorizontal, setVisibleHorizontal] = useState(false);
  const [visibleA, setVisibleA] = useState(false);
  const [visibleB, setVisibleB] = useState(false);

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
                  <CCardBody className="d-flex align-items-center gap-2">
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
              <strong>Manual</strong>
              <CButton onClick={() => setVisible(!visible)}>Close</CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={visible}>
                <CCard className="mt-1">
                  <CCardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident.
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Therex Purpose: Pick 2 or 3*/}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Therex Purpose</strong>
              <CButton onClick={() => setVisible(!visible)}>Close</CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={visible}>
                <CCard className="mt-1">
                  <CCardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident.
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Movement: Quality of Movement, types of Movement quality and Movement task (pick 2 or 3 tasks) */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Movment</strong>
              <CButton onClick={() => setVisible(!visible)}>Close</CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={visible}>
                <CCard className="mt-1">
                  <CCardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident.
                  </CCardBody>
                </CCard>
              </CCollapse>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Cues and Results: Type of cue used by Provider and the Results */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <strong>Cues & Results</strong>
              <CButton onClick={() => setVisible(!visible)}>Close</CButton>
            </CCardHeader>
            <CCardBody>
              <CCollapse visible={visible}>
                <CCard className="mt-1">
                  <CCardBody>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident.
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

const NotesView = () => {
  const [autoGenerateIsEnabled, updateAutoGenerate] = useState(false);

  const [bodyPartBase, updaateBodyPartBase] = useState(undefined);
  const [bodyPartCategory, updaateBodyPartCategory] = useState(undefined);
  const [bodyPartSpecific, updaateBodySpecific] = useState(undefined);

  return (
    <div>
      <NotesSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <NotesHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <Notes />
          </CContainer>
        </div>
      </div>
    </div>
  );
};

export default NotesView;
