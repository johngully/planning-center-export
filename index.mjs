import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const apiKey = process.env.PLANNING_CENTER_API_KEY;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;
const filePath = "./groups.json";

const planningCenterConfig = { apiKey, secret, pageSize };
const planningCenterExport = new PlanningCenter(planningCenterConfig);
const result = await planningCenterExport.export(PlanningCenterEntities.GROUPS, filePath);
console.log(`Export complete`)
console.log(`  ${result.totalCount} records written to: `, filePath);