// import { startCsvFile, appendJsonArrayToCsvFile, endCsvFile } from "../../planningCenterDataWriter.mjs";
// import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";
import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";


const url = "https://api.planningcenteronline.com/people/v2/campuses";
export const campuses = createCsvAdapter(url);
export default campuses;
