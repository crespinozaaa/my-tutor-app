import { Preferences } from "@capacitor/preferences";
const KEY = "avatar_base64";

export async function saveAvatar(base64: string) {
  await Preferences.set({ key: KEY, value: base64 });
}

export async function loadAvatar(): Promise<string | null> {
  const { value } = await Preferences.get({ key: KEY });
  return value ?? null;
}

export async function clearAvatar() {
  await Preferences.remove({ key: KEY });
}