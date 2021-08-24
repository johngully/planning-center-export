import { createJsonAdapterWithChild } from "../planningCenterAdapterFactory.mjs";
const groupsUrl = "https://api.planningcenteronline.com/groups/v2/groups";
const groupMembersUrl =  "https://api.planningcenteronline.com/groups/v2/groups/${id}/memberships";
export const groupMembers = createJsonAdapterWithChild(groupsUrl, groupMembersUrl);
export default groupMembers;
