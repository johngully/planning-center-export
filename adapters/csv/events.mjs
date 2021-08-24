import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/events";
export const events = createCsvAdapter(url);
export default events;
