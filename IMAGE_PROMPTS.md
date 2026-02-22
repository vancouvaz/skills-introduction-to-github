# CryoSeat — Image Generation Prompts

All images should share a consistent visual language: **dark background (#0A0A0B), cool-to-warm gradient accents (ice blue #A8D8EA → warm amber #FFB347), minimal negative space, premium product photography aesthetic. Think Apple.com meets Eight Sleep's product pages.**

---

## 1. Product Hero Render
**Filename**: `hero.png`
**Dimensions**: 1600 × 900px (16:9, OG-safe)

**Prompt**:
```
Studio product render of a premium office chair seat pad and matching back pad, matte black with subtle textured mesh weave, glowing ice-blue LED accent strip along the edges, placed on a modern black ergonomic office chair (neutral, non-branded), ultra-clean dark studio background (#0A0A0B), three-quarter angle, soft rim lighting, photorealistic, 8K, commercial product photography, Apple product launch aesthetic, no text, no humans
```

**Negative prompt**: `cheap, cartoon, colorful, cluttered, text, logos, humans, bright background`

---

## 2. Lifestyle — Home Office Scene
**Filename**: `lifestyle-office.png`
**Dimensions**: 1600 × 1067px (3:2)

**Prompt**:
```
Cinematic lifestyle photo, beautiful modern home office, late afternoon golden hour light through floor-to-ceiling windows, person seated at a minimal desk (face not visible, only from shoulders back), premium ergonomic chair with sleek black seat and back pads installed, MacBook Pro on desk, clean desk setup, soft warm and cool color contrast, shallow depth of field, shot on Sony A7R with 85mm f/1.4, aspirational remote worker aesthetic, magazine quality
```

**Negative prompt**: `cluttered, cheap furniture, overhead lighting, daylight flat, stock photo style`

---

## 3. Close-Up Material / Texture Detail
**Filename**: `texture-detail.png`
**Dimensions**: 1200 × 1200px (1:1, good for Instagram)

**Prompt**:
```
Extreme close-up macro product photograph, premium breathable mesh fabric in matte charcoal/anthracite, subtle hexagonal micro-perforation pattern for airflow, soft caustic light showing material depth and quality, single cool-blue backlight glow visible through perforations, background pure black, photorealistic, commercial textile photography, luxury material feel
```

**Negative prompt**: `cheap foam, neoprene, car seat, fluffy, colorful`

---

## 4. Thermal Zones Diagram
**Filename**: `thermal-diagram.png`
**Dimensions**: 1200 × 900px (4:3)

**Prompt**:
```
Minimal clean technical illustration, top-down view of a seat pad and side view of a back pad, showing thermal zones as smooth gradient overlays (ice blue for cooling zones, warm amber for heating zones), labeled with thin clean lines (Peltier module zone, air channel, spine support zone), flat design, dark background #0A0A0B, sans-serif white labels, Apple-style infographic aesthetic, no photography, vector-clean style
```

**Negative prompt**: `3D, photorealistic, cluttered, colorful gradients, medical diagram style`

---

## 5. Mobile App Screen Mock — Temperature Schedule
**Filename**: `app-screen.png`
**Dimensions**: 390 × 844px (iPhone 15 Pro resolution)

**Prompt**:
```
UI screen design mockup for a mobile temperature scheduling app, dark mode interface (#0A0A0B background), 24-hour timeline at bottom with draggable heat/cool blocks shown as colored segments (blue blocks for cool, amber blocks for warm), large current temperature display in center (showing 68°F with a minimal circular progress dial), two zone toggles (Seat / Back) with pill-style ON/OFF switches, clean iOS-inspired typography (SF Pro style), status bar at top, no home indicator visible, professional app screenshot quality
```

**Negative prompt**: `android, material design, light mode, cluttered, many colors`

---

## 6. "Before vs After" Comfort Concept
**Filename**: `before-after.png`
**Dimensions**: 1600 × 800px (2:1, split composition)

**Prompt**:
```
Split-screen conceptual image, left half (Before): muted desaturated colors, person at desk slightly slouched with visible discomfort body language, small thermometer icon with uncomfortable temp (77°F), tired/distracted expression implied through posture, office feels warm and stuffy; right half (After): vibrant but controlled palette, same person upright confident focused posture, cool-blue ambient glow from chair, productivity indicators (clean desk, focused stance), comfortable temperature icon (70°F), sharp split line down center with subtle gradient transition, cinematic color grading, no text needed
```

**Negative prompt**: `cartoonish, low quality, split too jarring, stock photo style, text overlays`

---

## Usage Notes

- **Tool recommendations**: Midjourney v6 (photorealistic), DALL·E 3 (diagram/illustration), Stable Diffusion XL (product renders)
- **Midjourney quality flags**: append `--ar 16:9 --v 6 --q 2 --style raw` to product/lifestyle prompts
- **For hero.png**: Run 4 variations, upscale the sharpest, use Photoshop/Figma to composite any minor fixes
- **Placeholder strategy**: Until real renders exist, use gradient placeholder divs in the code with the exact dimensions above — the component code uses `next/image` with `placeholder="blur"` blurDataURL fallbacks
- **File size targets**: hero.png <300KB (compress with squoosh.app or next/image optimization handles it at runtime)
