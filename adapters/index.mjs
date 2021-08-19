import path from "path";
import importDirectory from "esm-import-directory";

// Import all the modules in the csv and json paths.
// This allows for automatic discovery of new adapters.
const dirname = path.dirname(import.meta.url.replace("file://", ""));
const jsonAdapterPath = path.join(dirname, "json");
export const jsonAdapters = await importDirectory(jsonAdapterPath, { paths: true });
// const csvAdapterPath = path.join(dirname, "csv");
// export const csvAdapters = await importDirectory(csvAdapterPath, { paths: true }); 

export default jsonAdapters;