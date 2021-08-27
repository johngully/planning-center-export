import dotenv from "dotenv";
import path from "path";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;
const format = process.env.PLANNING_CENTER_FORMAT;
const destination = process.env.PLANNING_CENTER_DESTINATION;

const planningCenterConfig = { applicationId, secret, pageSize, format, destination };
const planningCenterExport = new PlanningCenter(planningCenterConfig);

// await exportToFile(PlanningCenterEntities.addresses, planningCenterConfig);
await exportToFile(PlanningCenterEntities.campuses, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.checkins, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.emails, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.events, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.eventTimes, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.groupMembers, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.groups, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.groupTypes, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.headcounts, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.households, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.people, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.peopleStats, planningCenterConfig);
// await exportToFile(PlanningCenterEntities.peopleTabs, planningCenterConfig, { "tab": "custom_tab_slug_name" });


async function exportToFile(entity, config, options) {
  const tabName = options?.tab ? `-${options.tab}` : "";
  const defaultFileName = `${entity}${tabName}.${config.format}`;
  const defaultFilePath = path.join(config.destination, defaultFileName); 
  const filePath = defaultFilePath;  

  const result = await planningCenterExport.export(entity, filePath, options);
  console.log(`${entity} Export complete`);
  if (result.totalCount) {
    console.log(`  ${result.totalCount} records written to:`, filePath);
  }
  if (result.parentTotalCount) {
    console.log(`  ${result.totalCount} members in ${result.parentTotalCount} groups`);
  }
}
