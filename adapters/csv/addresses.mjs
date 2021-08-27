import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/addresses";
export const addresses = createCsvAdapter(url);
export default addresses;
