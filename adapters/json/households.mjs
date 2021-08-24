import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/households?include=people";
export const households = createJsonAdapter(url);
export default households;
