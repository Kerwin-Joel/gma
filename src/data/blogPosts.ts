// ─── Blog data layer ────────────────────────────────────────────────────────
// Replace BLOG_POSTS with an API call to swap in real CMS content.
// Each `content` array maps 1-to-1 with typical CMS block types.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "tip"; text: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogBlock[];
  category: string;
  categorySlug: string;
  readTime: number;
  publishedAt: string;
  author: { name: string; role: string; initials: string };
  coverImage: string;
  tags: string[];
  featured?: boolean;
  relatedSlugs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "frecuencia-examen-de-la-vista",
    title: "¿Con qué frecuencia debes hacerte un examen de la vista?",
    excerpt:
      "Muchos esperan hasta notar molestias para visitar al optometrista. Te explicamos por qué ese enfoque puede costarte caro y cada cuánto deberías revisarte.",
    category: "Salud Visual",
    categorySlug: "salud-visual",
    readTime: 5,
    publishedAt: "2024-11-12",
    featured: true,
    author: { name: "Dr. Antonio Santamaría", role: "Optometrista", initials: "AS" },
    coverImage:
      "https://yuxpvwinvcewxhfzubov.supabase.co/storage/v1/object/public/gma-photos/kev00870.jpg",
    tags: ["examen de vista", "salud ocular", "prevención"],
    relatedSlugs: ["miopia-ninos-senales", "glaucoma-ladron-silencioso"],
    content: [
      { type: "p", text: "La mayoría de personas acude a una óptica solo cuando algo falla: visión borrosa, dolor de cabeza persistente o dificultad para leer. Sin embargo, muchos problemas oculares —incluidos el glaucoma y las cataratas tempranas— no producen síntomas hasta fases avanzadas. Revisarte de forma regular es la única manera de detectarlos a tiempo." },
      { type: "h2", text: "¿Cada cuánto tiempo según tu edad?" },
      { type: "ul", items: [
        "Niños de 0 a 5 años: primer control entre los 6 y 12 meses de vida, luego a los 3 años.",
        "Niños en edad escolar (6-17 años): anualmente, o antes si hay signos de miopía.",
        "Adultos de 18 a 39 años: cada 2 años si no tienes factores de riesgo.",
        "Adultos de 40 a 64 años: cada año; el cristalino comienza a perder flexibilidad.",
        "Mayores de 65 años: cada 6-12 meses para control de glaucoma, cataratas y degeneración macular.",
      ]},
      { type: "callout", text: "Si tienes diabetes, hipertensión, antecedentes familiares de glaucoma o usas pantallas más de 6 horas al día, el control debe ser anual sin importar tu edad." },
      { type: "h2", text: "¿Qué se evalúa en un examen completo?" },
      { type: "p", text: "Un examen de la vista profesional no consiste solo en leer letras en una pared. En Ópticas GMA realizamos una evaluación integral que incluye:" },
      { type: "ol", items: [
        "Anamnesis: historial visual, síntomas y antecedentes familiares.",
        "Agudeza visual: medición de lo que ves a distintas distancias.",
        "Refracción subjetiva y objetiva: determina si necesitas lentes y con qué graduación.",
        "Tonometría: medición de la presión intraocular para descartar glaucoma.",
        "Biomicroscopía: exploración del segmento anterior del ojo.",
        "Fondo de ojo: evaluación de retina, nervio óptico y mácula.",
      ]},
      { type: "h2", text: "Señales de que deberías acudir antes de la próxima revisión" },
      { type: "ul", items: [
        "Visión borrosa que aparece o empeora de repente.",
        "Destellos de luz o manchas flotantes (miodesopsias) nuevas.",
        "Dolor ocular que no cede en 24 horas.",
        "Ojos rojos con secreción amarillenta o verdosa.",
        "Dolores de cabeza frecuentes al leer o trabajar con pantallas.",
        "Dificultad para ver de noche o con poca luz.",
      ]},
      { type: "tip", text: "Consejo GMA: agenda tu próxima revisión antes de salir de esta página. Reservar con anticipación garantiza horario y te libra de esperas innecesarias." },
      { type: "h2", text: "La revisión como inversión, no como gasto" },
      { type: "p", text: "Detectar un astigmatismo no corregido o una miopía incipiente a tiempo puede ahorrarte años de dolores de cabeza, bajo rendimiento laboral y, en casos extremos, pérdida irreversible de visión. El costo de una revisión anual es marginal comparado con el tratamiento tardío de enfermedades oculares avanzadas." },
    ],
  },
  {
    id: "2",
    slug: "miopia-ninos-senales",
    title: "Miopía en niños: 7 señales que no debes ignorar",
    excerpt:
      "La miopía infantil avanza rápido y, si no se trata a tiempo, puede derivar en complicaciones serias. Aprende a reconocer los síntomas antes de que afecten el rendimiento escolar.",
    category: "Pediatría Visual",
    categorySlug: "pediatria-visual",
    readTime: 6,
    publishedAt: "2024-10-28",
    author: { name: "Dra. Ana Quispe", role: "Optometrista Pediátrica", initials: "AQ" },
    coverImage:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1200&q=80",
    tags: ["miopía", "niños", "salud visual infantil", "pediatría"],
    relatedSlugs: ["frecuencia-examen-de-la-vista", "sindrome-visual-informatico"],
    content: [
      { type: "p", text: "La miopía —dificultad para ver objetos lejanos— afecta ya a 1 de cada 3 niños en Latinoamérica y su prevalencia sigue en aumento. El problema es que los niños raramente verbalizan que ven mal; simplemente se adaptan. Por eso el papel de los padres y maestros en la detección temprana es fundamental." },
      { type: "h2", text: "Las 7 señales de alerta" },
      { type: "ol", items: [
        "Se acerca mucho a la televisión o la pantalla del ordenador.",
        "Guiña los ojos para ver la pizarra o carteles a distancia.",
        "Se queja de dolores de cabeza, especialmente al final del día escolar.",
        "Tuerce o inclina la cabeza para ver mejor.",
        "Evita actividades que requieren buena visión lejana (deporte, excursiones).",
        "Su rendimiento escolar ha bajado sin causa aparente.",
        "Se frota los ojos con frecuencia o parpadea mucho.",
      ]},
      { type: "callout", text: "Un niño de 6 años raramente sabe que su visión es diferente a la del resto. Para él, ver borroso a distancia es simplemente «ver». Solo un examen visual profesional puede confirmarlo." },
      { type: "h2", text: "¿Por qué avanza tan rápido la miopía en niños?" },
      { type: "p", text: "El ojo de un niño está en pleno crecimiento. Si la córnea y el cristalino no se sincronizan correctamente con la longitud axial del globo ocular, el punto focal queda delante de la retina —y nace la miopía. Factores que aceleran ese proceso:" },
      { type: "ul", items: [
        "Herencia genética: si ambos padres son miopes, el riesgo aumenta un 60 %.",
        "Poco tiempo al aire libre: la luz natural regula el crecimiento del ojo.",
        "Exceso de pantallas y lectura de cerca sin descanso.",
      ]},
      { type: "h2", text: "Control de la miopía: opciones disponibles" },
      { type: "p", text: "Hoy existen tratamientos que van más allá de simplemente corregir la visión con lentes. En Ópticas GMA contamos con:" },
      { type: "ul", items: [
        "Lentes de control de miopía: diseño especial que frena la progresión.",
        "Lentes de contacto blandas multifocales para niños.",
        "Ortoqueratología (ortok): lentes nocturnos que remodelan la córnea durante el sueño.",
        "Colirios de atropina a baja dosis bajo supervisión médica.",
      ]},
      { type: "tip", text: "La evidencia científica muestra que pasar al menos 2 horas diarias al aire libre reduce significativamente el riesgo de desarrollar miopía. La luz natural es el protector visual más barato del mundo." },
      { type: "h2", text: "¿Cuándo llevar a tu hijo al optometrista?" },
      { type: "p", text: "No esperes a que muestre señales. El primer control visual debe realizarse antes del año de vida, luego a los 3 años y obligatoriamente antes de ingresar al colegio. Si hay antecedentes familiares de miopía, no posposes la cita: cuanto antes se detecte, mayor el margen de actuación." },
    ],
  },
  {
    id: "3",
    slug: "lentes-progresivos-vs-bifocales",
    title: "Lentes progresivos vs. bifocales: guía definitiva para elegir bien",
    excerpt:
      "A partir de los 40, la presbicia nos alcanza a todos. Pero elegir entre progresivos y bifocales no es trivial. Aquí te explicamos las diferencias reales para que tomes la mejor decisión.",
    category: "Óptica",
    categorySlug: "optica",
    readTime: 7,
    publishedAt: "2024-10-10",
    author: { name: "Dr. Antonio Santamaría", role: "Optometrista", initials: "AS" },
    coverImage:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80",
    tags: ["lentes progresivos", "bifocales", "presbicia", "graduación"],
    relatedSlugs: ["frecuencia-examen-de-la-vista", "lentes-de-contacto-guia"],
    content: [
      { type: "p", text: "La presbicia, conocida popularmente como «vista cansada», aparece entre los 40 y 45 años y es completamente normal. El cristalino pierde elasticidad y ya no puede enfocar con rapidez objetos cercanos. El resultado: la letra pequeña empieza a exigir más distancia y la luz del móvil se vuelve insuficiente." },
      { type: "h2", text: "¿Qué son los lentes bifocales?" },
      { type: "p", text: "Los bifocales tienen dos zonas de visión claramente separadas por una línea visible: la parte superior para lejos y la inferior para cerca. Fueron inventados por Benjamin Franklin y durante décadas fueron la única opción para la presbicia." },
      { type: "ul", items: [
        "Ventajas: precio más accesible, adaptación más rápida, visión nítida en ambas zonas.",
        "Desventajas: la línea divisoria es visible (estética), salto de imagen al cambiar de zona, sin visión intermedia (distancia de trabajo en ordenador).",
      ]},
      { type: "h2", text: "¿Qué son los lentes progresivos?" },
      { type: "p", text: "Los progresivos eliminan la línea divisoria y ofrecen una transición suave entre visión lejana, intermedia y cercana en un único lente. Son la solución más completa para la vida moderna, donde usamos pantallas a distancia intermedia constantemente." },
      { type: "ul", items: [
        "Ventajas: estética natural sin líneas, visión continua a todas las distancias, mayor confort visual en el trabajo digital.",
        "Desventajas: período de adaptación de 1 a 3 semanas, zonas periféricas algo distorsionadas, mayor costo que los bifocales.",
      ]},
      { type: "callout", text: "Los progresivos de alta gama de última generación reducen drásticamente las zonas de distorsión periférica. Un diseño personalizado según tu pupila y montura mejora notablemente la adaptación." },
      { type: "h2", text: "¿Cuál te conviene según tu estilo de vida?" },
      { type: "ul", items: [
        "Trabajas muchas horas frente al ordenador → progresivos con diseño office o digital.",
        "Eres activo y practicas deportes → progresivos en montura wrap o lentes de contacto multifocales.",
        "Buscas la opción más económica y no te molesta la línea → bifocales son perfectamente válidos.",
        "Conduces habitualmente → progresivos con zona lejana amplia.",
      ]},
      { type: "h2", text: "El proceso de adaptación a los progresivos" },
      { type: "p", text: "Es normal sentir ligero mareo o inestabilidad los primeros días. Tu cerebro necesita aprender a seleccionar la zona del lente según la distancia. Algunos consejos:" },
      { type: "ol", items: [
        "Úsalos desde el primer día, no los alternes con tus lentes anteriores.",
        "Mueve la cabeza hacia el objeto que quieres ver, no solo los ojos.",
        "Lee con la barbilla ligeramente elevada para usar la zona inferior del lente.",
        "Si a las 3 semanas la adaptación no mejora, regresa a tu óptico: el centrado puede necesitar ajuste.",
      ]},
      { type: "tip", text: "En Ópticas GMA ofrecemos garantía de adaptación de 30 días en lentes progresivos. Si no te adaptas, buscamos la solución sin coste adicional." },
    ],
  },
  {
    id: "4",
    slug: "glaucoma-ladron-silencioso",
    title: "Glaucoma: el ladrón silencioso de la visión que debes conocer",
    excerpt:
      "El glaucoma destruye el nervio óptico sin dolor y sin avisar. Para cuando los síntomas aparecen, hasta el 40 % del campo visual ya puede estar perdido. La prevención es la única defensa.",
    category: "Prevención",
    categorySlug: "prevencion",
    readTime: 6,
    publishedAt: "2024-09-20",
    author: { name: "Dra. Ana Quispe", role: "Optometrista Pediátrica", initials: "AQ" },
    coverImage:
      "https://yuxpvwinvcewxhfzubov.supabase.co/storage/v1/object/public/gma-photos/kev00940.jpg",
    tags: ["glaucoma", "presión ocular", "prevención", "tonometría"],
    relatedSlugs: ["frecuencia-examen-de-la-vista", "primera-consulta-oftalmologica"],
    content: [
      { type: "p", text: "El glaucoma es la segunda causa de ceguera irreversible en el mundo, solo por detrás de las cataratas. Lo que lo hace especialmente peligroso es su silencio: en la forma más común, el ángulo abierto, no produce dolor ni cambios visibles hasta que el daño es significativo." },
      { type: "h2", text: "¿Qué es exactamente el glaucoma?" },
      { type: "p", text: "El ojo produce constantemente un líquido llamado humor acuoso que nutre las estructuras internas y luego se drena. Cuando ese drenaje falla, la presión intraocular sube. Una presión elevada sostenida comprime el nervio óptico —el cable que envía las imágenes al cerebro— y lo daña de forma irreversible. Las células del nervio óptico no se regeneran." },
      { type: "callout", text: "El campo visual periférico es el primero en afectarse. Como el cerebro compensa este «punto ciego» silenciosamente, muchas personas no notan la pérdida hasta que la visión central también empieza a comprometerse." },
      { type: "h2", text: "Factores de riesgo: ¿estás en el grupo vulnerable?" },
      { type: "ul", items: [
        "Presión intraocular superior a 21 mmHg.",
        "Familiares de primer grado con glaucoma (riesgo 4 veces mayor).",
        "Mayores de 60 años.",
        "Personas de ascendencia africana o latinoamericana (mayor prevalencia).",
        "Miopía alta (mayor de 6 dioptrías).",
        "Uso prolongado de corticosteroides en gotas o sistémicos.",
        "Historial de traumatismos oculares.",
      ]},
      { type: "h2", text: "Diagnóstico: qué pruebas se realizan" },
      { type: "ol", items: [
        "Tonometría: mide la presión intraocular. En GMA usamos tonómetro de no contacto, completamente indoloro.",
        "Paquimetría: mide el grosor corneal para interpretar correctamente la tonometría.",
        "Campimetría: evalúa el campo visual y detecta pérdidas periféricas.",
        "OCT de nervio óptico: imagen de alta definición del nervio para detectar adelgazamiento.",
        "Gonioscopia: examina el ángulo de drenaje para clasificar el tipo de glaucoma.",
      ]},
      { type: "h2", text: "Tratamiento: controlar, no curar" },
      { type: "p", text: "El glaucoma no tiene cura, pero se puede controlar para detener su progresión. Las opciones incluyen:" },
      { type: "ul", items: [
        "Colirios hipotensores: la primera línea de tratamiento, aplicados una o dos veces al día.",
        "Láser (trabeculoplastia): mejora el drenaje del humor acuoso.",
        "Cirugía (trabeculectomía o implante de válvulas): reservada para casos avanzados.",
      ]},
      { type: "tip", text: "Un diagnóstico temprano de glaucoma permite conservar prácticamente toda la visión con tratamiento médico sencillo. Medir la presión ocular anualmente después de los 40 puede literalmente salvar tu visión." },
    ],
  },
  {
    id: "5",
    slug: "lentes-de-contacto-guia",
    title: "Cómo elegir los lentes de contacto correctos para tu estilo de vida",
    excerpt:
      "No todos los lentes de contacto son iguales. Blandos, rígidos, diarios, mensuales, tóricos… esta guía te ayuda a navegar el mundo de la contactología sin perderte.",
    category: "Contactología",
    categorySlug: "contactologia",
    readTime: 7,
    publishedAt: "2024-09-05",
    author: { name: "Dr. Antonio Santamaría", role: "Optometrista", initials: "AS" },
    coverImage:
      "https://plus.unsplash.com/premium_photo-1667520064784-1ad031e45a4f?w=1200&auto=format&fit=crop&q=80",
    tags: ["lentes de contacto", "contactología", "ojo seco", "miopía"],
    relatedSlugs: ["lentes-progresivos-vs-bifocales", "sindrome-visual-informatico"],
    content: [
      { type: "p", text: "Los lentes de contacto modernos son muy distintos a los de hace 20 años. Los materiales de alta permeabilidad al oxígeno, los diseños personalizados y las opciones para ojos secos han abierto la puerta a millones de personas que antes no podían usarlos. La clave está en una adaptación profesional correcta." },
      { type: "h2", text: "Tipos de lentes según el material" },
      { type: "h3", text: "Lentes blandas (hidrofílicas)" },
      { type: "p", text: "Las más populares. Fabricadas en hidrogel o silicona-hidrogel, son cómodas desde el primer uso y tienen alta permeabilidad al oxígeno. Son la opción recomendada para la mayoría de pacientes." },
      { type: "h3", text: "Lentes rígidas permeables al gas (RPG)" },
      { type: "p", text: "Ofrecen una agudeza visual superior en casos de astigmatismo irregular, queratocono o córneas con irregularidades. Requieren mayor período de adaptación pero su durabilidad y calidad óptica son excelentes." },
      { type: "h2", text: "Tipos según la frecuencia de reemplazo" },
      { type: "ul", items: [
        "Diarios: la opción más higiénica. Se descartan cada noche. Ideales para uso ocasional, alérgicos o personas propensas a infecciones.",
        "Quincenales o mensuales: mejor relación coste-uso para quienes los llevan todos los días.",
        "Anuales: principalmente lentes rígidos o de diseño personalizado.",
      ]},
      { type: "callout", text: "La causa más frecuente de infecciones por lentes de contacto es reutilizarlos más tiempo del indicado. Respetar el calendario de reemplazo es tan importante como la higiene de manos." },
      { type: "h2", text: "¿Puedo usar lentes de contacto si tengo ojo seco?" },
      { type: "p", text: "El ojo seco es la principal razón por la que algunas personas abandonan los lentes de contacto. Sin embargo, la ciencia ha avanzado mucho:" },
      { type: "ul", items: [
        "Lentes de silicona-hidrogel de alta hidratación reducen la evaporación lagrimal.",
        "Lentes diarios mini-esclerales cubren la córnea sin tocarla, ideales para ojo seco severo.",
        "Cambiar la solución de mantenimiento puede mejorar dramáticamente el confort.",
      ]},
      { type: "h2", text: "Lentes para astigmatismo: los lentes tóricos" },
      { type: "p", text: "Durante años se creyó que el astigmatismo era incompatible con los lentes de contacto. Hoy los lentes tóricos —con diseño de estabilización rotacional— corrigen el astigmatismo con gran precisión. La clave está en una adaptación meticulosa para asegurar que el eje se mantenga estable." },
      { type: "tip", text: "En Ópticas GMA la primera prueba de lentes de contacto es gratuita. Te los ajustamos en consulta y te los llevas ese mismo día para que los evalúes en tu entorno real antes de decidir." },
      { type: "h2", text: "Reglas de oro para un uso seguro" },
      { type: "ol", items: [
        "Lávate las manos antes de manipular los lentes.",
        "Nunca uses agua del grifo para limpiarlos o guardarlos.",
        "No los uses mientras duermes (salvo ortok bajo prescripción).",
        "Sustituye el estuche cada 1-3 meses.",
        "Ante cualquier enrojecimiento, dolor o visión borrosa: retíralos y consulta.",
      ]},
    ],
  },
  {
    id: "6",
    slug: "sindrome-visual-informatico",
    title: "Síndrome visual informático: protege tus ojos frente a pantallas",
    excerpt:
      "8 horas mirando una pantalla producen fatiga ocular, ojo seco y cefaleas. Aprende por qué ocurre y las estrategias reales para aliviar el síndrome visual informático.",
    category: "Salud Visual",
    categorySlug: "salud-visual",
    readTime: 5,
    publishedAt: "2024-08-18",
    author: { name: "Dr. Antonio Santamaría", role: "Optometrista", initials: "AS" },
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    tags: ["pantallas", "fatiga ocular", "ojo seco", "trabajo digital"],
    relatedSlugs: ["frecuencia-examen-de-la-vista", "miopia-ninos-senales"],
    content: [
      { type: "p", text: "El Síndrome Visual Informático (SVI) —también llamado Computer Vision Syndrome— afecta a más del 75 % de los trabajadores que usan pantallas más de 2 horas al día según la Academia Americana de Optometría. No es una enfermedad grave, pero deteriora significativamente la calidad de vida y productividad si no se atiende." },
      { type: "h2", text: "¿Por qué las pantallas cansan tanto los ojos?" },
      { type: "p", text: "Cuando miramos una pantalla, nuestros ojos realizan miles de pequeños movimientos de enfoque por hora. Además, parpadeamos un 60 % menos de lo normal —entre 3 y 7 veces por minuto en vez de las 15-20 habituales—, lo que reduce la lubricación y genera sequedad." },
      { type: "ul", items: [
        "El contraste texto-fondo es menor que en papel impreso, forzando más trabajo al músculo ciliar.",
        "El brillo variable y los reflejos de la pantalla generan ajustes continuos de adaptación.",
        "La distancia de trabajo suele ser subóptima: ni cerca (lectura) ni lejos.",
      ]},
      { type: "h2", text: "Síntomas más comunes" },
      { type: "ul", items: [
        "Ojos rojos, irritados o sensación de arenilla.",
        "Visión borrosa o doble al final del día.",
        "Dolores de cabeza frontales o en la sien.",
        "Cuello y hombros tensos (postura para compensar la visión).",
        "Dificultad para enfocar después de largas sesiones.",
        "Sensibilidad a la luz.",
      ]},
      { type: "callout", text: "El SVI no daña permanentemente la visión, pero puede enmascarar problemas reales como una graduación incorrecta o un astigmatismo no corregido. Si los síntomas son frecuentes, conviene una revisión completa." },
      { type: "h2", text: "La regla 20-20-20: simple y efectiva" },
      { type: "p", text: "Cada 20 minutos de pantalla, mira durante 20 segundos a un objeto a 20 pies de distancia (unos 6 metros). Esto relaja el músculo ciliar y reduce la fatiga acumulada. Existen aplicaciones y extensiones de navegador que te recuerdan el descanso automáticamente." },
      { type: "h2", text: "Ajustes que marcan la diferencia" },
      { type: "ol", items: [
        "Brillo de pantalla similar al del entorno: ni más oscuro ni más brillante que la habitación.",
        "Temperatura de color cálida por la tarde (Night Mode / filtro azul).",
        "Pantalla a 50-70 cm de los ojos, ligeramente por debajo del nivel de la vista.",
        "Tipo de letra 12pt mínimo y contraste alto.",
        "Humidificador en oficinas con aire acondicionado.",
        "Lagrimas artificiales sin conservantes para aliviar el ojo seco durante la jornada.",
      ]},
      { type: "h2", text: "Lentes especiales para trabajo digital" },
      { type: "p", text: "Existen diseños de lentes específicos para distancias de trabajo digital que relajan el músculo de acomodación y reducen la fatiga. En Ópticas GMA contamos con lentes antifatiga y lentes ocupacionales (office) que mejoran notablemente el confort en jornadas largas de pantalla." },
      { type: "tip", text: "Si trabajas más de 6 horas al día frente a una pantalla, mencíonalo en tu próxima revisión. Hay una solución óptica específica para ti que puede cambiar tu calidad de vida laboral." },
    ],
  },
  {
    id: "7",
    slug: "alimentacion-salud-visual",
    title: "Alimentos que cuidan tu visión: la dieta que tus ojos necesitan",
    excerpt:
      "Lo que comes afecta directamente la salud de tu retina, cristalino y nervio óptico. Estos son los nutrientes esenciales para tener ojos sanos a largo plazo.",
    category: "Salud Visual",
    categorySlug: "salud-visual",
    readTime: 5,
    publishedAt: "2024-07-30",
    author: { name: "Dra. Ana Quispe", role: "Optometrista Pediátrica", initials: "AQ" },
    coverImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    tags: ["nutrición", "retina", "macular", "antioxidantes"],
    relatedSlugs: ["glaucoma-ladron-silencioso", "frecuencia-examen-de-la-vista"],
    content: [
      { type: "p", text: "Los ojos son uno de los órganos metabólicamente más activos del cuerpo. La retina, en particular, es extremadamente sensible al estrés oxidativo. Una dieta rica en antioxidantes, vitaminas y minerales específicos puede reducir significativamente el riesgo de degeneración macular, cataratas y retinopatía diabética." },
      { type: "h2", text: "Luteína y zeaxantina: los protectores de la mácula" },
      { type: "p", text: "Estos dos carotenoides se concentran en la mácula —la zona de la retina responsable de la visión central— y actúan como «gafas de sol» naturales, filtrando la luz azul de alta energía. La evidencia científica (estudio AREDS2) muestra que reducen el riesgo de degeneración macular en un 25 %." },
      { type: "ul", items: [
        "Fuentes principales: col rizada (kale), espinacas, yema de huevo, brócoli, guisantes.",
        "Dosis recomendada: 10 mg de luteína y 2 mg de zeaxantina diarios.",
      ]},
      { type: "h2", text: "Omega-3: contra el ojo seco y la inflamación" },
      { type: "p", text: "Los ácidos grasos EPA y DHA son componentes estructurales de la retina y las glándulas de Meibomio (responsables de la capa lipídica de la lágrima). Su deficiencia está directamente relacionada con el síndrome de ojo seco." },
      { type: "ul", items: [
        "Fuentes animales (mayor biodisponibilidad): salmón, sardinas, caballa, trucha.",
        "Fuentes vegetales: linaza, chía, nueces (contienen ALA, que el cuerpo convierte parcialmente).",
      ]},
      { type: "h2", text: "Vitamina A: esencial para la visión nocturna" },
      { type: "p", text: "La vitamina A es precursora de la rodopsina, el pigmento fotorreceptor de los bastones que permiten ver con poca luz. Su deficiencia —poco común en países con dietas variadas— es la principal causa de ceguera nocturna evitable en el mundo." },
      { type: "ul", items: [
        "Vitamina A preformada (retinol): hígado, huevos, lácteos.",
        "Betacaroteno (provitamina A): zanahoria, batata, calabaza, mango.",
      ]},
      { type: "callout", text: "Los suplementos de vitamina A en dosis altas pueden ser tóxicos. La mejor estrategia es obtenerla de alimentos. Consulta con tu médico antes de tomar suplementos de retinol." },
      { type: "h2", text: "Vitamina C y E: antioxidantes contra las cataratas" },
      { type: "p", text: "El cristalino es especialmente vulnerable al daño oxidativo porque tiene muy poca capacidad antirregenerativa. Las vitaminas C y E neutralizan los radicales libres que aceleran la opacificación del cristalino (cataratas)." },
      { type: "ul", items: [
        "Vitamina C: pimiento rojo, kiwi, fresas, cítricos, brócoli.",
        "Vitamina E: aceite de girasol, almendras, semillas de girasol, espinacas.",
      ]},
      { type: "tip", text: "Un patrón dietético mediterráneo —aceite de oliva, pescado, verduras de hoja verde, frutos secos y legumbres— proporciona naturalmente todos los nutrientes protectores de la visión en proporciones equilibradas." },
    ],
  },
  {
    id: "8",
    slug: "primera-consulta-oftalmologica",
    title: "Primera consulta oftalmológica: qué esperar y cómo prepararte",
    excerpt:
      "Si nunca has ido a una consulta oftalmológica o llevas años sin hacerlo, esta guía te explica exactamente qué ocurrirá para que llegues tranquilo y aproveches al máximo la visita.",
    category: "Medicina Ocular",
    categorySlug: "medicina-ocular",
    readTime: 5,
    publishedAt: "2024-07-08",
    author: { name: "Dr. Antonio Santamaría", role: "Optometrista", initials: "AS" },
    coverImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    tags: ["oftalmología", "consulta médica", "examen ocular", "primera visita"],
    relatedSlugs: ["frecuencia-examen-de-la-vista", "glaucoma-ladron-silencioso"],
    content: [
      { type: "p", text: "La consulta oftalmológica genera cierta aprensión en muchas personas, especialmente si es la primera vez. Sin embargo, se trata de una de las revisiones médicas más cómodas e indoloras que existen. Saber qué esperar reduce la ansiedad y te permite colaborar mejor con el especialista." },
      { type: "h2", text: "Antes de llegar: cómo prepararte" },
      { type: "ul", items: [
        "Anota tus síntomas con detalle: cuándo aparecieron, qué los empeora o mejora.",
        "Lleva tus lentes actuales (gafas y/o lentes de contacto) aunque no los uses habitualmente.",
        "Trae el informe de la última revisión si lo tienes.",
        "Informa al especialista sobre tus medicamentos generales: algunos afectan la visión o la presión ocular.",
        "Si usas lentes de contacto blandas, retíralas al menos 2 horas antes (o según indicación de la clínica).",
        "Si se programó dilatación de pupilas, ve acompañado: no podrás conducir en las siguientes 4-6 horas.",
      ]},
      { type: "h2", text: "Estructura de la consulta" },
      { type: "h3", text: "1. Anamnesis (5-10 minutos)" },
      { type: "p", text: "El especialista recoge tu historial: síntomas actuales, antecedentes personales (diabetes, hipertensión, alergias), antecedentes familiares de enfermedades oculares y medicación actual. Esta conversación es fundamental: no omitas información aunque no te parezca relevante." },
      { type: "h3", text: "2. Agudeza visual (5 minutos)" },
      { type: "p", text: "Con cada ojo por separado leerás letras o símbolos a distancia. Si llevas lentes, la prueba se realizará con y sin ellos para comparar la corrección actual." },
      { type: "h3", text: "3. Refracción (10-15 minutos)" },
      { type: "p", text: "El optometrista usará una «gafa de prueba» con lentes intercambiables para encontrar la corrección exacta. Te preguntará «¿ves mejor así o así?» varias veces: no hay respuestas incorrectas, es un proceso de aproximación." },
      { type: "h3", text: "4. Tonometría (2 minutos)" },
      { type: "p", text: "Una pequeña bocanada de aire mide la presión intraocular. No duele. Es la prueba de cribado para glaucoma." },
      { type: "h3", text: "5. Biomicroscopía y fondo de ojo (5-10 minutos)" },
      { type: "p", text: "Con la lámpara de hendidura el especialista examina córnea, cristalino y retina. Si se dilatan las pupilas con gotas (midriáticos), tendrás visión borrosa de cerca durante 2-4 horas y sensibilidad a la luz." },
      { type: "callout", text: "No existen preguntas tontas en una consulta oftalmológica. Si algo no quedó claro —el diagnóstico, el porqué del tratamiento o los efectos secundarios— pregunta. Un buen especialista siempre tiene tiempo para explicar." },
      { type: "h2", text: "Después de la consulta: qué hacer con el informe" },
      { type: "p", text: "El especialista te entregará un informe con la graduación (si aplica) y las conclusiones del examen. Si se recetó tratamiento farmacológico, sigue las indicaciones al pie de la letra. Si se prescribieron lentes nuevos, tráelos a Ópticas GMA: te asesoraremos en monturas y materiales adaptados a tu actividad diaria." },
      { type: "tip", text: "Guarda todos tus informes oftalmológicos. La evolución de tu prescripción a lo largo de los años es información muy valiosa para detectar progresiones o cambios anómalos." },
    ],
  },
];

export const CATEGORIES = [
  { label: "Todos", slug: "todos" },
  { label: "Salud Visual", slug: "salud-visual" },
  { label: "Óptica", slug: "optica" },
  { label: "Pediatría Visual", slug: "pediatria-visual" },
  { label: "Prevención", slug: "prevencion" },
  { label: "Contactología", slug: "contactologia" },
  { label: "Medicina Ocular", slug: "medicina-ocular" },
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
