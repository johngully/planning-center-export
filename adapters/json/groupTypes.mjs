import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/groups/v2/group_types";
export const groupTypes = createJsonAdapter(url);
export default groupTypes;
