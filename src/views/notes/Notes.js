import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';
import StoreService from 'src/services/storeService';
import { NotesHeader, NotesSidebar } from './components/index';
import OffScreen from './components/OffScreen';
import AppModal from './components/AppModal';
import Restrictions from './components/sections/restrictions';
import ManualSection from './components/sections/manual';
import MovementSection from './components/sections/movement';
import TherexPuposeSection from './components/sections/therexPurpose';
import CueAndResultSection from './components/sections/cueAndResult';
import './styles.scss';

const Notes = () => {
  const activeTab = useSelector((state) => state.activeTab);

  const setActiveTab = useCallback((newTabNum) => {
    StoreService.updateActiveNotesTab(newTabNum);
  }, []);

  return (
    <React.Fragment>
      <CNav variant="tabs" role="tablist" className="notes-section-nav">
        <CNavItem role="presentation" className="section-nav-item">
          <CNavLink
            active={activeTab === 1}
            component="button"
            role="tab"
            aria-controls="restriction-tab-pane"
            aria-selected={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Restriction
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation" className="section-nav-item">
          <CNavLink
            active={activeTab === 2}
            component="button"
            role="tab"
            aria-controls="manual-tab-pane"
            aria-selected={activeTab === 2}
            onClick={() => setActiveTab(2)}
          >
            Manual Actions
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation" className="section-nav-item">
          <CNavLink
            active={activeTab === 3}
            component="button"
            role="tab"
            aria-controls="therex-tab-pane"
            aria-selected={activeTab === 3}
            onClick={() => setActiveTab(3)}
          >
            Therex Purpose
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation" className="section-nav-item">
          <CNavLink
            active={activeTab === 4}
            component="button"
            role="tab"
            aria-controls="movement-tab-pane"
            aria-selected={activeTab === 4}
            onClick={() => setActiveTab(4)}
          >
            Movement
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation" className="section-nav-item">
          <CNavLink
            active={activeTab === 5}
            component="button"
            role="tab"
            aria-controls="cue-result-tab-pane"
            aria-selected={activeTab === 5}
            onClick={() => setActiveTab(5)}
          >
            Cue & Result
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className="notes-content-wrapper">
        {/* RESTRICTION SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="restriction-tab-pane" visible={activeTab === 1}>
          <Restrictions />
        </CTabPane>
        {/* MANUAL SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="manual-tab-pane" visible={activeTab === 2}>
          <ManualSection />
        </CTabPane>
        {/* THEREX SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="therex-tab-pane" visible={activeTab === 3}>
          <TherexPuposeSection />
        </CTabPane>
        {/* MOVEMENT SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="movement-tab-pane" visible={activeTab === 4}>
          <MovementSection />
        </CTabPane>
        {/* CUE & RESULT SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="cue-result-tab-pane" visible={activeTab === 5}>
          <CueAndResultSection />
        </CTabPane>
      </CTabContent>
    </React.Fragment>
  );
};

const NotesView = () => {
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
      <OffScreen />
      <AppModal />
    </div>
  );
};

export default NotesView;
