# Planning Center Export

## Background
Simplifies the process of exporting data from Planning Center.  While Planning Center does provide the ability to export data to files, this process must be done through the user interface and con be extremly time consuming.  This package is designed to support automation of data extraction.

The inability to simply and reliably extract data from Planning Center for use in a data warehouse was the initial reason for the creation of this package.

## Getting Started

### Installing the package
`terminal`
```bash
npm install planning-center-export
```
### Basic Example Export to JSON
`.js`
```js
import { PlanningCenter, PlanningCenterEntities } from "planning-center-export"

// Configure output file and API keys
const groupsFilePath = "./groups.json";
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;

// Export the GROUPS data as JSON
const planningCenterConfig = { applicationId, secret };
const planningCenterExport = new PlanningCenter(planningCenterConfig);
const groupsResult = await planningCenterExport.export(PlanningCenterEntities.groups, groupsFilePath);

// Log the completion of the export
console.log(`${PlanningCenterEntities.groups} Export complete`)
console.log(`  ${groupsResult.totalCount} records written to: `, groupsFilePath);
```

### Planning Center API keys
In order to make requests to the Planning Center API you must provide the API keys assigned to your Planning Center Account. Your API keys [can be found here](https://api.planningcenteronline.com/oauth/applications)

Pass the Personal Access Tokens: `Application ID` and `Secret` pass them into the `PlanningCenterExport` constructor.  These keys will automatically be included for all requests to the API.

#### Key Security
The `Application ID` and `Secret` should NEVER BE STORED IN CODE OR CHECKED INTO A CODE REPOSITORY.  Please ensure that you store them in a secure way such as system environment variables or a `.env` file. The example above uses a `.env` file to store the keys, and uses the `dotenv` npm package to access them.

`.env`
```
PLANNING_CENTER_APPLICATION_ID=a72490....9abh
PLANNING_CENTER_SECRET=576a284...e79g
```

`.js`
```js
import dotenv from "dotenv";
const applicationId = process.env.PLANNING_CENTER_APPLICATION_ID;
const secret = process.env.PLANNING_CENTER_SECRET;
const planningCenterConfig = { applicationId, secret };
const planningCenterExport = new PlanningCenter(planningCenterConfig);
```
