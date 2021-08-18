import groups from "./groups.mjs";
import groupMembers from "./groupMembers.mjs";
import groupTypes from "./groupTypes.mjs";

export const adapters = {
  GROUPS: groups, 
  GROUP_MEMBERS: groupMembers,
  GROUP_TYPES: groupTypes
}

export default adapters;