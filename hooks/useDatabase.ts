import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

let db: SQLite.SQLiteDatabase;

/**
 * Initialize the database and create the table if it doesn't exist
 */

export const initializeDatabase = async () => {
  db = await SQLite.openDatabaseAsync("fines_app.db");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS fines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label_code TEXT NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      color TEXT NOT NULL,
      year TEXT NOT NULL,
      infraction_type TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      audio_uri TEXT
    );
  `);
};

/**
 * Create a new fine
 */
export const createFine = async (fine: Fine): Promise<number> => {
  const result = await db.runAsync(
    `INSERT INTO fines 
    (label_code, brand, model, color, year, infraction_type, date, time, description, image_url, audio_uri)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    fine.label_code,
    fine.brand,
    fine.model,
    fine.color,
    fine.year,
    fine.infraction_type,
    fine.date,
    fine.time,
    fine.description,
    fine.image_url,
    fine.audio_uri ?? null
  );
  return result.lastInsertRowId ?? 0;
};

/**
 * Get all fines
 */
export const getAllFines = async (): Promise<Fine[]> => {
  return await db.getAllAsync<Fine>("SELECT * FROM fines");
};

/**
 * Get a single fine by ID
 */
export const getFineById = async (id: number): Promise<Fine | null> => {
  return await db.getFirstAsync<Fine>("SELECT * FROM fines WHERE id = ?", id);
};

/**
 * Update a fine
 */
export const updateFine = async (fine: Fine): Promise<number> => {
  if (!fine.id) throw new Error("Fine ID is required to update.");

  const result = await db.runAsync(
    `UPDATE fines SET
      label_code = ?, brand = ?, model = ?, color = ?, year = ?, 
      infraction_type = ?, date = ?, time = ?, description = ?, image_url = ?, audio_uri = ?
     WHERE id = ?`,
    fine.label_code,
    fine.brand,
    fine.model,
    fine.color,
    fine.year,
    fine.infraction_type,
    fine.date,
    fine.time,
    fine.description,
    fine.image_url,
    fine.audio_uri ?? null,
    fine.id
  );
  return result.changes ?? 0;
};

/**
 * Delete a fine
 */
export const deleteFine = async (id: number): Promise<number> => {
  const result = await db.runAsync("DELETE FROM fines WHERE id = ?", id);
  return result.changes ?? 0;
};

/**
 * Delete all fines
 */
export const deleteAllFines = async (): Promise<void> => {
  await db.runAsync("DELETE FROM fines");
  Alert.alert("🗑️ All fines deleted");
};
