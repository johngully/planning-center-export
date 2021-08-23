import { appendFileSync, existsSync, openSync, closeSync, statSync, unlinkSync, truncateSync } from "fs";
import { Buffer } from "buffer";

function replaceAtEndOfFile(filePath, replaceString, withString) {
  let fd;
  try {
    fd = openSync(filePath, "r+");
    const currentLength = statSync(filePath).size;
    if (currentLength > 1) {
      truncateSync(filePath, currentLength-replaceString.length);
      appendFileSync(filePath, withString);
    }
  } finally {
    if (fd) {
      closeSync(fd);
    }
  }
}

function convertObjectToCsvData(data) {
  const fields = Object.keys(data);
  const replacer = (key, value) => value === null ? "" : value;
  const csvData = fields.map(field => JSON.stringify(data[field], replacer)).join(",")
  return csvData;
}

export function cleanupExistingFiles(filePath, allowFileOverwrite) {
  if (existsSync(filePath)) {
    if (allowFileOverwrite) {
      unlinkSync(filePath);
    } else {
      throw new Error(`The file: "${filePath}" aleady exists and the current configuration prohibits overwriting.  Change the output file path or set "allowFileOverwrite = true"`);
    }
  }
}

export function startCsvFile(filePath) {
}

export function endCsvFile(filePath) {
  replaceAtEndOfFile(filePath, "\r\n", "");
}

export function appendJsonArrayToCsvFile(filePath, jsonArray, forceRawData) {
  for (let item of jsonArray) {
    const csvData = convertObjectToCsvData(item);
    appendLineToCsvFile(filePath, csvData, forceRawData);  
  }
}

export function appendLineToCsvFile(filePath, data, forceRawData) {
  // If the user has specified "true", simply write the data to the file
  if (forceRawData === true) {
    appendFileSync(filePath, data);
    return;
  }

  // do not process empty rows
  if (data === "") {
    return;
  }

  // append new line to the csv row
  const dataWithNewLine = `${data}\r\n`;
  appendFileSync(filePath, dataWithNewLine);
}

export function startJsonFile(filePath) {
  appendFileSync(filePath, "[");
}

export function endJsonFile(filePath) {
  // Assumes this JSON file is an array and the last char is a training comma ","
  // Replace the last character in the file with a closing bracket "]"
  replaceAtEndOfFile(filePath, ",", "]")
}

export function appendJsonToFile(filePath, json, forceRawData) {
  const data = JSON.stringify(json);
  
  // If the user has specified "true", simply write the JSON to the file
  if (forceRawData === true) {
    appendFileSync(filePath, data);
    return;
  }

  // Do not process empty arrays
  if (data == "[]") {
    return;
  }

  // Remove data from array brackets                        [ {}, {} ] -> {}, {}
  // Append traling comma so that more data can be appended     {}, {} -> {}, {},
  const dataWithoutBrackets = data.replace(/^\[|]$/g, "") + ",";
  const lastChar2 = dataWithoutBrackets.substr(dataWithoutBrackets.length-2, 2)
  appendFileSync(filePath, dataWithoutBrackets);
}