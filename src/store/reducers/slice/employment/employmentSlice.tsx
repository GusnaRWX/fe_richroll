import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface EventType {
  day: number,
  event_id: number,
  title: string,
  name: string,
  start: Date,
  end:Date,
  isBreak?: boolean,
  isDuration?: boolean,
  color?: string,
  duration?: number | string,
  allDay?: boolean,
  scheduleType?: string | number,
  type?: number
}

interface EmploymentState {
  isLoading: boolean;
  detailInformation: object;
  detailPersonalInfo: object;
  detailEmergencyContact: object;
  detailCnb: object;
  events: Array<EventType>;
  profileName: string;
  grossHour: number;
  netHour: number;
}

const initialState: EmploymentState = {
  isLoading: false,
  detailInformation: {},
  detailPersonalInfo: {},
  detailEmergencyContact: {},
  detailCnb: {},
  events: [],
  grossHour: 0,
  netHour: 0,
  profileName: ''
};

export const employmentSlice = createSlice({
  name: 'employment',
  initialState,
  reducers: {
    // getter & patch employment user information
    getDetailInformationRequested: (state) => {
      state.isLoading = true;
    },
    getDetailInformationSuccess: (state, action) => {
      state.isLoading = false;
      state.detailInformation = action?.payload.data;
    },
    getDetailInformationFailed: (state) => {
      state.isLoading = false;
    },
    patchDetailInformationRequested: (state) => {
      state.isLoading = true;
    },
    patchDetailInformationSuccess: (state) => {
      state.isLoading = false;
    },
    patchDetailInformationFailed: (state) => {
      state.isLoading = false;
    },
    // end
    // getter & patch employment user personal information
    getDetailPersonalInfoRequested: (state) => {
      state.isLoading = true;
    },
    getDetailPersonalInfoSuccess: (state, action) => {
      state.isLoading = false;
      state.detailPersonalInfo = action?.payload?.data;
    },
    getDetailPersonalInfoFailed:(state) => {
      state.isLoading = false;
    },
    patchDetailPersonalInfoRequested: (state) => {
      state.isLoading = true;
    },
    patchDetailPersonalInfoSuccess: (state) => {
      state.isLoading = false;
    },
    patchDetailPersonalInfoFailed: (state) => {
      state.isLoading = false;
    },
    // end
    // getter & patch employment user emergency contact
    getDetailEmergencyContactRequested: (state) => {
      state.isLoading = true;
    },
    getDetailEmergencyContactSuccess: (state, action) => {
      state.isLoading = false;
      state.detailEmergencyContact = action?.payload?.data;
    },
    getDetailEmergencyContactFailed: (state) => {
      state.isLoading = false;
    },
    patchDetailEmergencyContactRequested: (state) => {
      state.isLoading = true;
    },
    patchDetailEmergencyContactSuccess: (state) => {
      state.isLoading = false;
    },
    patchDetailEmergencyContactFailed: (state) => {
      state.isLoading = false;
    },
    // end
    // getters detail cnb
    getDetailCnbRequested: (state) => {
      state.isLoading = true;
    },
    getDetailCnbSuccess: (state, action) => {
      state.isLoading = false;
      state.detailCnb = action?.payload?.data;
    },
    getDetailCnbFailed: (state) => {
      state.isLoading = false;
    },
    // end
    // getter employment user work schedule
    getUserWorkScheduleRequested: (state) => {
      state.isLoading = true;
    },
    getUserWorkScheduleSuccess: (state, action) => {
      state.isLoading = false;
      state.profileName = action?.payload?.name;
      state.grossHour = action?.payload?.grossHour;
      state.netHour = action?.payload?.netHour;
      const tempData: Array<EventType> = [];
      action?.payload?.events.map((item) => {
        tempData.push({
          day: item.day,
          event_id: item.eventId,
          title: item.name,
          name: item.name,
          start: new Date(item.start),
          end: new Date(item.end),
          isBreak: item.isBreak,
          isDuration: item.isDuration,
          color: item.color,
          duration: item.duration,
          allDay: item.allDay,
          scheduleType: item.scheduleType,
          type: item.type
        });
      });
      state.events = tempData;
    },
    getUserWorkScheduleFailed: (state) => {
      state.isLoading = false;
    }
    // end
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const {
  getDetailCnbFailed,
  getDetailCnbRequested,
  getDetailCnbSuccess,
  getDetailEmergencyContactFailed,
  getDetailEmergencyContactRequested,
  getDetailEmergencyContactSuccess,
  getDetailInformationFailed,
  getDetailInformationRequested,
  getDetailInformationSuccess,
  getDetailPersonalInfoFailed,
  getDetailPersonalInfoRequested,
  getDetailPersonalInfoSuccess,
  getUserWorkScheduleFailed,
  getUserWorkScheduleRequested,
  getUserWorkScheduleSuccess,
  patchDetailEmergencyContactFailed,
  patchDetailEmergencyContactRequested,
  patchDetailEmergencyContactSuccess,
  patchDetailInformationFailed,
  patchDetailInformationRequested,
  patchDetailInformationSuccess,
  patchDetailPersonalInfoFailed,
  patchDetailPersonalInfoRequested,
  patchDetailPersonalInfoSuccess
} = employmentSlice.actions;

export default employmentSlice.reducer;