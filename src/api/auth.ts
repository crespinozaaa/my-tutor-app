// src/api/auth.ts

export type LoginResponse = {
  access: string;
  user: {
    id: number;
    nombre: string;
    correo: string;
    es_tutor: boolean;
    reputacion: number;
  };
};

// Simula el backend, sin FastAPI todavía
export async function loginService(correo: string, password: string) {
  await new Promise(r => setTimeout(r, 600)); // pequeño delay

  // acepta cualquier correo que termine en @duocuc.cl y tenga una contraseña mínima
  if (correo.endsWith("@duocuc.cl") && password.length >= 3) {
    return {
      access: "token-falso",
      user: { id: 1, nombre: "Estudiante", correo, es_tutor: false, reputacion: 4.6 }
    };
  }

  throw new Error("invalid");
}
