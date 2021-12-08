import { startJsonFile, appendJsonToFile, endJsonFile } from "../../planningCenterDataWriter.mjs";
import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";

const peopleUrl = "https://api.planningcenteronline.com/people/v2/people?include=field_data";
const tabsUrlTemplate = "https://api.planningcenteronline.com/people/v2/tabs?include=field_definitions&where[slug]=${tab}";


// For the tab slug, get Field Definitions
// Get People with Field Data included
// Pivot field data into columns
export const peopleCustomFields = createJsonAdapter(peopleUrl, fieldDataUrlTemplate, fieldDataPivot);
export default peopleCustomFields;

function createJsonAdapter(peopleUrl, tabsUrlTemplate, transform) {
  return async (config, filePath, options) => {
    const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);

    // Validate the required tab parameter
    const tab = options.tab;
    if (!tab) {
      throw new Error(`A tab must be specified in "options.tab"`);
    }

    // Get the field defintiions for the tab
    const tabUrl = transformTemplate(tabUrlTemplate, "tab", tab)
    const fieldDefinitions = await api.get(tabUrl, fieldDefinitionTransform)
    if (!fieldDefinitions.length) {
      throw new Error(`No fields could be found for a tab with the slug: ${tab}`)
    }

    // Write the results of the field data requests to file
    startJsonFile(filePath);
    const result = await api.getAll(peopleUrl, (json, page) => {
      const data = transform(json, tab, fieldDefinitions);
      appendJsonToFile(filePath, data, page);
    });
    endJsonFile(filePath);
    return result;
  };
}

function transformTemplate(templateString, token, value) {
  const template = new Function(token, "return `"+templateString+"`;");
  return template(value);
}

function fieldDefinitionTransform(json) {
  // Simplify the field defintions
  const fieldDefinitions = json.included.map(fieldDefinition => {
    return {
      name: fieldDefinition.attributes.name,
      slug: fieldDefinition.attributes.slug,
      dataType: fieldDefinition.attributes.data_type,
      sequence: fieldDefinition.attributes.sequence,
      fieldDefinitionId: fieldDefinition.id,
      tabId: fieldDefinition.attributes.tab_id,  
    }
  });
  return fieldDefinitions;
}

function fieldDataPivot(json, tab, fieldDefinitions) {
  const people = json.data;
  const tabs = { tab };

  for (const person of people) {
    
  }

  json.data.tabs = tabs;
  return json.data;
}
