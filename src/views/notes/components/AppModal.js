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

const AppModal = () => {
  const dispatch = useDispatch();

  const updateModalVisibility = (visibility) => {
    dispatch({
      type: UPDATE_MODAL_VISIBILITY,
      visibility,
    });
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

  const primaryBtnOnClick = primaryBtnCb || hideModal;
  const secondaryBtnOnClick = secondaryBtnCb || hideModal;
  const shouldRenderSecondaryBtn = secondaryBtnText && !!secondaryBtnText.length;

  return (
    <CModal alignment="center" visible={isVisible} onClose={hideModal}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{bodyText}</CModalBody>
      <CModalFooter>
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
