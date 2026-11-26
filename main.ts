// China in Numbers — a national statistics site for make.fun.
// The site itself is plain static files under app/ (index.html, style.css
// and ES modules, no build step, nothing loaded over the network). This
// program hands it in: it copies app/ and screenshots/ from beside this
// file into /output and writes /output/dossier.json, the summary the judge
// reads, with the vendored make.fun library. Leave vendor/makefun-frontend.ts
// unchanged: the scorer requires dossier.json to be byte for byte what its
// own copy of that library writes.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps: at most 4 screenshots, each at most 256 KiB;
// at most 993 files and directories in app/ and 16 MiB of app files.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
