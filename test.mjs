import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;

const planningCenterConfig = { applicationId, secret, pageSize };
const planningCenterExport = new PlanningCenter(planningCenterConfig);

await exportCsv(PlanningCenterEntities.campuses);
// await exportCsv(PlanningCenterEntities.checkins);
// await exportCsv(PlanningCenterEntities.emails);
// await exportCsv(PlanningCenterEntities.events);
// await exportCsv(PlanningCenterEntities.eventTimes);
// await exportCsv(PlanningCenterEntities.groupMembers);
// await exportCsv(PlanningCenterEntities.groups);
// await exportCsv(PlanningCenterEntities.groupTypes);
// await exportCsv(PlanningCenterEntities.headcounts);
// await exportCsv(PlanningCenterEntities.households);
// await exportCsv(PlanningCenterEntities.people);
// await exportCsv(PlanningCenterEntities.peopleStats);


async function exportCsv(entity, filePath) {
  filePath = filePath || `./export/${entity}.json`;
  const result = await planningCenterExport.export(entity, filePath);
  console.log(`${entity} Export complete`);
  if (result.totalCount) {
    console.log(`  ${result.totalCount} records written to:`, filePath);
  }
  if (result.parentTotalCount) {
    console.log(`  ${result.totalCount} members in ${result.parentTotalCount} groups`);
  }
}