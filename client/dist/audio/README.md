# Audio Assets — The Hollow Man

All audio files belong here. The engine expects `.mp3` files.

## Directory Structure

```
audio/
├── ambient/           # Looping background soundscapes
│   ├── wind_low.mp3           — Slow, low-frequency wind drone
│   ├── crickets_night.mp3     — Nighttime insect ambience
│   ├── forest_deep.mp3        — Deep forest atmosphere
│   ├── distant_scream.mp3     — Far-off human scream (rare trigger)
│   ├── wind_howl.mp3          — Sudden wind gust scare
│   ├── heartbeat_faint.mp3    — Barely audible heartbeat loop
│   └── water_drip.mp3         — Dripping water ambience
│
├── sfx/               # One-shot sound effects
│   ├── footstep_grass_[1-3].mp3
│   ├── footstep_gravel_[1-2].mp3
│   ├── footstep_wood_[1-3].mp3
│   ├── footstep_concrete_[1-2].mp3
│   ├── footstep_dirt_[1-2].mp3
│   ├── footstep_metal_[1-2].mp3
│   ├── footstep_leaves_[1-3].mp3
│   ├── page_reveal.mp3        — Page collection sound
│   ├── monster_breathing.mp3  — Wet, ragged breathing loop
│   ├── monster_growl.mp3      — Low aggressive growl
│   ├── monster_scream.mp3     — Full jumpscare stinger scream
│   ├── monster_footstep.mp3   — Heavy monster step
│   ├── random_scare.mp3       — Random atmospheric scare
│   ├── sanity_drain.mp3       — Sanity loss tone
│   ├── door_creak.mp3         — Creaking door
│   └── static_burst.mp3       — Radio static / glitch noise
│
├── jumpscares/        # Monster face images for visual scare
│   ├── monster_face_1.jpg     — Main monster close-up
│   ├── monster_face_2.jpg     — Monster from below angle
│   └── monster_face_3.jpg     — Monster with open mouth
│
└── music/             # Layered stems + stingers
    ├── explore_base.mp3       — Looping: minimal drone, sparse piano
    ├── explore_melody.mp3     — Looping: faint eerie melody layer
    ├── tension_strings.mp3    — Looping: building string tension
    ├── tension_bass.mp3       — Looping: sub-bass pulse
    ├── tension_percussive.mp3 — Looping: staccato horror hits
    ├── chase_full.mp3         — Looping: full chase orchestral track
    ├── chase_percussion.mp3   — Looping: driving percussion layer
    ├── stinger_monster_found.mp3 — One-shot: monster spots you
    ├── stinger_escape.mp3        — One-shot: escape relief
    ├── stinger_death.mp3         — One-shot: death sting
    ├── stinger_page_collect.mp3  — One-shot: page reveal
    └── stinger_puzzle_solve.mp3  — One-shot: puzzle solved
```

## Sourcing Free Horror Audio

Recommended royalty-free sources:
- **freesound.org** — Community sounds, CC licensed
- **zapsplat.com** — Free with account, horror pack available
- **pixabay.com/sound-effects** — Free, horror category
- **soundsnap.com** — Paid but high quality
- **OpenGameArt.org** — Game-specific assets

### Quick Freesound Searches
- `wind ambience`: ID 458447, 416416
- `crickets night`: ID 66005, 381727  
- `heartbeat`: ID 263142, 263143
- `footstep grass`: ID 179088, 179091
- `horror stinger`: ID 456888, 399934
- `monster breathing`: ID 519448, 329705

## Generating Placeholder Tones

Run `node scripts/generate-placeholders.js` to create silent placeholder files
so the engine doesn't throw load errors during development.
