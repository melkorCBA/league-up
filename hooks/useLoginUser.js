import { useStore } from "../contexts/storeContext";

const useLoginUser = () => {
  const { store } = useStore();
  const { isLogin, currentUser } = store;
  const showForLoggedInUser = (prop) => {
    if (!isLogin) return "";
    return prop;
  };
  const showForNotLoggedInUser = (prop) => {
    if (isLogin) return "";
    return prop;
  };

  return {
    isLogin,
    currentUser,
    showForLoggedInUser,
    showForNotLoggedInUser,
  };
};

export default useLoginUser;
