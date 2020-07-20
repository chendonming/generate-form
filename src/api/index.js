import { get, post } from "./axios";
export const getTables = async () => await get("/tables");
export const getColumnsByTable = async params => await get("/columns", params);
export const generate = async params => await post("/generate", params);
