import axios from "axios";

// Tipado de usuario según JSONPlaceholder
export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// Cliente base apuntando a la API externa
const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Función para obtener la lista de usuarios
export async function fetchApiUsers(): Promise<ApiUser[]> {
  const { data } = await client.get<ApiUser[]>("/users");
  return data;
}

