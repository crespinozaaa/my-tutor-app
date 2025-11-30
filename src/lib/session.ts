import { Preferences } from "@capacitor/preferences";
const KEY_TOKEN = "access_token";
const KEY_USER  = "user_info";

export async function saveSession(token: string, user: unknown) {
  await Preferences.set({ key: KEY_TOKEN, value: token });
  await Preferences.set({ key: KEY_USER,  value: JSON.stringify(user) });
}
export async function getToken() {
  const { value } = await Preferences.get({ key: KEY_TOKEN });
  return value ?? null;
}
export async function clearSession() {
  await Preferences.remove({ key: KEY_TOKEN });
  await Preferences.remove({ key: KEY_USER });
}
