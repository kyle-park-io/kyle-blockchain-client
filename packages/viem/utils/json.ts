import * as fs from 'fs';
import * as path from 'path';

/**
 * Read JSON data from a file
 *
 * @param filePath - The path to the file where data will be read.
 */
export function readJsonFile<T>(filePath: string): T | null {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (err) {
    console.error('Failed to read JSON file:', err);
    return null;
  }
}

/**
 * Saves JSON data to a file.
 *
 * @param data - The data to save, typed as a generic.
 * @param filePath - The path to the file where data will be saved.
 */
export function saveJsonToFile<T>(data: T, filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      console.log('Already file existed');
      return;
    }

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Convert the data object into a JSON string with proper formatting
    const jsonString = JSON.stringify(data, null, 2);

    // Write the JSON string to the specified file
    fs.writeFileSync(filePath, jsonString, 'utf-8');

    // Log a confirmation message to the console
    console.log(`JSON file has been saved at: ${filePath}`);
  } catch (err) {
    console.error('Failed to save JSON file:', err);
  }
}
