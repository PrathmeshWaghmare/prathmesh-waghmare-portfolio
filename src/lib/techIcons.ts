import {
  siPython,
  siJavascript,
  siTypescript,
  siC,
  siPytorch,
  siTensorflow,
  siScikitlearn,
  siOpencv,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siHtml5,
  siTailwindcss,
  siGit,
  siGithub,
  siGooglecolab,
  siJupyter,
  siMysql,
  siSqlite,
  siRoboflow,
} from "simple-icons";

/**
 * Maps the exact technology strings used across content/*.json to their
 * simple-icons (CC0-licensed) brand icon. Anything not listed here just
 * renders as a plain text badge — most of our "skills" are concepts
 * (Deep Learning, Medical Imaging, Research Writing…) rather than
 * logo-bearing products, so a partial map is expected and fine.
 *
 * Icons are imported individually (not `import * as`) so bundlers only
 * ship the ~20 icons we actually use, not all ~3,000 in the library.
 */
const ICON_MAP: Record<string, TechIcon> = {
  "Python": siPython,
  "JavaScript": siJavascript,
  "TypeScript": siTypescript,
  "C": siC,
  "PyTorch": siPytorch,
  "TensorFlow": siTensorflow,
  "Scikit-Learn": siScikitlearn,
  "OpenCV": siOpencv,
  "React": siReact,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  "HTML": siHtml5,
  "Tailwind CSS": siTailwindcss,
  "Git": siGit,
  "GitHub": siGithub,
  "Google Colab": siGooglecolab,
  "Jupyter Notebook": siJupyter,
  "MySQL": siMysql,
  "SQLite": siSqlite,
  "Roboflow": siRoboflow,
};

export interface TechIcon {
  title: string;
  path: string;
  hex: string;
}

export function getTechIcon(name: string): TechIcon | null {
  return ICON_MAP[name.trim()] ?? null;
}
