import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/notes";
export const notes = createCsvAdapter(url);
export default notes;
