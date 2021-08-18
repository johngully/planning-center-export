import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const apiKey = process.env.PLANNING_CENTER_API_KEY;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;

const planningCenterConfig = { apiKey, secret, pageSize };
const planningCenterExport = new PlanningCenter(planningCenterConfig);

// Write all Groups to "./groups.json"
const groupsFilePath = "./groups.json";
const groupsResult = await planningCenterExport.export(PlanningCenterEntities.GROUPS, groupsFilePath);
console.log(`${PlanningCenterEntities.GROUPS} Export complete`)
console.log(`  ${groupsResult.totalCount} records written to: `, groupsFilePath);

// Write all Groups Members to "./group-members.json"
const groupMembersFilePath = "./group-members.json";
const groupMembersResult = await planningCenterExport.export(PlanningCenterEntities.GROUP_MEMBERS, groupMembersFilePath);
console.log(`${PlanningCenterEntities.GROUP_MEMBERS} Export complete`)
console.log(`  ${groupMembersResult.groupMembersTotalCount} records written to: `, groupMembersFilePath);
console.log(`  ${groupMembersResult.groupMembersTotalCount} members in ${groupMembersResult.groupsTotalCount} groups`);