import React, { useCallback, useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { ACTIONS, useStore } from "../../contexts/storeContext";
import {
  dashboardService,
  matchService,
  userService,
} from "../../services/api-service";
import DropdownSelect from "../shared/DropdownSelect";
import useModal from "../../hooks/useModal";
import useLoading from "../../hooks/useLoading";

userService;

const LegaueInViewModal = () => {
  const { store, dispatch } = useStore();
  const { modal, setData, close, setLoading } = useModal("UserDashboardModal");
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
  const setDataFields = (fields) => {
    setData({
      ...modal.data,
      ...fields,
    });
  };

  const getFromField = (field) => {
    return modal.data?.form[field];
  };
  const getDataField = (field) => {
    // console.log(modal.data && modal?.data[field] && "test");
    return modal.data && modal?.data[field];
  };

  const intFrom = async () => {
    setDataFields({
      form: {
        leagueInView: store.inView.leagueInView,
        matchInView: store.inView.matchInView,
      },
    });
  };

  useEffect(() => {
    (async () => {
      if (!modal || !modal.data) return;
      const league = modal.data?.form.leagueInView;
      const matches = await matchService.getMatchesForLeague(league._id);
      setDataFields({
        matches,
      });
    })();
  }, [modal?.data?.form.leagueInView]);

  const update = async () => {
    setLoading(true);
    const league = getFromField("leagueInView");
    const match = getFromField("matchInView");
    await userService.updateUserDashboard({
      leagueInViewId: league._id,
    });
    await dashboardService.updateDashboard({
      leagueId: league._id,
      currentMatch: match._id,
    });
    dispatch({
      type: ACTIONS.SetInView_League,
      payload: { leagueInView: league },
    });
    dispatch({
      type: ACTIONS.SetInView_Match,
      payload: { matchInView: match },
    });
    setLoading(false);
    close();
  };
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
            <h4>Update in-View Details</h4>
          </div>
        )}
        Body={() => (
          <div>
            <div className="row justify-content-center my-3">
              <label className="col-3">League in View:</label>
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
            <div className="row justify-content-center my-3">
              <label className="col-3">Match in View:</label>
              <div className="col-6">
                {getDataField("matches") && (
                  <DropdownSelect
                    id="admin-leagueInView-selector-dropdown"
                    value={getFromField("matchInView")}
                    items={getDataField("matches")}
                    onChange={(item) => setFromFields({ matchInView: item })}
                    ukey={"_id"}
                    displayKey={"matchKey"}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        Buttons={() => (
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={close}>
              Cancel
            </button>
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
