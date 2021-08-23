import { startCsvFile, appendJsonArrayToCsvFile, endCsvFile } from "../../planningCenterDataWriter.mjs";
import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";

const url = "https://api.planningcenteronline.com/people/v2/campuses";
export const campuses = csvAdapter(url);
export default campuses;

// Returns a function that can be used as an adapter
// This function calls the url and writes the results to a file
function csvAdapter(url) {
  return async (config, filePath) => {
    const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);
    startCsvFile(filePath);
    const result = await api.getAll(url, (json, page) => {
      const selectedData = mapPlanningCenterAttributes(json);
      appendJsonArrayToCsvFile(filePath, selectedData, page);
    });
    endCsvFile(filePath);
    return result;
  };
}

function mapPlanningCenterAttributes(json) {
  const selectedData = json.data.map(data => {
    return {
      id: data.id,
      ...data.attributes        
    };
  });
  return selectedData;
}