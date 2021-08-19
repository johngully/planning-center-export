import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/headcounts";
export const headcounts = createJsonAdapter(url);
export default headcounts;
