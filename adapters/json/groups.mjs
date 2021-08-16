import fetch from "node-fetch";
import fs from "fs";
import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";

const url = "https://api.planningcenteronline.com/groups/v2/groups";

export async function groups(config, filePath) {
  const api = new PlanninerCenterApiHelper(config.apiKey, config.secret, config.pageSize);
  const result = await api.getAll(url, json => {
    // const data = json.data.map(item => {
    //   return { id: item.id, ...item.attributes }
    // });
    fs.appendFileSync(filePath, JSON.stringify(json.data));  
  });
  return result;
}


function transform(json) {

}

export default groups;