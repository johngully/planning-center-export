import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/groups/v2/groups";
export const groups = createJsonAdapter(url);
export default groups;
