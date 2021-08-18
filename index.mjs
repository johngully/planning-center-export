import dotenv from "dotenv";
import { PlanningCenter, PlanningCenterEntities } from "./planningCenter.mjs"

dotenv.config();
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;
const pageSize = process.env.PLANNING_CENTER_PAGE_SIZE;

const planningCenterConfig = { applicationId, secret, pageSize };
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

// Write all Groups to "./group-types.json"
const groupTypesFilePath = "./group-types.json";
const groupTypesResult = await planningCenterExport.export(PlanningCenterEntities.GROUP_TYPES, groupTypesFilePath);
console.log(`${PlanningCenterEntities.GROUP_TYPES} Export complete`)
console.log(`  ${groupTypesResult.totalCount} records written to: `, groupTypesFilePath);
