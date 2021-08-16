import { URL } from "url"
import fetch from "node-fetch"

async function handleErrors(error, delay) {
  if (error.code == 429) {
    console.debug("Sleeping for 20 seconds due to api rate limiting");
    await sleep(delay)
  } else {
    throw new Error(error);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

export class PlanningCenterApiHelper {
  apiKey;
  secret;
  pageSize;
  apiRateLimitDelayMs = 20 * 1000

  constructor(apiKey, secret, pageSize) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.pageSize = pageSize;
  }

  async get(url, ) {
    const method = "get";
    const authorization = "Basic " + Buffer.from(this.apiKey+":"+this.secret).toString('base64');
    const getUrl = new URL(url);
    getUrl.searchParams.append("per_page", this.pageSize);
    
    try {
      const response = await fetch(getUrl, { method: "get", headers: { authorization } });
      const json = await response.json();
      return json;
    } catch(error) {
      console.error(error);
      return { error };
    }
  }

  async getAll(url, perPageCallback) {
    let offset = 0;
    let totalCount = 0;
  
    do {
      const getUrl = new URL(url);
      getUrl.searchParams.append("offset", offset);
      const result = await this.get(getUrl);
      
      // Exit the loop if there is an error
      // Wait if the API is rate limited, and skip the increment
      if (result.errors) {
        await handleErrors(result.errors, this.apiRateLimitDelayMs);
  
      // Increment to the next page of data
      } else {
        // Execute the optional callback to process 
        // the data for the current page
        if (perPageCallback) {
          await perPageCallback(result);
        }
        offset = result.meta.next?.offset;
        totalCount = result.meta.total_count;
      }
      
    } while (offset)
  
    return {
      totalCount
    };
  }

}

export default PlanningCenterApiHelper;


