export type Mod = "online" | "presencial" | "mixta";

export type Tutor = {
  id: number;
  nombre: string;
  carrera: string;
  semestre: number;
  foto?: string;
  ramos: { id: number; codigo: string; nombre: string; nivel: number }[];
  modalidad: Mod;
  reputacion: number; // 0..5
  precio?: number | null; // por hora
  email: string; 
};

export const RAMOS = [
  { id: 1, codigo: "INF-101", nombre: "Estructuras de Datos" },
  { id: 2, codigo: "MAT-201", nombre: "Cálculo II" },
  { id: 3, codigo: "PRO-110", nombre: "Programación I" },
  { id: 4, codigo: "BD-220", nombre: "Bases de Datos" },
];

export const TUTORES: Tutor[] = [
  {
    id: 1,
    nombre: "Ana Pérez",
    carrera: "Ing. Informática",
    semestre: 7,
    reputacion: 4.7,
    modalidad: "mixta",
    precio: 8000,
    foto: "https://i.pravatar.cc/150?img=47",
    email: "ana.perez@tutores.cl",
    ramos: [
      { id: 1, codigo: "INF-101", nombre: "Estructuras de Datos", nivel: 5 },
      { id: 4, codigo: "BD-220", nombre: "Bases de Datos", nivel: 4 },
    ],
  },
  {
    id: 2,
    nombre: "Luis Soto",
    carrera: "Ing. Industrial",
    semestre: 6,
    reputacion: 4.3,
    modalidad: "online",
    precio: 6000,
    foto: "https://i.pravatar.cc/150?img=12",
    email: "luis.soto@tutores.cl",
    ramos: [{ id: 2, codigo: "MAT-201", nombre: "Cálculo II", nivel: 5 }],
  },
  {
    id: 3,
    nombre: "Cata Rivas",
    carrera: "Ing. Informática",
    semestre: 5,
    reputacion: 4.9,
    modalidad: "presencial",
    precio: 7000,
    foto: "https://i.pravatar.cc/150?img=31",
    email: "cata.rivas@tutores.cl",
    ramos: [{ id: 3, codigo: "PRO-110", nombre: "Programación I", nivel: 5 }],
  },
  {
    id: 4,
    nombre: "Diego Fuentes",
    carrera: "Ing. Civil",
    semestre: 8,
    reputacion: 4.1,
    modalidad: "mixta",
    precio: 5000,
    foto: "https://i.pravatar.cc/150?img=55",
    email: "diego.fuentes@tutores.cl",
    ramos: [{ id: 2, codigo: "MAT-201", nombre: "Cálculo II", nivel: 4 }],
  },
];
