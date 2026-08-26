"""Generates public/resume.pdf from the verified resume content.
Source of truth: the user-uploaded resume (Prathmesh_Waghmare_Resume.docx).
Re-run with: python3 scripts/generate_resume_pdf.py
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem
from reportlab.lib import colors

PRIMARY = colors.HexColor("#1D4ED8")
DARK = colors.HexColor("#111827")
MUTED = colors.HexColor("#4B5563")

styles = getSampleStyleSheet()
name_style = ParagraphStyle("Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=22, textColor=DARK, spaceAfter=2, alignment=TA_LEFT)
contact_style = ParagraphStyle("Contact", parent=styles["Normal"], fontSize=9.5, textColor=MUTED, spaceAfter=10)
h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, textColor=PRIMARY, spaceBefore=12, spaceAfter=4, letterSpacing=0.5)
body = ParagraphStyle("Body", parent=styles["Normal"], fontSize=9.7, leading=13.5, textColor=DARK, spaceAfter=2)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=12, spaceAfter=3)
role = ParagraphStyle("Role", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.3, textColor=DARK, spaceBefore=6)
meta = ParagraphStyle("Meta", parent=styles["Normal"], fontSize=9, textColor=MUTED, spaceAfter=3, fontName="Helvetica-Oblique")

doc = SimpleDocTemplate(
    "/home/claude/portfolio/public/resume.pdf",
    pagesize=letter,
    topMargin=0.55 * inch, bottomMargin=0.55 * inch,
    leftMargin=0.65 * inch, rightMargin=0.65 * inch,
)

story = []

story.append(Paragraph("Prathmesh Waghmare", name_style))
story.append(Paragraph(
    "+91-7066072062 &nbsp;|&nbsp; prathmeshwaghmare1812@gmail.com &nbsp;|&nbsp; "
    "linkedin.com/in/prathmesh-waghmare-bb73232a8 &nbsp;|&nbsp; github.com/PrathmeshWaghmare",
    contact_style,
))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E5E7EB")))

story.append(Paragraph("SUMMARY", h2))
story.append(Paragraph(
    "B.Tech (Artificial Intelligence &amp; Machine Learning) student with hands-on Research &amp; "
    "Development experience at the Space Applications Centre (SAC), ISRO, building deep-learning and "
    "computer-vision models &mdash; including YOLO, R-CNN, and RNN-based architectures &mdash; for real-time "
    "object detection and denoising of satellite imagery. Proficient in Python, PyTorch, TensorFlow, and "
    "OpenCV, with applied project experience spanning satellite image analysis, healthcare AI, and "
    "full-stack web development. Author of three IEEE-indexed research publications. Proven leadership "
    "track record as Vice President (IGNITRA 3.0), Event Management Lead (GDG on Campus DMIHER), and "
    "General Secretary (Student Council).",
    body,
))

story.append(Paragraph("EDUCATION", h2))
story.append(Paragraph("<b>Datta Meghe Institute of Higher Education and Research (DMIHER)</b> &mdash; Expected 2027", body))
story.append(Paragraph("Bachelor of Technology (B.Tech) &mdash; Artificial Intelligence &amp; Machine Learning, Wardha, Maharashtra", meta))
story.append(Paragraph("CGPA: 7.52 / 10 (through 6th Semester)", body))

story.append(Paragraph("TECHNICAL SKILLS", h2))
skills = [
    ("Programming", "Python, JavaScript"),
    ("Machine Learning", "Supervised Learning, Model Training, Evaluation &amp; Testing, R-CNN, RNN"),
    ("Deep Learning &amp; CV", "PyTorch, TensorFlow, OpenCV, CNN, YOLO (v8, v11, v26), Faster R-CNN, RNN, Mamba, BDH Architectures, Image Denoising &amp; Enhancement, Image Preprocessing &amp; Annotation"),
    ("Tools", "Google Colab, Roboflow, LabelImg, Git, Claude, GPT"),
    ("Web Technologies", "HTML, CSS, React.js, Node.js"),
]
for label, val in skills:
    story.append(Paragraph(f"<b>{label}:</b> {val}", body))

story.append(Paragraph("EXPERIENCE", h2))
story.append(Paragraph("Research Intern &mdash; Space Applications Centre (SAC), ISRO", role))
story.append(Paragraph("6-Month On-Site Research Internship, Ahmedabad, Gujarat &nbsp;|&nbsp; Apr 2026 &ndash; Oct 2026 (Ongoing)", meta))
story.append(ListFlowable([
    ListItem(Paragraph("Engineered real-time object-detection pipelines for satellite imagery using multiple YOLO variants (YOLOv8, YOLOv11, YOLOv26), Faster R-CNN, and RNN-based sequence models in Python, PyTorch, and OpenCV.", bullet)),
    ListItem(Paragraph("Researched and prototyped Dragon Hatchling (BDH) and Mamba-based architectures to improve the efficiency of large-scale satellite image analysis.", bullet)),
    ListItem(Paragraph("Built image-denoising and enhancement modules to remove noise from real-time satellite data, improving downstream model accuracy.", bullet)),
    ListItem(Paragraph("Performed image preprocessing and annotation (Roboflow, LabelImg) on remote-sensing datasets to support high-quality model training.", bullet)),
    ListItem(Paragraph("Collaborated with cross-functional research teams on geospatial and AI/ML initiatives under SAC-ISRO.", bullet)),
], bulletType="bullet", start="circle", leftIndent=14))

story.append(Paragraph("Web Development Intern &mdash; Cosmos Digital", role))
story.append(Paragraph("On-Site Internship, India &nbsp;|&nbsp; Apr 2025 &ndash; Jun 2025", meta))
story.append(ListFlowable([
    ListItem(Paragraph("Built a business-oriented web application and stakeholder dashboard using HTML, CSS, JavaScript, and Node.js.", bullet)),
    ListItem(Paragraph("Implemented responsive, user-friendly features and partnered with the team to translate business requirements into functionality.", bullet)),
], bulletType="bullet", start="circle", leftIndent=14))

story.append(Paragraph("PROJECTS", h2))
projects = [
    ("Real-Time Object Detection from ISRO Satellite Imagery", "Python, PyTorch, OpenCV, YOLOv8/v11/v26", "Apr 2026 – Present",
     "Trained and benchmarked multiple YOLO model variants for real-time detection of objects in satellite images from ISRO datasets; optimized the inference pipeline for real-time performance."),
    ("Real-Time Satellite Image Denoising & Enhancement", "Python, OpenCV, Deep Learning", "Apr 2026 – Present",
     "Designed denoising models to remove noise from real-time satellite imagery, improving image clarity for downstream object-detection tasks."),
    ("COVID-19 & Pneumonia Detection from Chest X-Ray Images", "PyTorch, CNN", "Feb 2025 – Mar 2025",
     "Built a 4-class deep-learning classifier (COVID-19, Pneumonia, Viral Infection, Normal) for real-time chest X-ray screening."),
    ("Real-Time Labour Booking Platform for Farmers", "React.js, Node.js, JavaScript", "Dec 2025 – Jan 2026",
     "Built a real-time web platform enabling farmers to book agricultural laborers on demand, with live availability and instant booking confirmation."),
]
for title, tech, dates, desc in projects:
    story.append(Paragraph(f"{title} &mdash; <i>{tech}</i>", role))
    story.append(Paragraph(dates, meta))
    story.append(Paragraph(desc, bullet))

story.append(Paragraph("RESEARCH PUBLICATIONS", h2))
pubs = [
    "\u201cA Review on the Diabetes Treatment using Artificial Intelligence and Machine Learning\u201d — 8th ICICT 2025, Tribhuvan University, Nepal. Published, IEEE Xplore.",
    "\u201cAssessing ROM with AI Photography: Validity & Application\u201d — 6th ICESC 2025, Coimbatore, India. Published, IEEE Xplore.",
    "\u201cSmart Water Irrigation Using IoT, Artificial Intelligence, and Machine Learning Techniques\u201d — 7th ICMCSI 2026, Purbanchal University, Nepal. Accepted for Presentation, IEEE.",
    "\u201cReal-Time Web-Based Marketplace for On-Demand Matching of Agricultural Labor\u201d — ICCSECD 2026. Accepted for Presentation, IEEE.",
]
story.append(ListFlowable([ListItem(Paragraph(p, bullet)) for p in pubs], bulletType="bullet", start="circle", leftIndent=14))

story.append(Paragraph("LEADERSHIP & CERTIFICATIONS", h2))
story.append(Paragraph("<b>Leadership:</b> Vice President &mdash; IGNITRA 3.0; Event Management Lead &mdash; GDG on Campus DMIHER; General Secretary &mdash; Student Council", body))
story.append(Paragraph("<b>Certifications:</b> Data Science &amp; Analytics (HP LIFE, 2025); AI/ML for Geodata Analysis (IIRS Dehradun, 2024); Data Analysis with Python (Coursera, 2024); Introduction to Machine Learning on AWS (2023); Soft Skill Development (NPTEL, IIT Kharagpur, 2025)", body))
story.append(Paragraph("<b>Hackathon:</b> Bharatiya Antariksh Hackathon &mdash; ISRO (2024), Participant", body))

doc.build(story)
print("Resume PDF generated.")
