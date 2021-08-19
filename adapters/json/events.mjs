import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/events";
export const events = createJsonAdapter(url);
export default events;
