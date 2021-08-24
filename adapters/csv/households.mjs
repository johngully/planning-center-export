import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/households?include=people";
export const households = createCsvAdapter(url);
export default households;
