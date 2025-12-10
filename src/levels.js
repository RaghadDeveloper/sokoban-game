import { parseLevelText } from "./levelParser.js";

export async function loadLevels() {
  try {
    const response = await fetch("src/levels.txt");
    if (!response.ok) {
      throw new Error(`Failed to load levels: ${response.statusText}`);
    }

    const levelText = await response.text();
    return parseLevelText(levelText);
  } catch (error) {
    console.error("Error loading levels:", error);
    return [];
  }
}

export const levels = [];
