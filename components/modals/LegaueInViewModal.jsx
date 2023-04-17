import React, { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { ACTIONS, useStore } from "../../contexts/storeContext";
import { userService } from "../../services/api-service";
import DropdownSelect from "../shared/DropdownSelect";

userService;

const LegaueInViewModal = () => {
  const { store, dispatch } = useStore();
  const { leagueInView, leagues } = store;
  const [form, setForm] = useState({});
  useEffect(() => {
    setForm({ ...form, leagueInView });
  }, []);
  const updateLeagueInView = (league) => {
    setForm({ ...form, leagueInView: league });
  };
  const update = async () => {
    dispatch({
      type: ACTIONS.SetLeagueInView,
      payload: { leagueInView: league },
    });
    const { _id: leagueId } = store.leagueSelected;
    await userService.updateUserDashboard({ leagueInViewId: leagueId });
  };
  return (
    <>
      <Modal
        identifier="UserDashboardModal"
        Header={() => (
          <div>
            <h4>Update League in View</h4>
          </div>
        )}
        Body={() => (
          <div>
            <div className="row justify-content-center">
              <label className="col-4">League in View:</label>
              <div className="col-6">
                <DropdownSelect
                  id="admin-leagueInView-selector-dropdown"
                  value={form.leagueInView}
                  items={leagues}
                  onChange={(item) => updateLeagueInView(item)}
                  ukey={"_id"}
                  displayKey={"name"}
                />
              </div>
            </div>
          </div>
        )}
        Buttons={() => (
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">Cancel</button>
            <button className="btn btn-secondary" onClick={update}>
              Update
            </button>
          </div>
        )}
      />
    </>
  );
};

export default LegaueInViewModal;
