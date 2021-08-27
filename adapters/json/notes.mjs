import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/notes";
export const notes = createJsonAdapter(url);
export default notes;
