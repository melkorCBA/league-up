import { ACTIONS, useStore } from "../contexts/storeContext";

const useModal = () => {
  const { store, dispatch } = useStore();
  const open = (identifier) => {
    dispatch({ type: ACTIONS.OpenModal, payload: { identifier } });
  };
  const close = (identifier) => {
    dispatch({ type: ACTIONS.CloseModal, payload: { identifier } });
  };

  return {
    open,
    close,
    modals: store.modals,
  };
};
export default useModal;
