import {default as initReducer} from "./init/slice/initSlice.ts";
import {default as authReducer} from "./auth/authSlice.ts";
import {default as applicantReducer} from "./applicant/applicantSlice.ts";

export const reducers = {
    init: initReducer,
    auth: authReducer,
    applicant: applicantReducer,
};
