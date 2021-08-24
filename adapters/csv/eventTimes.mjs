import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/event_times";
export const eventTimes = createCsvAdapter(url);
export default eventTimes;
