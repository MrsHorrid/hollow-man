/**
 * generate-placeholders.js
 * Creates silent placeholder .mp3 files for all expected audio assets.
 * Run: node scripts/generate-placeholders.js
 * 
 * Uses the smallest valid MP3 binary (44 bytes) so the browser doesn't error.
 */

const fs = require('fs');
const path = require('path');

// Minimal valid MP3 frame (silence, 1 frame, ~26ms)
const SILENT_MP3 = Buffer.from([
  0xFF, 0xFB, 0x90, 0x00, // MPEG1, Layer3, 128kbps, 44100Hz
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00
]);

const BASE = path.join(__dirname, '..', 'public', 'audio');

const FILES = {
  'ambient': [
    'wind_low.mp3', 'crickets_night.mp3', 'forest_deep.mp3',
    'distant_scream.mp3', 'wind_howl.mp3', 'heartbeat_faint.mp3', 'water_drip.mp3'
  ],
  'sfx': [
    'footstep_grass_1.mp3', 'footstep_grass_2.mp3', 'footstep_grass_3.mp3',
    'footstep_gravel_1.mp3', 'footstep_gravel_2.mp3',
    'footstep_wood_1.mp3', 'footstep_wood_2.mp3', 'footstep_wood_3.mp3',
    'footstep_concrete_1.mp3', 'footstep_concrete_2.mp3',
    'footstep_dirt_1.mp3', 'footstep_dirt_2.mp3',
    'footstep_metal_1.mp3', 'footstep_metal_2.mp3',
    'footstep_leaves_1.mp3', 'footstep_leaves_2.mp3', 'footstep_leaves_3.mp3',
    'page_reveal.mp3', 'monster_breathing.mp3', 'monster_growl.mp3',
    'monster_scream.mp3', 'monster_footstep.mp3', 'random_scare.mp3',
    'sanity_drain.mp3', 'door_creak.mp3', 'static_burst.mp3'
  ],
  'music': [
    'explore_base.mp3', 'explore_melody.mp3',
    'tension_strings.mp3', 'tension_bass.mp3', 'tension_percussive.mp3',
    'chase_full.mp3', 'chase_percussion.mp3',
    'stinger_monster_found.mp3', 'stinger_escape.mp3', 'stinger_death.mp3',
    'stinger_page_collect.mp3', 'stinger_puzzle_solve.mp3'
  ]
};

let created = 0, skipped = 0;

for (const [dir, files] of Object.entries(FILES)) {
  const dirPath = path.join(BASE, dir);
  fs.mkdirSync(dirPath, { recursive: true });

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, SILENT_MP3);
      console.log(`  ✓ Created placeholder: ${dir}/${file}`);
      created++;
    } else {
      skipped++;
    }
  }
}

console.log(`\n✅ Done. Created: ${created}, Skipped (exists): ${skipped}`);
console.log('Replace these placeholders with real horror audio for maximum terror.');
