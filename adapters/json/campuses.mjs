import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/campuses";
export const campuses = createJsonAdapter(url);
export default campuses;
