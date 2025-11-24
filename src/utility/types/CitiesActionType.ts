import type { CityType } from "./CitiesType";

export type CitiesActionType =
    | { type: "loading" }
    | { type: "cities/loaded"; payload: CityType[] }
    | { type: "city/loaded"; payload: CityType }
    | { type: "city/created"; payload: CityType }
    | { type: "city/deleted"; payload: string | number }
    | { type: "rejected"; payload: string }
    | { type: "clearError" };
