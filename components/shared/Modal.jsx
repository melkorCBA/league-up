import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ACTIONS, useStore } from "../../contexts/storeContext";
import useModal from "../../hooks/useModal";

const Portal = ({ children, containerId, onClose, onOpen }) => {
  const [container, setContainer] = useState(null);
  const getModalContainer = (containerId) => {
    if (document.getElementById(containerId))
      return document.getElementById(containerId);
    const container = document.createElement("div");
    container.setAttribute("id", containerId);
    document.body.appendChild(container);
    return container;
  };
  useEffect(() => {
    if (onOpen) onOpen();
    return () => {
      if (onClose) onClose();
    };
  }, []);
  useLayoutEffect(() => {
    const hostContainer = getModalContainer(containerId);
    setContainer(hostContainer);

    return () => {
      if (hostContainer && hostContainer?.parentNode) {
        hostContainer.parentNode.removeChild(hostContainer);
      }
    };
  }, [containerId]);

  if (!container) return null;
  return createPortal(children, container);
};

const Modal = ({ identifier, Header, Body, Buttons, onClose, onOpen }) => {
  const { modal, close } = useModal(identifier);

  const onBackdropClick = ({ target: element }) => {
    if (element && element.classList.contains("modal-container")) {
      close(identifier);
    }
  };

  if (!modal || !modal.status) return null;
  if (modal.isLoading)
    return (
      <Portal containerId="portal-modal-container">
        <div className="modal-container">
          <div className="modal-content">
            <div className="d-flex justify-content-center  align-items-center">
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    );
  return (
    <Portal
      containerId="portal-modal-container"
      onClose={onClose}
      onOpen={onOpen}
    >
      <div className="modal-container" onClick={onBackdropClick}>
        <div className="modal-content">
          <div className="modal-header pb-2 mb-2 px-1">
            <Header />
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => close(identifier)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body px-1 py-4">
            <Body />
          </div>
          <div className="modal-footer px-1">
            <Buttons />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
