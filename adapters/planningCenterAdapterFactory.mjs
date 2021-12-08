import { startCsvFile, appendJsonArrayToCsvFile, endCsvFile, startJsonFile, appendJsonToFile, endJsonFile } from "../planningCenterDataWriter.mjs";
import PlanninerCenterApiHelper from "../planningCenterApiHelper.mjs";


// Allows templates to be passed as strings and interpreted at another location at runtime
function createTemplateFromString(literal, params) {
  return new Function(params, "return `"+literal+"`;"); 
}

function defaultCsvTransform(json) {
  const data = Array.isArray(json.data) ? json.data : [json.data]
  const selectedData = data.map(data => {
    return {
      id: data.id,
      ...data.attributes        
    };
  });
  return selectedData;
}

function defaultJsonTransform(json) {
  return json.data;
}

// Returns a function that can be used as an adapter
// This function calls the url and writes the results in csv format to a file
export function createCsvAdapter(url, transform = defaultCsvTransform) {
  return async (config, filePath, options) => {
    const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);
    startCsvFile(filePath);
    const result = await api.getAll(url, (json, page) => {
      const data = transform(json, options);
      appendJsonArrayToCsvFile(filePath, data, page);
    });
    endCsvFile(filePath);
    return result;
  };
}

// Returns a function that can be used as an adapter
// This function calls the url and writes the results to a file
export function createJsonAdapter(url, transform = defaultJsonTransform) {
  return async (config, filePath, options) => {
    const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);
    startJsonFile(filePath);
    const result = await api.getAll(url, (json, page) => {
      const data = transform(json, options);
      appendJsonToFile(filePath, data, page);
    });
    endJsonFile(filePath);
    return result;
  };
}

// Returns a function that can be used as an adapter
// This function calls the parentUrl, iterates through the results, calls the child url for each result, and writes the children to a file
export function createJsonAdapterWithChild(parentUrl, childUrlTemplate, templateVariableName = "id") {
  return async (config, filePath) => {  
    const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);
    let childResultAggregate = { totalCount: 0 };
    let childTotalCount = 0;
  
    // Start the file and get the parent data
    startJsonFile(filePath);
    const parentResult = await api.getAll(parentUrl, async (parentJson) => {
  
      // Iterate through each child and call the child api
      // Write the child info to file and track the total children
      const children = parentJson.data;
      for (const child of children) {
        const template = createTemplateFromString(childUrlTemplate, templateVariableName);
        const childUrl = template(child.id)
        const childResult = await api.getAll(childUrl, childJson => {
          appendJsonToFile(filePath, childJson.data);
        });
        childTotalCount += childResult.totalCount;
      }
      
      return childResultAggregate;
    });
  
    endJsonFile(filePath);
    return { 
      parentTotalCount: parentResult.totalCount,
      totalCount: childTotalCount
    };
  }
}
