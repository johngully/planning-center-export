import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/people";
export const people = createJsonAdapter(url);
export default people;

