import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;
const exportFormat = "json";

const planningCenterConfig = { applicationId, secret, pageSize, exportFormat };
const planningCenterExport = new PlanningCenter(planningCenterConfig);

await exportToFile(PlanningCenterEntities.campuses);
// await exportToFile(PlanningCenterEntities.checkins);
// await exportToFile(PlanningCenterEntities.emails);
// await exportToFile(PlanningCenterEntities.events);
// await exportToFile(PlanningCenterEntities.eventTimes);
// await exportToFile(PlanningCenterEntities.groupMembers);
// await exportToFile(PlanningCenterEntities.groups);
// await exportToFile(PlanningCenterEntities.groupTypes);
// await exportToFile(PlanningCenterEntities.headcounts);
// await exportToFile(PlanningCenterEntities.households);
// await exportToFile(PlanningCenterEntities.people);
// await exportToFile(PlanningCenterEntities.peopleStats);


async function exportToFile(entity, filePath) {
  filePath = filePath || `./export/${entity}.${exportFormat}`;
  const result = await planningCenterExport.export(entity, filePath);
  console.log(`${entity} Export complete`);
  if (result.totalCount) {
    console.log(`  ${result.totalCount} records written to:`, filePath);
  }
  if (result.parentTotalCount) {
    console.log(`  ${result.totalCount} members in ${result.parentTotalCount} groups`);
  }
}