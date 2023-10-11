import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CFormTextarea,
} from '@coreui/react';

import NotesService from 'src/services/notesService';
import { UPDATE_OFFCANVAS_VISIBILITY } from 'src/constants/actions';
import './OffScreen.scss';

const OffScreen = () => {
  const dispatch = useDispatch();

  const updateVisibility = (visibility) => {
    dispatch({
      type: UPDATE_OFFCANVAS_VISIBILITY,
      visibility,
    });
  };

  const lastModifiedText = () => {
    if (lastGeneratedNoteTimestamp) {
      return new Date(lastGeneratedNoteTimestamp).toISOString();
    }

    return '';
  };

  const isOffCanvasVisible = useSelector((state) => state.isOffCanvasVisible);
  const lastGeneratedNoteTimestamp = useSelector((state) => state.lastGeneratedNoteTimestamp);

  const [textValue, setTextValue] = useState(' ');

  useEffect(() => {
    const newestGeneratedNote = NotesService.getMostRecentNotes();

    if (newestGeneratedNote) {
      setTextValue(newestGeneratedNote);
    }
  }, [lastGeneratedNoteTimestamp]);

  return (
    <COffcanvas
      id="off-canvas-wrapper"
      placement="end"
      visible={isOffCanvasVisible}
      onHide={() => updateVisibility(false)}
    >
      <COffcanvasHeader>
        <COffcanvasTitle>Note Editor</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={() => updateVisibility(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <CFormTextarea
          id="notes-text-area-id"
          className="notes-text-area"
          rows={14}
          value={textValue}
          text={`Created on: ${lastModifiedText()}`}
        ></CFormTextarea>
      </COffcanvasBody>
    </COffcanvas>
  );
};

export default React.memo(OffScreen);
