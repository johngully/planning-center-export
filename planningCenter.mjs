import _ from "lodash";
import { cleanupExistingFiles } from "./planningCenterDataWriter.mjs";
import { PlanningCenterEntities } from "./planningCenterEnums.mjs";
import { jsonAdapters, csvAdapters } from "./adapters/index.mjs";

const defaultConfig = {
  applicationId: "",
  secret: "",
  pageSize: 25,
  format: "json",
  exportAdapters: {
    csv: csvAdapters,
    json: jsonAdapters
  },
  allowFileOverwrite: true
};

function validateConfig(config) {
  if (!config.applicationId) {
    throw new Error(`The PlanningCenter "applicationId" must be provided in order to export data`);
  }

  if (!config.secret) {
    throw new Error(`The PlanningCenter "secret" must be provided in order to export data`);
  }

  if (!config.exportAdapters[config.format]) {
    throw new Error(`The "format" must be a valid "exportAdapter" key`);
  }
}

function validateEntity(entity) {
  if (!PlanningCenterEntities[entity]) {
    throw new Error(`The "entity" must be a valid PlanningCenterEntity`, PlanningCenterEntities)
  }
}

function getAdapter(entity, format, adapters) {
  const formatAdapters = adapters[format] || {};
  const adapter = formatAdapters[entity];

  if (adapter === undefined) {
    throw new Error(`A ${format} adapter for ${entity} could not be found`);
  }
  return adapter;
}

class PlanningCenter {
  config = {};

  constructor(config) {
    this.config = _.defaultsDeep(config, defaultConfig)
    validateConfig(this.config);
  }

  async export(entity, path) {
    cleanupExistingFiles(path, this.config.allowFileOverwrite);
    validateEntity(entity);
    const entityAdapter = getAdapter(entity, this.config.format, this.config.exportAdapters)
    const result = await entityAdapter(this.config, path);
    return result;
  }

}

export { PlanningCenter, PlanningCenterEntities };
export default PlanningCenter;