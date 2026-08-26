import os, math, random

OUT = "/home/claude/portfolio/public/images"

COLORS = {
    "primary": "#3B82F6",
    "accent": "#06B6D4",
    "purple": "#8B5CF6",
}
BG = "#0B1120"
CARD = "#111827"
GRID = "rgba(255,255,255,0.06)"
TEXT_MUTED = "#9CA3AF"

def grid_lines(w, h, step=40):
    lines = []
    x = 0
    while x <= w:
        lines.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="{GRID}" stroke-width="1"/>')
        x += step
    y = 0
    while y <= h:
        lines.append(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="{GRID}" stroke-width="1"/>')
        y += step
    return "".join(lines)

def corner_brackets(w, h, color, pad=22, size=26):
    b = []
    # top-left
    b.append(f'<path d="M{pad} {pad+size} V{pad} H{pad+size}" stroke="{color}" stroke-width="3" fill="none" stroke-linecap="round"/>')
    # top-right
    b.append(f'<path d="M{w-pad-size} {pad} H{w-pad} V{pad+size}" stroke="{color}" stroke-width="3" fill="none" stroke-linecap="round"/>')
    # bottom-left
    b.append(f'<path d="M{pad} {h-pad-size} V{h-pad} H{pad+size}" stroke="{color}" stroke-width="3" fill="none" stroke-linecap="round"/>')
    # bottom-right
    b.append(f'<path d="M{w-pad-size} {h-pad} H{w-pad} V{h-pad-size}" stroke="{color}" stroke-width="3" fill="none" stroke-linecap="round"/>')
    return "".join(b)

def scanline(w, h, color, y_frac=0.42):
    y = int(h * y_frac)
    return f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="{color}" stroke-width="1" stroke-dasharray="6 6" opacity="0.5"/>'

ICONS = {
    "satellite": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="-14" y="-10" width="28" height="20" rx="3"/><line x1="-14" y1="-2" x2="-34" y2="-14"/><line x1="-34" y1="-14" x2="-34" y2="4"/><line x1="14" y1="-2" x2="34" y2="-14"/><line x1="34" y1="-14" x2="34" y2="4"/><circle cx="0" cy="0" r="3" fill="{c}" stroke="none"/></g>',
    "waveform": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-40 0 L-24 0 L-16 -22 L-4 22 L8 -14 L18 10 L28 0 L40 0"/></g>',
    "radar": '<g stroke="{c}" stroke-width="2.5" fill="none"><circle cx="0" cy="0" r="34"/><circle cx="0" cy="0" r="20"/><circle cx="0" cy="0" r="6" fill="{c}" stroke="none"/><line x1="0" y1="0" x2="30" y2="-18"/></g>',
    "medical": '<g stroke="{c}" stroke-width="4" fill="none" stroke-linecap="round"><line x1="0" y1="-24" x2="0" y2="24"/><line x1="-24" y1="0" x2="24" y2="0"/></g>',
    "marketplace": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-28 -14 H28 L24 10 H-24 Z"/><line x1="-16" y1="-14" x2="-8" y2="-28"/><line x1="16" y1="-14" x2="8" y2="-28"/><circle cx="-14" cy="20" r="4"/><circle cx="14" cy="20" r="4"/></g>',
    "bat": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-6 30 L-24 -20 Q-26 -30 -16 -32 Q-6 -34 -4 -24 L14 26 Z"/><line x1="-6" y1="30" x2="-2" y2="40"/></g>',
    "code": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-10 -20 L-30 0 L-10 20"/><path d="M10 -20 L30 0 L10 20"/></g>',
    "rocket": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 -32 C14 -18 14 6 0 26 C-14 6 -14 -18 0 -32 Z"/><circle cx="0" cy="-6" r="4" fill="{c}" stroke="none"/><path d="M-6 18 L-16 32 M6 18 L16 32"/></g>',
    "presentation": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="-30" y="-20" width="60" height="34" rx="3"/><line x1="0" y1="14" x2="0" y2="28"/><line x1="-14" y1="28" x2="14" y2="28"/><path d="M-18 -6 L-6 4 L4 -8 L18 2"/></g>',
    "building": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="-20" y="-30" width="40" height="60" rx="2"/><line x1="-12" y1="-18" x2="-4" y2="-18"/><line x1="4" y1="-18" x2="12" y2="-18"/><line x1="-12" y1="-4" x2="-4" y2="-4"/><line x1="4" y1="-4" x2="12" y2="-4"/><line x1="-12" y1="10" x2="-4" y2="10"/><line x1="4" y1="10" x2="12" y2="10"/></g>',
    "users": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="-12" cy="-10" r="9"/><circle cx="14" cy="-6" r="7"/><path d="M-28 22 C-28 8 -2 8 -2 22"/><path d="M4 22 C4 10 26 10 26 22"/></g>',
    "mic": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="-8" y="-30" width="16" height="30" rx="8"/><path d="M-20 -4 C-20 12 -10 20 0 20 C10 20 20 12 20 -4"/><line x1="0" y1="20" x2="0" y2="32"/><line x1="-12" y1="32" x2="12" y2="32"/></g>',
    "leaf": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-24 24 C-24 -16 24 -24 28 -28 C24 8 8 24 -24 24 Z"/><line x1="-24" y1="24" x2="20" y2="-20"/></g>',
    "eye": '<g stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-32 0 C-18 -20 18 -20 32 0 C18 20 -18 20 -32 0 Z"/><circle cx="0" cy="0" r="9" fill="{c}" stroke="none"/></g>',
}

def make_svg(w, h, label_top, label_main, icon_key, color_key="primary", filename=""):
    color = COLORS[color_key]
    icon_svg = ICONS[icon_key].format(c=color)
    cx, cy = w/2, h/2 - 10
    svg = f'''<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow-{filename}" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="{color}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="{BG}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg-{filename}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{CARD}"/>
      <stop offset="100%" stop-color="{BG}"/>
    </linearGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#bg-{filename})"/>
  <rect width="{w}" height="{h}" fill="url(#glow-{filename})"/>
  <g opacity="0.5">{grid_lines(w, h, 36)}</g>
  {scanline(w, h, color)}
  {corner_brackets(w, h, color)}
  <g transform="translate({cx},{cy}) scale(1.4)">{icon_svg}</g>
  <text x="{w/2}" y="{h-46}" text-anchor="middle" font-family="monospace" font-size="11" letter-spacing="2" fill="{color}" opacity="0.9">{label_top}</text>
  <text x="{w/2}" y="{h-26}" text-anchor="middle" font-family="sans-serif" font-size="13" fill="{TEXT_MUTED}">{label_main}</text>
</svg>'''
    return svg

def write(path, w, h, label_top, label_main, icon_key, color_key="primary"):
    filename = os.path.basename(path).replace(".svg","").replace(".","-")
    svg = make_svg(w, h, label_top, label_main, icon_key, color_key, filename)
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as f:
        f.write(svg)
    print("wrote", full)

# Profile placeholder (portrait)
write("profile-placeholder.svg", 800, 1000, "IMAGE PENDING", "Add profile-photo.jpg to /public/images", "users", "primary")

# Projects
write("projects/satellite-detection.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "Real-Time Object Detection · Satellite Imagery", "satellite", "primary")
write("projects/image-denoising.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "Satellite Image Denoising & Enhancement", "waveform", "accent")
write("projects/bdh-yolo26.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "BDH-YOLO26 · Aircraft Detection Research", "radar", "purple")
write("projects/covid-detection.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "COVID-19 & Pneumonia Detection", "medical", "accent")
write("projects/labour-booking.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "Labour Booking Platform for Farmers", "marketplace", "primary")
write("projects/batsman-analysis.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "Batsman Performance Analysis", "bat", "purple")
write("projects/pose-correction.svg", 800, 500, "PROJECT SCREENSHOT PENDING", "Pose Correction", "code", "primary")

# Gallery
write("gallery/isro-1.svg", 600, 600, "PHOTO PENDING", "ISRO · Space Applications Centre", "rocket", "primary")
write("gallery/isro-2.svg", 600, 600, "PHOTO PENDING", "ISRO · Research Work", "satellite", "primary")
write("gallery/conference-1.svg", 600, 600, "PHOTO PENDING", "IEEE Conference Presentation", "presentation", "accent")
write("gallery/conference-2.svg", 600, 600, "PHOTO PENDING", "Research Conference", "presentation", "accent")
write("gallery/college-1.svg", 600, 600, "PHOTO PENDING", "DMIHER Campus", "building", "purple")
write("gallery/college-2.svg", 600, 600, "PHOTO PENDING", "Student Council / Leadership", "users", "purple")
write("gallery/project-1.svg", 600, 600, "PHOTO PENDING", "Satellite Imagery Research", "eye", "primary")
write("gallery/project-2.svg", 600, 600, "PHOTO PENDING", "Computer Vision Work", "eye", "accent")
write("gallery/community-1.svg", 600, 600, "PHOTO PENDING", "Speaker · Tech4Good Hackathon", "mic", "primary")
write("gallery/community-2.svg", 600, 600, "PHOTO PENDING", "Moderator · Tech4Good Hackathon", "users", "accent")

# OG image
write("og-image.svg", 1200, 630, "PRATHMESH WAGHMARE", "AI/ML Engineer · Computer Vision Researcher", "eye", "primary")

print("ALL DONE")
