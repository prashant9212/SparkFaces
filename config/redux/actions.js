// actions.js
export const ADD_TRACK_ID = 'ADD_TRACK_ID';
export const REMOVE_TRACK_ID = 'REMOVE_TRACK_ID';
export const SET_HMS_INSTANCE = 'SET_HMS_INSTANCE';

export const setHmsInstance = (hmsInstance) => ({
    type: SET_HMS_INSTANCE,
    payload: hmsInstance,
  });  

export const addTrackId = (trackId) => ({
  type: ADD_TRACK_ID,
  payload: trackId,
});

export const removeTrackId = (trackId) => ({
  type: REMOVE_TRACK_ID,
  payload: trackId,
});
