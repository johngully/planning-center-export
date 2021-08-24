import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/headcounts";
export const headcounts = createCsvAdapter(url);
export default headcounts;
