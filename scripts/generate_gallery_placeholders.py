"""
Generates clean, dashed-border "add your photo" placeholder tiles for the
Gallery section. These are intentionally NOT meant to look like real photos —
the gallery is meant to hold Prathmesh's actual personal photos (ISRO SAC,
conference presentations, campus, community events), which only he has.
This just makes the empty slots look considered rather than like a broken
image, and tells him exactly which file to drop in.
"""
import os

OUT = "/home/claude/portfolio/portfolio/public/images/gallery"
os.makedirs(OUT, exist_ok=True)

BG = "#0B1120"
CARD = "#111827"
BORDER = "rgba(255,255,255,0.14)"
TEXT_MUTED = "#9CA3AF"
TEXT_DIM = "#64748B"

BLUE = "#3B82F6"
CYAN = "#06B6D4"
PURPLE = "#8B5CF6"

W = H = 600

def camera_icon(cx, cy, color, scale=1.0):
    return f'''<g transform="translate({cx},{cy}) scale({scale})" stroke="{color}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
      <path d="M-34 -14 L-24 -14 L-18 -24 L18 -24 L24 -14 L34 -14 C37 -14 40 -11 40 -8 L40 20 C40 23 37 26 34 26 L-34 26 C-37 26 -40 23 -40 20 L-40 -8 C-40 -11 -37 -14 -34 -14 Z"/>
      <circle cx="0" cy="4" r="14"/>
      <circle cx="26" cy="-6" r="2" fill="{color}" stroke="none"/>
    </g>
    <circle cx="{cx+30}" cy="{cy-32}" r="13" fill="{BG}" stroke="{color}" stroke-width="2.2"/>
    <path d="M{cx+30-6} {cy-32} h12 M{cx+30} {cy-32-6} v12" stroke="{color}" stroke-width="2.2" stroke-linecap="round"/>'''

def make(name, color, category_label, caption, filename_hint):
    svg = f'''<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-{name}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{CARD}"/>
      <stop offset="100%" stop-color="{BG}"/>
    </linearGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#bg-{name})"/>
  <rect x="28" y="28" width="{W-56}" height="{H-56}" rx="16" fill="none" stroke="{BORDER}" stroke-width="2" stroke-dasharray="8 8"/>
  {camera_icon(W/2, H/2 - 34, color, 1.15)}
  <text x="{W/2}" y="{H/2+66}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" letter-spacing="2" fill="{color}" opacity="0.9">{category_label}</text>
  <text x="{W/2}" y="{H/2+92}" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="13" fill="{TEXT_MUTED}">{caption}</text>
  <text x="{W/2}" y="{H-46}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9.5" fill="{TEXT_DIM}">ADD PHOTO → /public/images/gallery/{filename_hint}</text>
</svg>'''
    path = os.path.join(OUT, f"{name}.svg")
    with open(path, "w") as f:
        f.write(svg)
    print("wrote", path)

make("conference-1", CYAN, "PHOTO SLOT", "IEEE Conference Presentation", "conference-1.jpg")
make("conference-2", CYAN, "PHOTO SLOT", "Research Conference", "conference-2.jpg")
make("college-1", PURPLE, "PHOTO SLOT", "DMIHER Campus", "college-1.jpg")
make("college-2", PURPLE, "PHOTO SLOT", "Student Council / Leadership", "college-2.jpg")
make("project-1", BLUE, "PHOTO SLOT", "Satellite Imagery Research", "project-1.jpg")
make("project-2", BLUE, "PHOTO SLOT", "Computer Vision Work", "project-2.jpg")
make("community-1", CYAN, "PHOTO SLOT", "Speaker · Tech4Good Hackathon", "community-1.jpg")
make("community-2", CYAN, "PHOTO SLOT", "Moderator · Tech4Good Hackathon", "community-2.jpg")

print("GALLERY PLACEHOLDERS DONE")
