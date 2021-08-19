import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/stats";
export const peopleStats = createJsonAdapter(url);
export default peopleStats;
