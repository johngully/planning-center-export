import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/event_times";
export const eventTimes = createJsonAdapter(url);
export default eventTimes;
