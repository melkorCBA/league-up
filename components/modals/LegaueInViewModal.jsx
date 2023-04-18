import React, { useCallback, useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { ACTIONS, useStore } from "../../contexts/storeContext";
import { matchService, userService } from "../../services/api-service";
import DropdownSelect from "../shared/DropdownSelect";
import useModal from "../../hooks/useModal";

userService;

const LegaueInViewModal = () => {
  const { store } = useStore();
  const { modal, setData } = useModal("UserDashboardModal");
  const { leagues } = store;

  const setFromFields = (fields) => {
    setData({
      ...modal.data,
      form: {
        ...modal.data?.form,
        ...fields,
      },
    });
  };

  const getFromField = (filed) => {
    return modal.data?.form[filed];
  };

  const intFrom = async () => {
    const { _id: leagueId } = store.leagueInView;
    const matches = await matchService.getMatchesForLeague(leagueId);
    setFromFields({ matches, leagueInView: store.leagueInView });
  };

  const update = () => {};
  const onClose = () => {};
  const onOpen = () => {
    intFrom();
  };
  return (
    <>
      <Modal
        onOpen={onOpen}
        onClose={onClose}
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
                  value={getFromField("leagueInView")}
                  items={leagues}
                  onChange={(item) => setFromFields({ leagueInView: item })}
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
