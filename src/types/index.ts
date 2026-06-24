import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  Icon: LucideIcon;
  img: string;
  n: string;
  d: string;
  full: string;
  benefits: string[];
}

export interface ProcessStep {
  n: string;
  Icon: LucideIcon;
  t: string;
  d: string;
}

export interface BookingForm {
  nombre: string;
  apellido: string;
  telefono: string;
  fecha: string;
  servicio: string;
  horario: string;
  mensaje: string;
}
