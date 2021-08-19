import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/check_ins";
export const checkins = createJsonAdapter(url);
export default checkins;
