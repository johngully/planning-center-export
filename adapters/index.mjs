import importDirectory from "esm-import-directory";

// Import all the modules in the csv and json paths.
// This allows for automatic discovery of new adapters.
export const jsonAdapters = await importDirectory("./adapters/json", { paths: true });
// export const csvAdapters = await importDirectory("./adapters/csv", { paths: true }); 

export default jsonAdapters;