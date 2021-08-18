import { startJsonFile, endJsonFile, appendJsonToFile } from "../../planningCenterDataWriter.mjs";
import PlanninerCenterApiHelper from "../../planningCenterApiHelper.mjs";

const url = "https://api.planningcenteronline.com/groups/v2/groups";
const groupMembersSlug = "memberships";

export async function groupMembers (config, filePath) {  
  const api = new PlanninerCenterApiHelper(config.applicationId, config.secret, config.pageSize);

  // Get all the groups
  let groupMembersResultAggregate = { totalCount: 0};
  let groupMembersTotalCount = 0;

  // Start the group member JSON file
  startJsonFile(filePath);
  const groupsResult = await api.getAll(url, async (groupJson) => {

    // Iterate through each group and call the group members api for the group
    // Write the members info to file and track the total group members.
    const groups = groupJson.data;
    for (const group of groups) {
      const groupId = group.id;
      const groupMembersUrl = `${url}/${groupId}/${groupMembersSlug}`;
      const groupMembersResult = await api.getAll(groupMembersUrl, groupMembersJson => {
        appendJsonToFile(filePath, groupMembersJson.data);
      });
      groupMembersTotalCount += groupMembersResult.totalCount;
    }
    
    return groupMembersResultAggregate;
  });

  endJsonFile(filePath);
  return { 
    groupsTotalCount: groupsResult.totalCount,
    groupMembersTotalCount
  };
}

export default groupMembers;