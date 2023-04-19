import { ACTIONS, useStore } from "../contexts/storeContext";

const useModal = (identifier) => {
  const { store, dispatch } = useStore();

  const open = () => {
    dispatch({ type: ACTIONS.OpenModal, payload: { identifier } });
  };
  const close = () => {
    dispatch({ type: ACTIONS.CloseModal, payload: { identifier } });
  };

  const setData = (data) => {
    dispatch({ type: ACTIONS.SetModalData, payload: { identifier, data } });
  };
  const getData = () => {
    return store.modals[identifier].data;
  };

  const setLoading = (isLoading) => {
    dispatch({
      type: ACTIONS.SetModalLoadingStatus,
      payload: { identifier, isLoading },
    });
  };

  return {
    open,
    close,
    setData,
    getData,
    setLoading,
    modal: store.modals[identifier],
  };
};
export default useModal;
