import type { FormReducerStateType } from "./FormReducerStateType";

export type FormReducerActionType =
    | { type: "city/updated"; payload: string }
    | { type: "countryCode/updated"; payload: string }
    | { type: "date/updated"; payload: string }
    | { type: "notes/updated"; payload: string }
    | { type: "state/updated"; payload: Partial<FormReducerStateType> }
    | { type: "geocodeLoading" }
    | { type: "rejected"; payload: string }
    | { type: "clearError" };
