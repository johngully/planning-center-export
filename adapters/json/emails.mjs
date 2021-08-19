import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/emails";
export const emails = createJsonAdapter(url);
export default emails;
