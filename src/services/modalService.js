import StoreService from './storeService';
import { UPDATE_MODAL_STATE } from 'src/constants/actions';

const defaultModalOptions = {
  isVisible: true,
  title: 'Default title',
  bodyText: 'Body Text',
  primaryBtnText: 'OK',
  primaryBtnCb: undefined,
  secondaryBtnText: undefined,
  secondaryBtnCb: undefined,
};

class ModalServiceClass {
  showModal(options) {
    const modalOptions = {
      ...defaultModalOptions,
      ...options,
      isVisible: true,
    };
    StoreService.dispatchAction({
      type: UPDATE_MODAL_STATE,
      modalState: {
        ...modalOptions,
      },
    });
  }

  closeModal() {
    const modalOptions = {
      ...defaultModalOptions,
      isVisible: false,
    };
    StoreService.dispatchAction({
      type: UPDATE_MODAL_STATE,
      modalState: {
        ...modalOptions,
      },
    });
  }

  updateModalOptions(options) {
    const modalOptions = {
      ...defaultModalOptions,
      ...options,
    };
    StoreService.dispatchAction({
      type: UPDATE_MODAL_STATE,
      modalState: {
        ...modalOptions,
      },
    });
  }
}

const ModalService = new ModalServiceClass();
export default ModalService;
