import fetch from "node-fetch";
import fs from "fs";
import { exit } from "process";

const url = "https://api.planningcenteronline.com/groups/v2/groups";

export async function groups (config, filePath) {
  let offset = 0;
  let totalCount = 0;
  let result = {};

  do {
    const offsetUrl = `${url}?offset=${offset}`;
    result = await writeGroupsToFile(config, offsetUrl, filePath)
    
    // Exit the loop if there is an error
    // Wait if the API is rate limited, and skip the increment
    if (result.error) {
      await handleErrors();

    // Increment to the next page of data
    } else {
      offset = result.nextOffset;
      totalCount = result.totalCount;
    }
    
  } while ( result.nextOffset )

  return {
    filePath,
    totalCount
  };
}

async function writeGroupsToFile(config, url, filePath) {
  let error = null;

  // Call url
  
  const method = "get";
  const authorization = "Basic " + Buffer.from(config.apiKey+":"+config.secret).toString('base64');
  
  try {
    const response = await fetch(url, { method: "get", headers: { authorization } });
    const json = await response.json();
    const { data, meta } = json;
    // Write to file
    fs.appendFileSync(filePath, JSON.stringify(data));

    return {
      totalCount: meta.total_count,
      nextOffset: meta.next?.offset,  
      error: null
    };
  } catch(error) {
    return { error };
  }
}

async function handleErrors(error) {
  if (error.code == 429) {
    await sleep(20 * 1000)
  } else {
    throw new Error(error);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

export default groups;