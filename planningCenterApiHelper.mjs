import { URL } from "url"
import fetch from "node-fetch"

async function handleErrors(errors, delay) {
  if (errors[0].code == 429) {
    console.debug("Sleeping for 20 seconds due to api rate limiting");
    await sleep(delay)
    console.debug("Resuming after waiting for rate limit")
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
    const page = {
      count: 0,
      offset: 0,
      totalCount: 0,
    }
  
    do {
      const getUrl = new URL(url);
      getUrl.searchParams.append("offset", page.offset);
      const result = await this.get(getUrl);
      
      // Exit the loop if there is an error
      // Wait if the API is rate limited, and try again in 20 seconds
      if (result.errors) {
        await handleErrors(result.errors, this.apiRateLimitDelayMs);
      } else {
        // Get the total count, and the index of the next page of data
        page.count = result.meta.count;
        page.offset = result.meta.next?.offset;
        page.totalCount = result.meta.total_count;
        
        // Execute the optional callback to process the data for the current page.
        if (perPageCallback) {
          await perPageCallback(result, page);
        }        
      }
      
    } while (page.offset)
  
    return {
      totalCount: page.totalCount
    };
  }

}

export default PlanningCenterApiHelper;
