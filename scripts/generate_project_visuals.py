"""
Generates detailed, on-brand SVG illustrations for each project card.
Replaces the old "PROJECT SCREENSHOT PENDING" gradient/icon placeholders
with scenes that actually depict what each project does (detection boxes,
X-ray classification, app-UI mockups, dashboards, pose keypoints, etc.)
in the same dark "detection HUD" visual language as the rest of the site.
"""
import os

OUT = "/home/claude/portfolio/portfolio/public/images/projects"
os.makedirs(OUT, exist_ok=True)

BG = "#0B1120"
CARD = "#111827"
CARD2 = "#0F172A"
GRID = "rgba(255,255,255,0.045)"
BORDER = "rgba(255,255,255,0.08)"
TEXT_MUTED = "#9CA3AF"
TEXT_DIM = "#64748B"
WHITE = "#E5E7EB"

BLUE = "#3B82F6"
CYAN = "#06B6D4"
PURPLE = "#8B5CF6"
GREEN = "#22C55E"
AMBER = "#F59E0B"
RED = "#EF4444"

W, H = 800, 500

def grid_lines(w, h, step=40, opacity=0.5):
    lines = []
    x = 0
    while x <= w:
        lines.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="{GRID}" stroke-width="1"/>')
        x += step
    y = 0
    while y <= h:
        lines.append(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="{GRID}" stroke-width="1"/>')
        y += step
    return f'<g opacity="{opacity}">' + "".join(lines) + "</g>"

def mono(x, y, text, size=10, color=TEXT_MUTED, anchor="start", spacing="1.5", opacity=1, weight="400"):
    return (f'<text x="{x}" y="{y}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" '
            f'font-size="{size}" letter-spacing="{spacing}" fill="{color}" text-anchor="{anchor}" '
            f'opacity="{opacity}" font-weight="{weight}">{text}</text>')

def sans(x, y, text, size=12, color=WHITE, anchor="start", weight="500", opacity=1):
    return (f'<text x="{x}" y="{y}" font-family="ui-sans-serif,system-ui,sans-serif" '
            f'font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}" opacity="{opacity}">{text}</text>')

def bbox(x, y, w, h, color, label=None, conf=None, corner=9, sw=2, dash=False, label_pos="top"):
    """A detection-style bounding box drawn with corner brackets, optional class/confidence tag."""
    d = f' stroke-dasharray="4 3"' if dash else ""
    g = [f'<g>']
    g.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" stroke="{color}" stroke-width="{sw}" opacity="0.35"{d}/>')
    for (cx, cy, dx, dy) in [(x,y,1,1),(x+w,y,-1,1),(x,y+h,1,-1),(x+w,y+h,-1,-1)]:
        g.append(f'<path d="M{cx} {cy+dy*corner} V{cy} H{cx+dx*corner}" stroke="{color}" stroke-width="{sw+0.8}" fill="none" stroke-linecap="round"/>')
    if label:
        tag_w = 15 + len(label) * 5.6 + (34 if conf else 0)
        ty = y - 18 if label_pos == "top" else y + h + 4
        g.append(f'<rect x="{x}" y="{ty}" width="{tag_w}" height="15" rx="2.5" fill="{color}" opacity="0.92"/>')
        txt = f'{label}  {conf}' if conf else label
        g.append(f'<text x="{x+6}" y="{ty+11}" font-family="ui-monospace,monospace" font-size="9.5" letter-spacing="0.3" fill="#0B1120" font-weight="700">{txt}</text>')
    g.append('</g>')
    return "".join(g)

def defs(color, name):
    return f'''<defs>
    <radialGradient id="glow-{name}" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="{color}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="{BG}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg-{name}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{CARD}"/>
      <stop offset="100%" stop-color="{BG}"/>
    </linearGradient>
    <clipPath id="clip-{name}"><rect width="{W}" height="{H}"/></clipPath>
  </defs>'''

def wrap(name, color, body, corner_tag=None):
    tag = ""
    if corner_tag:
        tag = mono(W-24, 30, corner_tag, size=9.5, color=color, anchor="end", opacity=0.85)
    svg = f'''<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">
  {defs(color, name)}
  <g clip-path="url(#clip-{name})">
    <rect width="{W}" height="{H}" fill="url(#bg-{name})"/>
    <rect width="{W}" height="{H}" fill="url(#glow-{name})"/>
    {grid_lines(W, H)}
    {body}
    {tag}
    <rect x="0.5" y="0.5" width="{W-1}" height="{H-1}" fill="none" stroke="{BORDER}" stroke-width="1"/>
  </g>
</svg>'''
    return svg

def save(name, svg):
    path = os.path.join(OUT, f"{name}.svg")
    with open(path, "w") as f:
        f.write(svg)
    print("wrote", path)

# ---------------------------------------------------------------------------
# 1. satellite-detection.svg — Real-Time Object Detection from ISRO Satellite Imagery
# ---------------------------------------------------------------------------
def terrain_tiles(seed_rects):
    return "".join(seed_rects)

terrain = []
import random
random.seed(7)
palette = ["#2E3B2F", "#37452F", "#3E4A34", "#2B3A3B", "#413A2C", "#324034", "#2A342E"]
for i in range(9):
    for j in range(6):
        x = 40 + i * 82 + random.randint(-6, 6)
        y = 30 + j * 68 + random.randint(-6, 6)
        w = 78 + random.randint(-10, 10)
        h = 62 + random.randint(-10, 10)
        c = random.choice(palette)
        terrain.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" opacity="0.9"/>')
# a couple of "roads"
roads = (
    f'<line x1="0" y1="210" x2="800" y2="240" stroke="#5B5B52" stroke-width="6" opacity="0.55"/>'
    f'<line x1="0" y1="210" x2="800" y2="240" stroke="#8A8A78" stroke-width="1.5" stroke-dasharray="10 8" opacity="0.5"/>'
    f'<line x1="330" y1="0" x2="300" y2="500" stroke="#5B5B52" stroke-width="6" opacity="0.5"/>'
)
# building clusters (small light rooftops)
buildings = []
for (bx, by) in [(120,120),(140,140),(165,110),(520,320),(545,340),(500,355),(600,150),(625,170)]:
    buildings.append(f'<rect x="{bx}" y="{by}" width="16" height="12" fill="#C9CDBB" opacity="0.85"/>')
# a couple of "vehicle" dots along the road
vehicles = []
for vx in [90, 250, 420, 610, 690]:
    vy = 215 + int(30 * ((vx % 97) / 97 - 0.5))
    vehicles.append(f'<rect x="{vx}" y="{vy}" width="7" height="4" rx="1" fill="#EDEBD8" opacity="0.9"/>')

scene1 = "".join(terrain) + roads + "".join(buildings) + "".join(vehicles)
scan = f'<line x1="0" y1="0" x2="800" y2="0" stroke="{BLUE}" stroke-width="1.5" opacity="0.7"><animate attributeName="y1" values="0;500;0" dur="4.5s" repeatCount="indefinite"/><animate attributeName="y2" values="0;500;0" dur="4.5s" repeatCount="indefinite"/></line>'

boxes1 = (
    bbox(112, 104, 78, 58, BLUE, "SETTLEMENT", "0.93")
    + bbox(490, 305, 78, 60, BLUE, "STORAGE SITE", "0.87", label_pos="bottom")
    + bbox(585, 135, 62, 52, BLUE, "STRUCTURE", "0.90")
    + bbox(600, 205, 100, 24, CYAN, "ROAD NETWORK", "0.81", label_pos="bottom")
)
telemetry1 = (
    mono(24, 34, "SAT-IMG // FRAME 0417", 10, BLUE, opacity=0.85)
    + mono(24, 480, "YOLOv8 · YOLOv11 · YOLOv26  —  INFERENCE 18ms", 9.5, TEXT_DIM)
)
save("satellite-detection", wrap("sat", BLUE, scene1 + scan + boxes1 + telemetry1, corner_tag="OBJECT DETECTION"))

# ---------------------------------------------------------------------------
# 2. image-denoising.svg — Real-Time Satellite Image Denoising & Enhancement
# ---------------------------------------------------------------------------
random.seed(3)
def noisy_terrain(dx=0):
    els = []
    for i in range(5):
        for j in range(6):
            x = dx + 10 + i * 72 + random.randint(-5,5)
            y = 25 + j * 68 + random.randint(-5,5)
            w = 66 + random.randint(-8,8); h = 60 + random.randint(-8,8)
            c = random.choice(palette)
            els.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" opacity="0.9"/>')
    return "".join(els)

left = noisy_terrain(0)
noise = []
random.seed(11)
for _ in range(900):
    nx = random.randint(6, 384)
    ny = random.randint(6, 494)
    op = round(random.uniform(0.08, 0.5), 2)
    r = random.choice([0.5, 0.7, 0.9])
    c = random.choice(["#FFFFFF", "#000000"])
    noise.append(f'<circle cx="{nx}" cy="{ny}" r="{r}" fill="{c}" opacity="{op}"/>')
right = noisy_terrain(400)

divider = f'<line x1="400" y1="0" x2="400" y2="500" stroke="{CYAN}" stroke-width="2" opacity="0.8"/>'
arrow = (f'<circle cx="400" cy="250" r="22" fill="{BG}" stroke="{CYAN}" stroke-width="2"/>'
         f'<path d="M390 250 H410 M402 242 L410 250 L402 258" stroke="{CYAN}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')

labels2 = (
    mono(24, 34, "INPUT · NOISY", 11, RED, opacity=0.9)
    + mono(776, 34, "OUTPUT · ENHANCED", 11, GREEN, anchor="end", opacity=0.9)
    + f'<rect x="16" y="452" width="150" height="26" rx="4" fill="{CARD2}" stroke="{RED}" stroke-width="1" opacity="0.9"/>'
    + mono(30, 469, "PSNR 21.4 dB", 10, RED, opacity=0.95)
    + f'<rect x="634" y="452" width="150" height="26" rx="4" fill="{CARD2}" stroke="{GREEN}" stroke-width="1" opacity="0.9"/>'
    + mono(648, 469, "PSNR 33.8 dB", 10, GREEN, opacity=0.95)
)
scene2 = left + "".join(noise) + right + divider + arrow + labels2
save("image-denoising", wrap("denoise", CYAN, scene2))

# ---------------------------------------------------------------------------
# 3. bdh-yolo26.svg — BDH-YOLO26 Aircraft Detection
# ---------------------------------------------------------------------------
tarmac = f'<rect x="0" y="0" width="{W}" height="{H}" fill="#232A2E"/>'
apron_lines = []
for x in range(60, 760, 140):
    apron_lines.append(f'<line x1="{x}" y1="20" x2="{x}" y2="480" stroke="#4A5560" stroke-width="2" stroke-dasharray="14 10" opacity="0.55"/>')
runway = f'<rect x="0" y="360" width="{W}" height="90" fill="#1B2126"/>' + \
    "".join([f'<rect x="{x}" y="400" width="46" height="10" fill="#E5E7EB" opacity="0.55"/>' for x in range(-20, 820, 90)])

def plane(cx, cy, scale=1, rot=0):
    return (f'<g transform="translate({cx},{cy}) rotate({rot}) scale({scale})" fill="#C6CBD1" opacity="0.92">'
            f'<path d="M0 -46 L7 -18 L46 4 L46 12 L7 2 L9 30 L22 42 L22 48 L0 40 L-22 48 L-22 42 L-9 30 L-7 2 L-46 12 L-46 4 L-7 -18 Z"/>'
            f'</g>')

planes = plane(190, 150, 1.0) + plane(360, 210, 0.85, rot=18) + plane(560, 130, 0.75, rot=-10) + plane(660, 300, 0.65, rot=-90)

boxes3 = (
    bbox(150, 100, 84, 100, PURPLE, "AIRCRAFT", "0.97")
    + bbox(310, 165, 92, 92, PURPLE, "AIRCRAFT", "0.94")
    + bbox(520, 92, 78, 78, PURPLE, "AIRCRAFT", "0.89", label_pos="bottom")
    + bbox(618, 268, 86, 68, PURPLE, "AIRCRAFT", "0.91")
)
telemetry3 = (
    mono(24, 34, "BDH-YOLO26 // HIGH-RES TILE 0392", 10, PURPLE, opacity=0.85)
    + mono(24, 480, "HYBRID BDH + YOLO26 ARCHITECTURE", 9.5, TEXT_DIM)
)
scene3 = tarmac + "".join(apron_lines) + runway + planes + boxes3 + telemetry3
save("bdh-yolo26", wrap("bdh", PURPLE, scene3, corner_tag="AIRCRAFT DETECTION"))

# ---------------------------------------------------------------------------
# 4. covid-detection.svg — COVID-19 & Pneumonia Detection (Chest X-Ray)
# ---------------------------------------------------------------------------
xray_bg = f'<rect x="0" y="0" width="{W}" height="{H}" fill="#0A0E14"/>'
# ribcage / lung silhouette, simplified
lungs = f'''
<g transform="translate(230,250)" opacity="0.9">
  <path d="M0 -160 C -70 -150 -110 -80 -115 0 C -118 70 -95 150 -40 175 C -15 185 -5 160 -2 120 Z"
        fill="none" stroke="#8FA3B8" stroke-width="2.5"/>
  <path d="M0 -160 C 70 -150 110 -80 115 0 C 118 70 95 150 40 175 C 15 185 5 160 2 120 Z"
        fill="none" stroke="#8FA3B8" stroke-width="2.5"/>
  {"".join([f'<path d="M{-8-i*3} -140 C {-70+i*4} -120 {-95+i*5} -40 {-95+i*6} {40+i*8}" stroke="#3E4E5E" stroke-width="1" fill="none" opacity="0.5"/>' for i in range(6)])}
  {"".join([f'<path d="M{8+i*3} -140 C {70-i*4} -120 {95-i*5} -40 {95-i*6} {40+i*8}" stroke="#3E4E5E" stroke-width="1" fill="none" opacity="0.5"/>' for i in range(6)])}
  <line x1="0" y1="-170" x2="0" y2="170" stroke="#5B6B7C" stroke-width="4" opacity="0.8"/>
  {"".join([f'<line x1="-16" y1="{-150+i*36}" x2="16" y2="{-150+i*36}" stroke="#4A5A6A" stroke-width="7" opacity="0.55"/>' for i in range(9)])}
</g>'''
heatmap = f'''<g opacity="0.55">
  <ellipse cx="165" cy="200" rx="46" ry="58" fill="{AMBER}" opacity="0.35"/>
  <ellipse cx="165" cy="200" rx="26" ry="34" fill="{RED}" opacity="0.5"/>
  <ellipse cx="165" cy="200" rx="10" ry="14" fill="{RED}" opacity="0.75"/>
</g>'''
crosshair = bbox(120, 145, 90, 112, RED, "ROI", label_pos="top")

panel_x = 470
panel = f'<rect x="{panel_x}" y="46" width="300" height="410" rx="10" fill="{CARD2}" stroke="{BORDER}" stroke-width="1"/>'
panel_title = mono(panel_x+20, 78, "CLASSIFICATION RESULT", 10.5, CYAN, opacity=0.9)

classes = [
    ("COVID-19", 0.81, RED),
    ("PNEUMONIA", 0.11, AMBER),
    ("VIRAL INFECTION", 0.05, PURPLE),
    ("NORMAL", 0.03, TEXT_DIM),
]
bars = []
by = 110
for label, val, col in classes:
    bars.append(sans(panel_x+20, by, label, 12, WHITE if col==RED else TEXT_MUTED, weight="600" if col==RED else "500"))
    bars.append(f'<rect x="{panel_x+20}" y="{by+10}" width="260" height="10" rx="5" fill="{BORDER}"/>')
    bars.append(f'<rect x="{panel_x+20}" y="{by+10}" width="{260*val}" height="10" rx="5" fill="{col}"/>')
    bars.append(mono(panel_x+280, by+9, f"{val*100:.0f}%", 10, col, anchor="end"))
    by += 44

verdict = (f'<rect x="{panel_x+20}" y="{by+8}" width="260" height="40" rx="6" fill="{RED}" opacity="0.14" stroke="{RED}" stroke-width="1"/>'
           + sans(panel_x+34, by+33, "Predicted: COVID-19", 13, RED, weight="700"))

gradcam_label = mono(panel_x+20, by+70, "GRAD-CAM ATTENTION OVERLAY ENABLED", 8.5, TEXT_DIM)

scene4 = xray_bg + lungs + heatmap + crosshair + panel + panel_title + "".join(bars) + verdict + gradcam_label
save("covid-detection", wrap("covid", CYAN, scene4, corner_tag="4-CLASS CNN CLASSIFIER"))

# ---------------------------------------------------------------------------
# 5. labour-booking.svg — Real-Time Labour Booking Platform for Farmers
# ---------------------------------------------------------------------------
map_bg = f'<rect width="{W}" height="{H}" fill="#16201A"/>'
fields = "".join([
    f'<rect x="{x}" y="{y}" width="150" height="110" fill="{c}" opacity="0.8"/>'
    for x,y,c in [(-20,-10,"#20301F"),(140,-10,"#263A22"),(300,-10,"#1E2E1D"),
                  (-20,90,"#233420"),(140,90,"#2A3E24"),(300,90,"#1F3020"),
                  (-20,190,"#20301F"),(140,190,"#263A22"),(300,190,"#1E2E1D")]
])
paths = f'<path d="M20 500 C 120 380 90 220 200 20" stroke="#6B7A5A" stroke-width="10" opacity="0.35" fill="none"/>'

pins = []
for (px, py, active) in [(120, 320, True), (200, 200, False), (270, 380, True)]:
    col = GREEN if active else TEXT_DIM
    pins.append(f'<g transform="translate({px},{py})">'
                f'<path d="M0 0 C -14 -14 -14 -34 0 -34 C 14 -34 14 -14 0 0 Z" fill="{col}" opacity="0.95"/>'
                f'<circle cx="0" cy="-24" r="6" fill="{BG}"/></g>')

# phone frame with booking card UI
phone_x = 460
phone = f'<rect x="{phone_x}" y="40" width="260" height="420" rx="26" fill="{CARD2}" stroke="{BORDER}" stroke-width="2"/>'
notch = f'<rect x="{phone_x+95}" y="52" width="70" height="8" rx="4" fill="{BG}"/>'
statusbar = mono(phone_x+22, 88, "9:41", 10, TEXT_MUTED) + mono(phone_x+238, 88, "5G", 9, TEXT_MUTED, anchor="end")
header = sans(phone_x+22, 118, "Available Nearby", 15, WHITE, weight="700")
subheader = mono(phone_x+22, 136, "12 LABOURERS ONLINE", 8.5, GREEN, opacity=0.9)

def worker_card(y, name, role, dist, avail=True):
    col = GREEN if avail else TEXT_DIM
    return (f'<rect x="{phone_x+18}" y="{y}" width="224" height="70" rx="10" fill="{CARD}" stroke="{BORDER}"/>'
            f'<circle cx="{phone_x+48}" cy="{y+35}" r="20" fill="{BLUE}" opacity="0.25"/>'
            f'<circle cx="{phone_x+48}" cy="{y+35}" r="20" fill="none" stroke="{BLUE}" stroke-width="1.5"/>'
            + sans(phone_x+80, y+28, name, 12.5, WHITE, weight="600")
            + mono(phone_x+80, y+44, role, 9, TEXT_MUTED)
            + f'<circle cx="{phone_x+210}" cy="{y+22}" r="4" fill="{col}"/>'
            + mono(phone_x+198, y+58, dist, 8.5, TEXT_DIM, anchor="end"))

cards = (worker_card(158, "Field Worker A", "HARVESTING · 4 YRS EXP", "0.8 km")
         + worker_card(240, "Field Worker B", "IRRIGATION · 2 YRS EXP", "1.4 km")
         + worker_card(322, "Field Worker C", "SOWING · 6 YRS EXP", "2.1 km"))

cta = (f'<rect x="{phone_x+18}" y="410" width="224" height="38" rx="10" fill="{BLUE}"/>'
       + sans(phone_x+130, 434, "Book Now", 13, "#F8FAFC", anchor="middle", weight="700"))

scene5 = map_bg + fields + paths + "".join(pins) + phone + notch + statusbar + header + subheader + cards + cta
save("labour-booking", wrap("labour", BLUE, scene5, corner_tag="LIVE AVAILABILITY"))

# ---------------------------------------------------------------------------
# 6. batsman-analysis.svg — Batsman Performance Analysis using ML
# ---------------------------------------------------------------------------
dash_bg = f'<rect width="{W}" height="{H}" fill="{CARD}"/>'
title6 = sans(32, 56, "Batsman Performance Dashboard", 16, WHITE, weight="700")
sub6 = mono(32, 76, "ML-DRIVEN INNINGS ANALYSIS", 9.5, PURPLE, opacity=0.85)

stat_cards = []
stats = [("AVERAGE", "47.3", GREEN), ("STRIKE RATE", "128.6", CYAN), ("50s / 100s", "9 / 3", PURPLE), ("BOUNDARY %", "61%", AMBER)]
for i, (label, val, col) in enumerate(stats):
    x = 32 + i * 186
    stat_cards.append(f'<rect x="{x}" y="100" width="168" height="72" rx="10" fill="{CARD2}" stroke="{BORDER}"/>')
    stat_cards.append(mono(x+16, 124, label, 9, TEXT_DIM))
    stat_cards.append(sans(x+16, 156, val, 22, col, weight="700"))

random.seed(21)
bar_vals = [42, 68, 15, 91, 55, 73, 30, 88, 60, 47]
bars6 = []
bx = 32
bw = 62
maxh = 170
for v in bar_vals:
    h = v/100*maxh
    col = GREEN if v >= 60 else (AMBER if v >= 30 else RED)
    bars6.append(f'<rect x="{bx}" y="{430-h}" width="{bw-14}" height="{h}" rx="3" fill="{col}" opacity="0.85"/>')
    bars6.append(mono(bx + (bw-14)/2, 444, f"M{bar_vals.index(v)+1}", 8, TEXT_DIM, anchor="middle"))
    bx += bw

axis = f'<line x1="24" y1="430" x2="{bx-2}" y2="430" stroke="{BORDER}" stroke-width="1.5"/>'
chart_label = mono(32, 210, "RUNS PER INNINGS (LAST 10 MATCHES)", 9, TEXT_DIM)

trend_pts = "620,300 650,270 680,285 710,240 740,255 770,210"
trend = (f'<polyline points="{trend_pts}" fill="none" stroke="{CYAN}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'
         + "".join([f'<circle cx="{p.split(",")[0]}" cy="{p.split(",")[1]}" r="3" fill="{CYAN}"/>' for p in trend_pts.split()])
         + mono(620, 190, "STRIKE RATE TREND", 8.5, TEXT_DIM))

scene6 = dash_bg + title6 + sub6 + "".join(stat_cards) + "".join(bars6) + axis + chart_label + trend
save("batsman-analysis", wrap("batsman", PURPLE, scene6, corner_tag="ML PERFORMANCE MODEL"))

# ---------------------------------------------------------------------------
# 7. pose-correction.svg — Pose Correction (keypoint / skeleton detection)
# ---------------------------------------------------------------------------
studio_bg = f'<rect width="{W}" height="{H}" fill="#10151D"/>' + grid_lines(W, H, 40, 0.35)

# Simple keypoint skeleton (front-facing squat pose) — joints + bones
joints = {
    "head": (400, 90), "neck": (400, 130),
    "lsh": (355, 140), "rsh": (445, 140),
    "lel": (330, 205), "rel": (470, 205),
    "lwr": (315, 265), "rwr": (485, 265),
    "hip": (400, 245),
    "lhip": (370, 250), "rhip": (430, 250),
    "lkn": (360, 340), "rkn": (440, 340),
    "lank": (355, 430), "rank": (445, 430),
}
bones = [("head","neck"),("neck","lsh"),("neck","rsh"),("lsh","lel"),("lel","lwr"),
         ("rsh","rel"),("rel","rwr"),("neck","hip"),("hip","lhip"),("hip","rhip"),
         ("lhip","lkn"),("lkn","lank"),("rhip","rkn"),("rkn","rank")]

bone_svg = "".join([
    f'<line x1="{joints[a][0]}" y1="{joints[a][1]}" x2="{joints[b][0]}" y2="{joints[b][1]}" stroke="{GREEN}" stroke-width="3" stroke-linecap="round" opacity="0.9"/>'
    for a,b in bones
])
head_circle = f'<circle cx="400" cy="90" r="24" fill="none" stroke="{GREEN}" stroke-width="3" opacity="0.9"/>'
joint_dots = "".join([
    f'<circle cx="{x}" cy="{y}" r="5.5" fill="{BG}" stroke="{CYAN}" stroke-width="2.5"/>'
    for (x,y) in joints.values() if (x,y) != joints["head"]
])

# angle arcs at knees + elbow with degree readouts
def angle_tag(x, y, deg, ok=True):
    col = GREEN if ok else AMBER
    return (f'<path d="M{x-18} {y-6} A20 20 0 0 1 {x+10} {y-18}" stroke="{col}" stroke-width="2" fill="none" opacity="0.85"/>'
            + f'<rect x="{x+14}" y="{y-30}" width="52" height="20" rx="4" fill="{col}" opacity="0.92"/>'
            + f'<text x="{x+40}" y="{y-16}" font-family="ui-monospace,monospace" font-size="10" fill="#0B1120" text-anchor="middle" font-weight="700">{deg}&#176;</text>')

angles = angle_tag(360, 340, 168, ok=True) + angle_tag(440, 340, 142, ok=False) + angle_tag(330, 205, 91, ok=True)

panel_x7 = 560
panel7 = f'<rect x="{panel_x7}" y="60" width="200" height="200" rx="10" fill="{CARD2}" stroke="{BORDER}"/>'
panel7_title = mono(panel_x7+18, 88, "FORM ANALYSIS", 10, CYAN)
rows = [("Knee alignment", "Good", GREEN), ("Back angle", "Adjust", AMBER), ("Hip depth", "Good", GREEN), ("Elbow angle", "Good", GREEN)]
row_svg = []
ry = 112
for label, val, col in rows:
    row_svg.append(sans(panel_x7+18, ry, label, 10.5, TEXT_MUTED, weight="500"))
    row_svg.append(f'<circle cx="{panel_x7+178}" cy="{ry-4}" r="4" fill="{col}"/>')
    row_svg.append(mono(panel_x7+168, ry, val, 9, col, anchor="end"))
    ry += 28
score = (f'<rect x="{panel_x7+18}" y="{ry+2}" width="164" height="34" rx="6" fill="{GREEN}" opacity="0.15" stroke="{GREEN}"/>'
         + sans(panel_x7+100, ry+24, "Form Score: 87/100", 12, GREEN, anchor="middle", weight="700"))

scene7 = studio_bg + bone_svg + head_circle + joint_dots + angles + panel7 + panel7_title + "".join(row_svg) + score
save("pose-correction", wrap("pose", GREEN, scene7, corner_tag="KEYPOINT ESTIMATION"))

print("ALL PROJECT VISUALS DONE")
