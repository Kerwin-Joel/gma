import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Read .env.local
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, "../.env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf-8")
    .split("\n")
    .filter(l => l.trim() && !l.startsWith("#"))
    .map(l => l.split("=").map((s, i) => (i === 0 ? s.trim() : l.slice(l.indexOf("=") + 1).trim())))
);

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PHOTOS_DIR } = env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !PHOTOS_DIR) {
  console.error("Faltan variables en .env.local"); process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BUCKET = "gma-photos";

// Mapping: filename → theme key (what each photo maps to in theme.ts)
const MAP = {
  "KEV00865.jpg": "DOCTOR_IMG",   // Dr. Antonio smiling, portrait
  "KEV00960.jpg": "doctor",       // Dr. con Topcon OCT-1 Maestro2
  "KEV00853.jpg": "about",        // Equipo completo, poses relajadas
  "KEV00920.jpg": "clinic",       // Interior tienda vacía, profesional
  "KEV00870.jpg": "exam",         // Examen lámpara de hendidura
  "KEV00890.jpg": "process",      // Examen autorefractómetro ERK-9000
  "KEV00873.jpg": "svc1",         // Lámpara hendidura, fondo GMA
  "KEV00902.jpg": "svc2",         // Slit lamp, paciente joven
  "KEV00880.jpg": "svc3",         // Cover test
  "KEV00940.jpg": "svc4",         // Paciente en Topcon OCT
  "KEV00856.jpg": "svc5",         // Equipo completo tienda amplia
  "KEV00854.jpg": "svc6",         // Equipo variante
  "TOÑO1.png":    "hero_doctor",  // Dr. en consultorio de la empresa
  "TOÑO2.png":    "hero_team",    // Dr. con pacientes en consultorio
};

async function main() {
  // Create bucket if it doesn't exist
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) { console.error("Error creando bucket:", error.message); process.exit(1); }
    console.log(`✓ Bucket '${BUCKET}' creado`);
  } else {
    console.log(`✓ Bucket '${BUCKET}' ya existe`);
  }

  const files = readdirSync(PHOTOS_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`\nSubiendo ${files.length} fotos...\n`);

  const results = {};

  for (const file of files) {
    const filePath = join(PHOTOS_DIR, file);
    const data = readFileSync(filePath);
    const mime = file.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
    const storageName = file.toLowerCase().replace(/\s/g, "-");

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storageName, data, { contentType: mime, upsert: true });

    if (error) {
      console.error(`✗ ${file}: ${error.message}`);
    } else {
      const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storageName);
      const key = MAP[file] ?? file;
      results[key] = publicUrl;
      console.log(`✓ ${file} → ${key}`);
    }
  }

  console.log("\n=== URLs para theme.ts ===\n");
  console.log("export const DOCTOR_IMG =");
  console.log(`  "${results["DOCTOR_IMG"]}";`);
  console.log("\nexport const IMG = {");
  const keys = ["doctor","clinic","about","exam","process","svc1","svc2","svc3","svc4","svc5","svc6","blog1","blog2","blog3","blog4"];
  for (const k of keys) {
    if (results[k]) console.log(`  ${k}: "${results[k]}",`);
  }
  console.log("};");

  console.log("\n=== Extra / sin asignar ===");
  for (const [k, v] of Object.entries(results)) {
    if (!keys.includes(k) && k !== "DOCTOR_IMG") console.log(`  ${k}: "${v}"`);
  }
}

main().catch(console.error);
