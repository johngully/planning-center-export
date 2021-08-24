import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/check-ins/v2/check_ins";
export const checkins = createCsvAdapter(url);
export default checkins;
