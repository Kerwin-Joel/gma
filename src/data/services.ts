import {
  Eye,
  Shield,
  Heart,
  Activity,
  Calendar,
  User,
  FileText,
  Check,
  ScanEye,
  Glasses,
  Scan,
} from "lucide-react";
import type { Service, ProcessStep } from "../types";
import { IMG } from "../constants/theme";

export const SVCS: Service[] = [
  {
    id: "examen",
    Icon: Eye,
    img: IMG.svc1,
    n: "Examen de la Vista",
    d: "Evaluación completa de agudeza visual y salud ocular con equipos actualizados.",
    full: "Realizamos una evaluación integral que incluye pruebas de agudeza visual, refracción, tonometría y fondo de ojo. Usamos tecnología de última generación para detectar problemas tempranos.",
    benefits: [
      "Detección temprana de enfermedades",
      "Evaluación con equipos digitales",
      "Resultado en menos de 45 minutos",
      "Informe detallado de tu salud visual",
    ],
  },
  {
    id: "graduacion",
    Icon: Glasses,
    img: IMG.svc2,
    n: "Graduación de Lentes",
    d: "Prescripción exacta para monofocales, bifocales y progresivos personalizados.",
    full: "Determinamos con precisión tu graduación óptica y te asesoramos en la elección del lente más adecuado para tu estilo de vida, desde monofocales hasta progresivos de alta gama.",
    benefits: [
      "Prueba con más de 200 modelos de monturas",
      "Lentes de marcas reconocidas",
      "Progresivos con garantía de adaptación",
      "Entrega en 24-48 horas",
    ],
  },
  {
    id: "oftalmologia",
    Icon: Shield,
    img: IMG.svc3,
    n: "Consulta Oftalmológica",
    d: "Atención médica especializada en diagnóstico y tratamiento de enfermedades.",
    full: "Nuestros oftalmólogos certificados diagnostican y tratan patologías oculares como glaucoma, cataratas, degeneración macular, ojo seco y muchas más.",
    benefits: [
      "Diagnóstico con biomicroscopía",
      "Tratamiento farmacológico y quirúrgico",
      "Seguimiento post-operatorio",
      "Convenios con clínicas privadas",
    ],
  },
  {
    id: "infantil",
    Icon: Heart,
    img: IMG.svc4,
    n: "Salud Visual Infantil",
    d: "Control visual pediátrico. Detección temprana de miopía en niños.",
    full: "La visión en la infancia es clave para el desarrollo. Realizamos controles adaptados a cada edad para detectar ambliopía, estrabismo y miopía precozmente.",
    benefits: [
      "Control desde los 6 meses de edad",
      "Técnicas adaptadas para niños",
      "Detección temprana de estrabismo",
      "Programa de control de miopía infantil",
    ],
  },
  {
    id: "presion",
    Icon: Activity,
    img: IMG.svc5,
    n: "Presión Ocular",
    d: "Tonometría preventiva para detección temprana de glaucoma.",
    full: "La presión intraocular elevada es el principal factor de riesgo del glaucoma. Realizamos tonometría de contacto y sin contacto para un seguimiento preciso.",
    benefits: [
      "Sin dolor ni anestesia en la mayoría de casos",
      "Resultado inmediato",
      "Incluido en el examen de vista",
      "Seguimiento cada 6 o 12 meses",
    ],
  },
  {
    id: "tomografia",
    Icon: Scan,
    img: IMG.doctor,
    n: "Tomografías Oculares",
    d: "Imágenes de alta resolución de retina y nervio óptico con tecnología OCT.",
    full: "La Tomografía de Coherencia Óptica (OCT) obtiene imágenes tridimensionales de las capas de la retina, el nervio óptico y el segmento anterior del ojo. Es fundamental para detectar y monitorear glaucoma, degeneración macular, retinopatía diabética y otras patologías con la máxima precisión. Contamos con el equipo Topcon OCT-1 Maestro2 de última generación.",
    benefits: [
      "Imágenes de alta resolución sin contacto con el ojo",
      "Detección temprana de glaucoma y degeneración macular",
      "Monitoreo de retinopatía diabética",
      "Resultado inmediato con informe detallado",
    ],
  },
  {
    id: "contacto",
    Icon: ScanEye,
    img: IMG.svc6,
    n: "Lentes de Contacto",
    d: "Adaptación personalizada de lentes blandas, rígidas y especiales.",
    full: "Te ayudamos a encontrar el lente de contacto ideal: desde lentes blandas diarias hasta lentes rígidos permeables y ortoqueratología nocturna.",
    benefits: [
      "Prueba gratuita el primer día",
      "Instrucciones de uso y cuidado",
      "Seguimiento de adaptación",
      "Lentes para casos especiales (queratocono)",
    ],
  },
];

export const STEPS_PROCESS: ProcessStep[] = [
  {
    n: "01",
    Icon: Calendar,
    t: "Reserva de Cita",
    d: "Agendas tu cita online o por WhatsApp. Te confirmamos por mensaje.",
  },
  {
    n: "02",
    Icon: User,
    t: "Primera Consulta",
    d: "Evalúamos tu historial visual, síntomas y el motivo de tu visita.",
  },
  {
    n: "03",
    Icon: Eye,
    t: "Examen Completo",
    d: "Realizamos todas las pruebas necesarias según tu caso clínico.",
  },
  {
    n: "04",
    Icon: FileText,
    t: "Diagnóstico",
    d: "El especialista explica los resultados y recomienda el tratamiento.",
  },
  {
    n: "05",
    Icon: Check,
    t: "Solución Personalizada",
    d: "Entregamos receta, lentes o inicio de tratamiento según lo indicado.",
  },
  {
    n: "06",
    Icon: Activity,
    t: "Seguimiento",
    d: "Programamos controles periódicos para asegurar tu bienestar visual.",
  },
];

export const NAV_LINKS = ["Inicio", "Servicios", "Nosotros", "Contacto"];
