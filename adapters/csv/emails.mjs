import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/emails";
export const emails = createCsvAdapter(url);
export default emails;
