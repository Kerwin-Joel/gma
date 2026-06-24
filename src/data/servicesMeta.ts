export interface ServiceMeta {
  category: string;
  pills: string[];
  steps: string[];
  forWho: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const SERVICE_META: Record<string, ServiceMeta> = {
  examen: {
    category: "Salud Visual",
    pills: ["Sin dolor", "Informe médico incluido", "Equipos digitales"],
    steps: [
      "Registro y anamnesis: historial visual y síntomas",
      "Prueba de agudeza visual y refracción subjetiva",
      "Tonometría y evaluación del fondo de ojo",
      "Diagnóstico y entrega de informe médico",
    ],
    forWho: [
      "Adultos que no se examinan hace más de 1 año",
      "Niños desde los 3 años de edad",
      "Personas con diabetes o hipertensión arterial",
      "Usuarios de pantallas más de 6 horas al día",
    ],
    faqs: [
      {
        q: "¿Con qué frecuencia debo realizarlo?",
        a: "Se recomienda una vez al año para adultos sanos, y cada 6 meses si tienes factores de riesgo como diabetes, historial familiar de glaucoma o usas pantallas muchas horas.",
      },
      {
        q: "¿Necesito traer mis lentes actuales?",
        a: "Sí, es muy útil traerlos. Así podemos comparar tu graduación actual con la nueva evaluación y detectar cambios con precisión.",
      },
      {
        q: "¿El examen incluye dilatación de pupilas?",
        a: "Solo si el especialista lo considera necesario para evaluar el fondo de ojo con mayor detalle. Te lo comunicaremos antes de aplicar las gotas.",
      },
    ],
    related: ["graduacion", "presion"],
  },

  graduacion: {
    category: "Óptica",
    pills: ["Más de 200 monturas", "Entrega en 24-48 h", "Garantía incluida"],
    steps: [
      "Evaluación de tu visión y graduación actual",
      "Pruebas de refracción subjetiva y objetiva",
      "Selección del lente ideal para tu estilo de vida",
      "Asesoría en monturas, materiales y filtros",
    ],
    forWho: [
      "Personas con miopía, hipermetropía o astigmatismo",
      "Quienes buscan cambiar o actualizar sus lentes",
      "Usuarios que desean lentes progresivos o bifocales",
      "Personas que trabajan muchas horas frente a pantallas",
    ],
    faqs: [
      {
        q: "¿Cuánto demora la entrega de los lentes?",
        a: "La mayoría de lentes se entregan en 24 a 48 horas. Los lentes especiales (progresivos de alta gama, fotocromáticos) pueden demorar hasta 5 días hábiles.",
      },
      {
        q: "¿Ofrecen garantía en los lentes?",
        a: "Sí. Ofrecemos garantía de adaptación en lentes progresivos por 30 días y garantía por defectos de fabricación en todos nuestros lentes.",
      },
      {
        q: "¿Puedo traer mi propia montura?",
        a: "Por supuesto. Colocamos tus lentes en la montura que prefieras, siempre que sea compatible con los lentes seleccionados.",
      },
    ],
    related: ["examen", "contacto"],
  },

  oftalmologia: {
    category: "Medicina Ocular",
    pills: ["Médicos certificados", "Biomicroscopía digital", "Seguimiento incluido"],
    steps: [
      "Revisión del historial clínico y síntomas",
      "Exploración con biomicroscopio y lámpara de hendidura",
      "Diagnóstico de la patología ocular",
      "Plan de tratamiento farmacológico o quirúrgico",
    ],
    forWho: [
      "Personas con visión borrosa, dolor ocular o destellos",
      "Pacientes diagnosticados con glaucoma o cataratas",
      "Personas con diabetes o hipertensión que requieren control ocular",
      "Post-operados que necesitan seguimiento especializado",
    ],
    faqs: [
      {
        q: "¿En qué se diferencia del examen de vista?",
        a: "La consulta oftalmológica es una cita médica: diagnostica y trata enfermedades del ojo. El examen de vista evalúa la agudeza visual y la necesidad de lentes correctivos.",
      },
      {
        q: "¿Necesito cita previa?",
        a: "Sí, recomendamos reservar con anticipación para garantizarte atención con nuestros especialistas. Puedes agendar por WhatsApp o desde nuestra web.",
      },
      {
        q: "¿Atienden urgencias oftalmológicas?",
        a: "Sí, contamos con atención de urgencias de lunes a sábado. Si tienes pérdida súbita de visión, golpe en el ojo o cuerpo extraño, acude de inmediato.",
      },
    ],
    related: ["presion", "examen"],
  },

  infantil: {
    category: "Pediatría Visual",
    pills: ["Desde los 6 meses", "Ambiente amigable", "Orientación a padres"],
    steps: [
      "Evaluación visual adaptada a la edad del niño",
      "Prueba de agudeza, estrabismo y visión binocular",
      "Detección de ambliopía (ojo vago) y miopía",
      "Orientación completa a los padres con informe",
    ],
    forWho: [
      "Bebés desde los 6 meses de edad",
      "Niños en edad escolar con dificultades de lectura",
      "Niños con antecedentes familiares de estrabismo o miopía",
      "Niños que se quejan de dolores de cabeza o visión borrosa",
    ],
    faqs: [
      {
        q: "¿A qué edad debe ser el primer control visual?",
        a: "Recomendamos el primer control entre los 6 y 12 meses, luego a los 3 años y obligatoriamente antes de iniciar el colegio.",
      },
      {
        q: "¿Cómo sé si mi hijo tiene problemas de visión?",
        a: "Señales de alerta: cerrar un ojo, acercarse mucho a pantallas o libros, torcer la cabeza al mirar, guiñar los ojos o bajo rendimiento escolar.",
      },
      {
        q: "¿El examen es doloroso para el niño?",
        a: "No, todas las pruebas son completamente indoloras. Usamos técnicas especiales para mantener al niño tranquilo en un ambiente amigable.",
      },
    ],
    related: ["examen", "oftalmologia"],
  },

  presion: {
    category: "Prevención",
    pills: ["Sin dolor", "Resultado inmediato", "Control preventivo"],
    steps: [
      "Explicación del procedimiento al paciente",
      "Aplicación de gotas anestésicas (si se requiere tonometría de contacto)",
      "Medición con tonómetro digital de no contacto",
      "Registro, interpretación y seguimiento del resultado",
    ],
    forWho: [
      "Personas mayores de 40 años (mayor riesgo de glaucoma)",
      "Familiares de pacientes diagnosticados con glaucoma",
      "Personas con presión arterial alta o diabetes",
      "Pacientes con migraña o dolor de cabeza frecuente",
    ],
    faqs: [
      {
        q: "¿La tonometría duele?",
        a: "No. La tonometría de no contacto (aire) es completamente indolora y no toca el ojo. Si se requiere la de contacto, se aplican gotas anestésicas antes.",
      },
      {
        q: "¿Con qué frecuencia debo medirme la presión ocular?",
        a: "Si tienes factores de riesgo (diabetes, antecedentes familiares), cada 6 meses. Sin factores, una vez al año como parte de tu examen de vista rutinario.",
      },
      {
        q: "¿Qué pasa si la presión está elevada?",
        a: "El especialista evaluará si necesitas tratamiento. En muchos casos, el glaucoma se controla muy bien con gotas oftálmicas y seguimiento periódico.",
      },
    ],
    related: ["oftalmologia", "examen"],
  },

  contacto: {
    category: "Contactología",
    pills: ["Primera prueba sin costo", "Lentes para casos especiales", "Adaptación garantizada"],
    steps: [
      "Evaluación de la córnea y prueba de ojo seco",
      "Selección del lente adecuado a tu caso clínico",
      "Prueba del lente en el consultorio con el especialista",
      "Instrucciones detalladas de uso, higiene y cuidado",
    ],
    forWho: [
      "Personas con miopía, hipermetropía o astigmatismo",
      "Deportistas que prefieren no usar lentes de marco",
      "Personas que buscan libertad visual en su día a día",
      "Pacientes con queratocono u otras irregularidades corneales",
    ],
    faqs: [
      {
        q: "¿Puedo usar lentes de contacto si tengo ojo seco?",
        a: "En muchos casos sí. Evaluamos tu caso y seleccionamos lentes de alta permeabilidad al oxígeno o con hidratación avanzada, especiales para ojo seco.",
      },
      {
        q: "¿El primer par de lentes de prueba es gratuito?",
        a: "Sí, el primer par de prueba es completamente gratuito durante la consulta de adaptación. Te lo llevas puesto ese mismo día.",
      },
      {
        q: "¿Puedo dormir con lentes de contacto?",
        a: "Solo con lentes especiales de uso nocturno (ortoqueratología). Los lentes convencionales deben retirarse antes de dormir para evitar infecciones e hipoxia corneal.",
      },
    ],
    related: ["graduacion", "examen"],
  },
};
