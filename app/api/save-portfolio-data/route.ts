import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  // Only allow direct saving in local development environment
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Saving directly to files is only supported in local development mode." },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();
    const { profile, projects, projectDetails } = data;

    if (!profile || !projects || !projectDetails) {
      return NextResponse.json({ error: "Invalid data payload." }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "lib", "portfolioData.ts");

    const fileContent = `export interface TechStackGroup {
  label: string;
  items: string[];
}

export interface ProjectDetail {
  objective: string;
  techStack: TechStackGroup[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Project {
  id: number;
  title: string;
  category: "DEVELOPMENT" | "DESIGN" | string;
  year: string;
  date?: string;
  favorite?: boolean;
  desc: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  images?: string[];
  status?: string;
  deployment?: "intranet";
}

export interface CurrentlyItem {
  role: string;
  place: string;
  location?: string;
}

export interface ProfileData {
  name: string;
  fullName: string;
  location: string;
  photoUrl: string;
  bio: string;
  availability: string;
  currently: CurrentlyItem[];
  passions: string[];
}

export interface PortfolioStore {
  profile: ProfileData;
  projects: Project[];
  projectDetails: Record<string, ProjectDetail>;
}

export const DEFAULT_PROFILE: ProfileData = ${JSON.stringify(profile, null, 2)};

export const DEFAULT_PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

export const DEFAULT_PROJECT_DETAILS: Record<string, ProjectDetail> = ${JSON.stringify(projectDetails, null, 2)};

const STORAGE_KEY = "portfolio_studio_data_v1";
export const PORTFOLIO_UPDATED_EVENT = "portfolio-data-updated";

export function getInitialPortfolioStore(): PortfolioStore {
  return {
    profile: DEFAULT_PROFILE,
    projects: DEFAULT_PROJECTS,
    projectDetails: DEFAULT_PROJECT_DETAILS,
  };
}

export function getStoredPortfolioData(): PortfolioStore {
  if (typeof window === "undefined") {
    return getInitialPortfolioStore();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialPortfolioStore();
    const parsed = JSON.parse(raw);
    return {
      profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PROJECTS,
      projectDetails: parsed.projectDetails || DEFAULT_PROJECT_DETAILS,
    };
  } catch (err) {
    console.error("Failed to read portfolio data from localStorage:", err);
    return getInitialPortfolioStore();
  }
}

export function saveStoredPortfolioData(data: PortfolioStore): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATED_EVENT, { detail: data }));
    return true;
  } catch (err) {
    console.error("Failed to save portfolio data to localStorage:", err);
    return false;
  }
}

export function resetStoredPortfolioData(): PortfolioStore {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      const defaults = getInitialPortfolioStore();
      window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATED_EVENT, { detail: defaults }));
    } catch (e) {
      console.error(e);
    }
  }
  return getInitialPortfolioStore();
}

export function downloadPortfolioJSON(data: PortfolioStore) {
  if (typeof window === "undefined") return;
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = \`portfolio-data-\${new Date().toISOString().slice(0, 10)}.json\`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
`;

    fs.writeFileSync(filePath, fileContent, "utf-8");

    return NextResponse.json({ success: true, message: "Successfully wrote to lib/portfolioData.ts" });
  } catch (err: any) {
    console.error("Error writing file:", err);
    return NextResponse.json({ error: err.message || "Failed to write data to file." }, { status: 500 });
  }
}
