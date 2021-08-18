import fetch from "node-fetch";
import { startJsonFile, appendJsonToFile, endJsonFile } from "../../planningCenterDataWriter.mjs";
import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";

const url = "https://api.planningcenteronline.com/groups/v2/groups";

export async function groups(config, filePath) {
  const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);
  startJsonFile(filePath);
  const result = await api.getAll(url, (json, page) => {
    appendJsonToFile(filePath, json.data, page);
  });
  endJsonFile(filePath);
  return result;
}

export default groups;