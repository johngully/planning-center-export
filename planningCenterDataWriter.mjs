import { appendFileSync, existsSync, openSync, closeSync, statSync, unlinkSync, writeSync } from "fs";
import { Buffer } from "buffer";

export function cleanupExistingFiles(filePath, allowFileOverwrite) {
  if (existsSync(filePath)) {
    if (allowFileOverwrite) {
      unlinkSync(filePath);
    } else {
      throw new Error(`The file: "${filePath}" aleady exists and the current configuration prohibits overwriting.  Change the output file path or set "allowFileOverwrite = true"`);
    }
  }
}

export function startJsonFile(filePath) {
  appendFileSync(filePath, "[");
}

export function endJsonFile(filePath) {
  // Replace the last character in the file with a closing bracket "]"
  // Assumes this JSON file is an array and the last char is a training comma ","
  let fd;
  try {
    fd = openSync(filePath, "r+");
    const currentLength = statSync(filePath).size;
    const buffer = Buffer.from("]", "utf-8");
  
    // Replace the last character in the file with a closing bracket "]"
    if (currentLength > 1) {
      writeSync(fd, buffer, 0, buffer.length, currentLength-1);
    }
  } finally {
    if (fd) {
      closeSync(fd);
    }
  }
}

export function appendJsonToFile(filePath, json, forceRawData) {
  const data = JSON.stringify(json);
  
  // If the user as specified "false", simply write the JSON to the file
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