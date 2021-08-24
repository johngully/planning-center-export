import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/groups/v2/groups";
export const groups = createCsvAdapter(url);
export default groups;
