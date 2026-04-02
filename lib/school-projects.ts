export const schoolProjectCategoryLabels = {
  all: "All",
  web: "Web",
  app: "App",
  design: "Design",
} as const;

export type SchoolProjectCategory = keyof typeof schoolProjectCategoryLabels;

type SchoolProjectBase = {
  id: string;
  title: string;
  description: string;
  category: Exclude<SchoolProjectCategory, "all">;
};

export type SchoolProjectWithHref = SchoolProjectBase & { href: string };

export type SchoolProjectFigma = SchoolProjectBase & { figmaWebHref: string };

export type SchoolProject = SchoolProjectWithHref | SchoolProjectFigma;

/** Same copy as FinalOS; categories group the school project list. */
export const schoolProjects: SchoolProject[] = [
  {
    id: "ecom",
    title: "Ecommerce",
    description: "A web app that allows users to browse, add to cart, and purchase products.",
    href: "https://midtermappdevs.vercel.app/",
    category: "web",
  },
  {
    id: "hairpins",
    title: "Exquisite Chinese Hairpins & Accessories",
    description: "An elegant collection showcase website featuring traditional Chinese hairpins.",
    href: "https://project-t6ox.vercel.app/",
    category: "web",
  },
  {
    id: "calc",
    title: "Calculator",
    description: "A simple, functional calculator built with JavaScript.",
    href: "/calculator",
    category: "app",
  },
  {
    id: "figma",
    title: "Figma User Profile",
    description: "A visual user profile design created in Figma, focusing on layout and aesthetics.",
    figmaWebHref:
      "https://www.figma.com/design/AJDfrdJz28HGktt3acntpA/Profile?node-id=0-1&t=R1cGH6Y1oYxvQnEU-1",
    category: "design",
  },
  {
    id: "cpu",
    title: "CPU Scheduling Algorithm",
    description: "A project demonstrating CPU scheduling concepts and simulations.",
    href: "/cpu",
    category: "app",
  },
];

export const schoolProjectFilterTabs = ["all", "web", "app", "design"] as const satisfies readonly SchoolProjectCategory[];

export function filterSchoolProjects(category: SchoolProjectCategory): SchoolProject[] {
  if (category === "all") return schoolProjects;
  return schoolProjects.filter((p) => p.category === category);
}
