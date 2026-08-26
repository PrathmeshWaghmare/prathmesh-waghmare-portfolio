"""
Prepares certificate assets for the site:
- Copies each original certificate (PDF/PNG) into public/certificates/originals/<id>.<ext>
- Renders a JPEG preview (page 1 for PDFs, resized for images) into
  public/certificates/previews/<id>.jpg for the in-site lightbox viewer.

Re-run with: python3 scripts/prepare_certificates.py
Source certificate files are expected in /mnt/user-data/uploads (adjust
SRC_DIR if you move this to a different machine).
"""
import subprocess
import shutil
from pathlib import Path
from PIL import Image

SRC_DIR = Path("/mnt/user-data/uploads")
ORIGINALS = Path("/home/claude/portfolio/public/certificates/originals")
PREVIEWS = Path("/home/claude/portfolio/public/certificates/previews")
ORIGINALS.mkdir(parents=True, exist_ok=True)
PREVIEWS.mkdir(parents=True, exist_ok=True)

# id -> source filename (relative to SRC_DIR)
MAP = {
    "isro-iirs-geodata": "Prathmesh_waghmare_AIML_for_Geodata_Analysis_ISRO_Course.pdf",
    "coursera-jhu-health-informatics": "The_Data_Science_of_Health_Informatics.pdf",
    "coursera-uct-clinical-research": "Understanding_Clinical_Research.pdf",
    "coursera-google-genai": "intro_to_gen_ai_google_cer.pdf",
    "coursera-ibm-cybersecurity": "coursera__IBM__intro_to_cyb.pdf",
    "coursera-ucsc-c-cpp": "Coding_certi_cou.pdf",
    "coursera-ibm-data-analysis-python": "Screenshot_2024-06-23_215558.png",
    "hp-life-ds": "certificate_HP.pdf",
    "infosys-drone": "DRONE_INFOSYS_.pdf",
    "infosys-iot": "IOT__ELECRONICS_COURSE__INFOSYS_.pdf",
    "infosys-ipu-cs": "IPU_COMPUTER_SCIENCE__INFOSYS_.pdf",
    "devtown-deep-learning": "_amazon_deep_learning.pdf",
    "devtown-js-react": "participation_certificate__JS_.pdf",
    "devtown-python-ai": "Google_certificate__python___AI_.pdf",
    "devtown-appreciation": "Appreciation_certificate__dev_town_.pdf",
    "intel-ignite-dataviz": "Ignite_16_Certificate_SV_Dec_2023_46.pdf",
    "intel-ignite-edge": "Ignite_22_Beyond_the_Cloud_Jul_2024_Cert_027.pdf",
    "edunet-green-skills-ai": "Prathmesh_Waghmare_Completion.pdf",
    "flipkart-grid": "Flipcart_Prathmesh.pdf",
    "hashgraph-developer": "89309eac-a28c-4e99-9963-cea17e6f9a56__1_.pdf",
    "fireblaze-ftde": "Fireblaze_Talent_Discovery_Exam__FTDE_-certificate.pdf",
    "nism-sebi-financial-literacy": "Certificate_7066072062_02052026061810.pdf",
    # Achievement (not a "certification" card, but same treatment)
    "bharatiya-antariksh-hackathon": "Hack2skill-Certificate.png",
    # Research paper certificate of presentation
    "diabetes-ai-review": "187-1.pdf",
    "smart-water-irrigation": "1784955006606_296-1.pdf",
    "rom-ai-photography": "1784955356087_337-1.pdf",
    # New certifications
    "nptel-data-science-engineers": "Data_science_for_english_certificate_.pdf",
    "nptel-softskills": "Soft_skill_Nptel.pdf",
}

MAX_PREVIEW_WIDTH = 1100

def make_preview_from_image(src: Path, dest_jpg: Path):
    im = Image.open(src)
    if im.mode in ("RGBA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    if im.width > MAX_PREVIEW_WIDTH:
        ratio = MAX_PREVIEW_WIDTH / im.width
        im = im.resize((MAX_PREVIEW_WIDTH, int(im.height * ratio)), Image.LANCZOS)
    im.save(dest_jpg, "JPEG", quality=85, optimize=True)

def make_preview_from_pdf(src: Path, dest_jpg_no_ext: Path):
    # Clear any stale output from a previous run first, so the glob below
    # can't accidentally pick up an old file instead of the fresh render.
    final = Path(str(dest_jpg_no_ext) + ".jpg")
    if final.exists():
        final.unlink()
    for stale in dest_jpg_no_ext.parent.glob(dest_jpg_no_ext.name + "-*.jpg"):
        stale.unlink()

    subprocess.run(
        ["pdftoppm", "-jpeg", "-r", "150", "-f", "1", "-l", "1", str(src), str(dest_jpg_no_ext)],
        check=True,
    )
    # pdftoppm names output <prefix>-1.jpg (or -01, depending on page count digits)
    candidates = list(dest_jpg_no_ext.parent.glob(dest_jpg_no_ext.name + "-*.jpg"))
    if not candidates:
        raise RuntimeError(f"No preview produced for {src}")
    produced = candidates[0]
    produced.rename(final)
    # Downscale if huge
    im = Image.open(final)
    if im.width > MAX_PREVIEW_WIDTH:
        ratio = MAX_PREVIEW_WIDTH / im.width
        im = im.convert("RGB").resize((MAX_PREVIEW_WIDTH, int(im.height * ratio)), Image.LANCZOS)
        im.save(final, "JPEG", quality=85, optimize=True)

results = []
for cert_id, filename in MAP.items():
    src = SRC_DIR / filename
    if not src.exists():
        print(f"MISSING SOURCE: {filename} for {cert_id}")
        continue
    ext = src.suffix.lower()
    original_dest = ORIGINALS / f"{cert_id}{ext}"
    shutil.copy(src, original_dest)

    preview_dest_base = PREVIEWS / cert_id
    if ext == ".pdf":
        make_preview_from_pdf(src, preview_dest_base)
    else:
        make_preview_from_image(src, Path(str(preview_dest_base) + ".jpg"))

    results.append(cert_id)

print(f"\nProcessed {len(results)} / {len(MAP)} certificates.")
