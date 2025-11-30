// src/lib/profile.ts
import { Preferences } from "@capacitor/preferences";

export type Profile = {
  nombre: string;
  email: string;
  carrera?: string;
  semestre?: number | null;
  avatarBase64?: string | null;
  darkMode?: boolean;
};

const KEY = "profile";

const DEFAULT_PROFILE: Profile = {
  nombre: "",
  email: "",
  carrera: "",
  semestre: null,
  avatarBase64: null,
  darkMode: false,
};

export async function getProfile(): Promise<Profile> {
  const { value } = await Preferences.get({ key: KEY });
  if (!value) return DEFAULT_PROFILE;
  try {
    const parsed = JSON.parse(value) as Profile;
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function saveProfile(p: Profile): Promise<void> {
  await Preferences.set({ key: KEY, value: JSON.stringify(p) });
}

export async function clearProfile(): Promise<void> {
  await Preferences.remove({ key: KEY });
}
