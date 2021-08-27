import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/addresses";
export const addresses = createJsonAdapter(url);
export default addresses;
