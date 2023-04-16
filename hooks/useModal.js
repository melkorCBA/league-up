import { ACTIONS, useStore } from "../contexts/storeContext";

const useModal = () => {
  const { dispatch } = useStore();
  const open = (identifier) => {
    dispatch({ type: ACTIONS.OpenModal, payload: { identifier } });
  };
  const close = () => {
    dispatch({ type: ACTIONS.CloseModal });
  };

  return {
    open,
    close,
  };
};
export default useModal;
