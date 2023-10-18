import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';

import { UPDATE_MODAL_VISIBILITY } from 'src/constants/actions';
import './AppModal.scss';

const AppModal = () => {
  const dispatch = useDispatch();

  const updateModalVisibility = (visibility) => {
    if (visibility === isVisible) {
      return;
    }

    setTimeout(() => {
      dispatch({
        type: UPDATE_MODAL_VISIBILITY,
        visibility,
      });
    }, 1000);
  };

  const hideModal = () => {
    updateModalVisibility(false);
  };

  const isVisible = useSelector((state) => state.modalState.isVisible);
  const title = useSelector((state) => state.modalState.title);
  const bodyText = useSelector((state) => state.modalState.bodyText);
  const primaryBtnText = useSelector((state) => state.modalState.primaryBtnText);
  const primaryBtnCb = useSelector((state) => state.modalState.primaryBtnCb);
  const secondaryBtnText = useSelector((state) => state.modalState.secondaryBtnText);
  const secondaryBtnCb = useSelector((state) => state.modalState.secondaryBtnCb);

  const shouldRenderSecondaryBtn = secondaryBtnText && !!secondaryBtnText.length;

  const primaryBtnOnClick = () => {
    if (primaryBtnCb) {
      primaryBtnCb();
    }

    hideModal();
  };
  const secondaryBtnOnClick = () => {
    if (secondaryBtnCb) {
      secondaryBtnCb();
    }

    hideModal();
  };

  return (
    <CModal
      alignment="center"
      visible={isVisible}
      onClose={hideModal}
      className="app-modal-wrapper"
    >
      <CModalHeader className="modal-header">
        <CModalTitle className="modal-title">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody className="modal-body">{bodyText}</CModalBody>
      <CModalFooter className="modal-footer">
        {shouldRenderSecondaryBtn && (
          <CButton color="secondary" onClick={secondaryBtnOnClick}>
            {secondaryBtnText}
          </CButton>
        )}

        <CButton color="primary" onClick={primaryBtnOnClick}>
          {primaryBtnText || 'Ok'}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default React.memo(AppModal);
