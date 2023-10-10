import React, { useState } from 'react';
import { CContainer, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';

import { NotesHeader, NotesSidebar } from './components/index';
import Restrictions from './components/sections/restrictions';
import ManualSection from './components/sections/manual';
import MovementSection from './components/sections/movement';
import TherexPuposeSection from './components/sections/therexPurpose';
import './styles.scss';

const Notes = () => {
  const [activeTabKey, setActiveTabKey] = useState(1);

  return (
    <React.Fragment>
      <CNav variant="tabs" role="tablist">
        <CNavItem role="presentation">
          <CNavLink
            active={activeTabKey === 1}
            component="button"
            role="tab"
            aria-controls="restriction-tab-pane"
            aria-selected={activeTabKey === 1}
            onClick={() => setActiveTabKey(1)}
          >
            Restriction
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation">
          <CNavLink
            active={activeTabKey === 2}
            component="button"
            role="tab"
            aria-controls="manual-tab-pane"
            aria-selected={activeTabKey === 2}
            onClick={() => setActiveTabKey(2)}
          >
            Manual Actions
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation">
          <CNavLink
            active={activeTabKey === 3}
            component="button"
            role="tab"
            aria-controls="therex-tab-pane"
            aria-selected={activeTabKey === 3}
            onClick={() => setActiveTabKey(3)}
          >
            Therex Purpose
          </CNavLink>
        </CNavItem>
        <CNavItem role="presentation">
          <CNavLink
            active={activeTabKey === 4}
            component="button"
            role="tab"
            aria-controls="movement-tab-pane"
            aria-selected={activeTabKey === 4}
            onClick={() => setActiveTabKey(4)}
          >
            Movement
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        {/* RESTRICTION SECTION */}
        <CTabPane
          role="tabpanel"
          aria-labelledby="restriction-tab-pane"
          visible={activeTabKey === 1}
        >
          <Restrictions />
        </CTabPane>
        {/* MANUAL SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="manual-tab-pane" visible={activeTabKey === 2}>
          <ManualSection />
        </CTabPane>
        {/* THEREX SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="therex-tab-pane" visible={activeTabKey === 3}>
          <TherexPuposeSection />
        </CTabPane>
        {/* MOVEMENT SECTION */}
        <CTabPane role="tabpanel" aria-labelledby="movement-tab-pane" visible={activeTabKey === 4}>
          <MovementSection />
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
    </div>
  );
};

export default NotesView;
