// src/db/index.ts
import Dexie, { Table } from "dexie";

export type Favorite = {
  id?: number;
  tutorId: number;
  nombre: string;
  carrera: string;
  reputacion: number;
};

class TutorAppDB extends Dexie {
  favorites!: Table<Favorite, number>;

  constructor() {
    super("tutorapp");
    this.version(1).stores({
      // índice autoincremental y campos consultables
      favorites: "++id, tutorId, nombre, carrera, reputacion",
    });
  }
}

export const db = new TutorAppDB();

// === Named exports que usa TutorCard.tsx ===
export async function addFavorite(f: Omit<Favorite, "id">) {
  await db.favorites.add(f);
}

export async function removeFavoriteByTutorId(tutorId: number) {
  await db.favorites.where({ tutorId }).delete();
}

export async function isFavorite(tutorId: number): Promise<boolean> {
  const found = await db.favorites.where({ tutorId }).first();
  return !!found;
}

export async function listFavorites(): Promise<Favorite[]> {
  return db.favorites.orderBy("id").reverse().toArray();
}
