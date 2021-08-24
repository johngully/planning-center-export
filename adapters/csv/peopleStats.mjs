import { createCsvAdapter } from "../planningCenterAdapterFactory.mjs";

const url = "https://api.planningcenteronline.com/people/v2/stats";
export const peopleStats = createCsvAdapter(url, transform);
export default peopleStats;

// Flattend the people stats JSON hierarchy into a single CSV row
function transform(json) {
  const ages = json.data.attributes.age;
  const campuses = json.data.attributes.campuses;
  const gender = json.data.attributes.gender;
  const memberships = json.data.attributes.membership;

  const transformedData = {
    id: json.data.id,
    genderMale: gender.male,
    genderFemale: gender.female,
    genderUnassigned: gender.unassigned,
    totalCount: json.data.attributes.total
  }

  campuses.forEach((campus, index) => {
    const key = `campus${index}`;
    transformedData[key+"Id"] = campus.id;
    transformedData[key+"Name"] = campus.name;
    transformedData[key+"Count"] = campus.count;
  });

  Object.keys(ages).forEach((age, index) => {
    const key = `age${index}`;
    transformedData[key+"Age"] = age;
    transformedData[key+"Male"] = ages[age].male;
    transformedData[key+"Female"] = ages[age].female;
    transformedData[key+"Unassigned"] = ages[age].unassigned;
  });

  memberships.forEach((membership, index) =>{
    const key = `membership${index}`;
    transformedData[key+"Id"] = membership.id;
    transformedData[key+"Name"] = membership.name;
    transformedData[key+"Count"] = membership.count;
  });

  return [transformedData];
}