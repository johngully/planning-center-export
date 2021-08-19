import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;

const planningCenterConfig = { applicationId, secret, pageSize };
const planningCenterExport = new PlanningCenter(planningCenterConfig);

exportCsv(PlanningCenterEntities.groups);
exportCsv(PlanningCenterEntities.groupMembers);
exportCsv(PlanningCenterEntities.groupTypes);
exportCsv(PlanningCenterEntities.people);
exportCsv(PlanningCenterEntities.households);


async function exportCsv(entity, filePath) {
  filePath = filePath || `./export/${entity}.json`;
  const result = await planningCenterExport.export(entity, filePath);
  console.log(`${entity} Export complete`);
  console.log(`  ${result.totalCount} records written to:`, filePath);
  if (result.parentTotalCount) {
    console.log(`  ${result.totalCount} members in ${result.parentTotalCount} groups`);
  }
}