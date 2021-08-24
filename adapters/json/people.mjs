import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/people?include=school,primary_campus,phone_numbers,households,emails,addresses";
export const people = createJsonAdapter(url);
export default people;
