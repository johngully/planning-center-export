import { startCsvFile, appendJsonArrayToCsvFile, endCsvFile, startJsonFile, appendJsonToFile, endJsonFile } from "../../planningCenterDataWriter.mjs";
import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";
// import { createJsonAdapter } from "../planningCenterAdapterFactory.mjs";

const tabUrlTemplate = "https://api.planningcenteronline.com/people/v2/tabs?include=field_definitions&where[slug]=${tab}";
const fieldDataUrlTemplate = "https://api.planningcenteronline.com/people/v2/field_data?where[field_definition_id]=${fieldDefinitionIds}"

export const peopleTabs = createJsonAdapter(tabUrlTemplate, fieldDataUrlTemplate, fieldDataJsonTransform);
export default peopleTabs;

function fieldDataJsonTransform(json, fieldDefinitions) {
  const fd = json.data.map(data => {
    const personId = data.relationships.customizable.data.id;
    const fieldDefinitionId = data.relationships.field_definition.data.id;
    const fieldDefinition = fieldDefinitions.find(fd => fd.fieldDefinitionId === fieldDefinitionId);
    return {
      id: data.id,
      value: data.attributes.value,
      ...fieldDefinition,
      personId
    };
  });
  return fd;
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

export function createJsonAdapter(tabUrlTemplate, fieldDataUrlTemplate, transform) {
  return async (config, filePath, options) => {
    const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);

    // Validate the required tab parameter
    const tab = options.tab;
    if (!tab) {
      throw new Error(`A tab must be specified in "options.tab"`);
    }

    // Get the tab and select the field definitions from the response
    const tabUrl = transformTemplate(tabUrlTemplate, "tab", tab)
    const fieldDefinitions = await api.get(tabUrl, fieldDefinitionTransform)
    if (!fieldDefinitions.length) {
      throw new Error(`No fields could be found for a tab with the slug: ${tab}`)
    }

    // Generate the field data url by appending a comma delimited list of fieldDefinitionIds to the request
    const fieldDefinitionIds = fieldDefinitions.map(fd => fd.fieldDefinitionId).join(",");
    const fieldDataUrl = transformTemplate(fieldDataUrlTemplate, "fieldDefinitionIds", fieldDefinitionIds);

    // Write teh results of the field data requests to file
    startJsonFile(filePath);
    const result = await api.getAll(fieldDataUrl, (json, page) => {
      const data = transform(json, fieldDefinitions);
      appendJsonToFile(filePath, data, page);
    });
    endJsonFile(filePath);
    return result;
  };
}