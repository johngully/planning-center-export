import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const apiKey = process.env.PLANNING_CENTER_API_KEY;
const secret = process.env.PLANNING_CENTER_SECRET;

const planningCenterConfig = { apiKey, secret };
const planningCenterExport = new PlanningCenter(planningCenterConfig);
await planningCenterExport.export(PlanningCenterEntities.GROUPS, "./groups.json");
console.log("Export complete");