import _ from "lodash";
import { cleanupExistingFiles } from "./planningCenterDataWriter.mjs";
import { PlanningCenterEntities, PlanningCenterExportFormats } from "./planningCenterEnums.mjs";
// import csvAdapters from "./adapters/csv/index.mjs";
import jsonAdapters from "./adapters/json/index.mjs";

const defaultConfig = {
  applicationId: "",
  secret: "",
  pageSize: 25,
  exportFormat: PlanningCenterExportFormats.JSON,
  allowFileOverwrite: true
};

function validateConfig(config) {
  if (!config.applicationId) {
    throw new Error(`The PlanningCenter "applicationId" must be provided in order to export data`);
  }

  if (!config.secret) {
    throw new Error(`The PlanningCenter "secret" must be provided in order to export data`);
  }

  if (!PlanningCenterExportFormats[config.exportFormat]) {
    throw new Error(`The "exportFormat" must be a valid PlanningCenterExportFormat`, PlanningCenterExportFormats);
  }
}

function validateEntity(entity) {
  if (!PlanningCenterEntities[entity]) {
    throw new Error(`The "entity" must be a valid PlanningCenterEntity`, PlanningCenterEntities)
  }
}

function getAdapter(format, entity) {
  let adapter;
  switch(format) {
    case PlanningCenterExportFormats.CSV:
      adapter = csvAdapters[entity];
      break;
    case PlanningCenterExportFormats.JSON:
      adapter = jsonAdapters[entity];
      break;
  }

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
    const format = this.config.exportFormat;
    switch(format) {
      case PlanningCenterExportFormats.CSV:
        return await this.exportAsCsv(entity, path);
        break;
      default:
        return await this.exportAsJson(entity, path);
        break;
    }
  }

  async exportAsJson(entity, path) {
    validateEntity(entity);
    const adapter = getAdapter(this.config.exportFormat, entity);
    const result = await adapter(this.config, path);
    return result;
  }

  async exportAsCsv(entity, path) {
    validateEntity(entity);
  }
}

export { PlanningCenter, PlanningCenterEntities, PlanningCenterExportFormats }
