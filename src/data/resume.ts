export type Resume = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education?: Array<{
    school: string;
    degree: string;
    location: string;
    period: string;
    gpa?: string;
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
  experiences: Array<{
    company: string;
    role: string;
    location: string;
    period: string;
    bullets: string[];
    logo?: string;
  }>;
  projects: Array<{
    title: string;
    tech: string;
    period: string;
    bullets: string[];
  }>;
  leadership: Array<{
    org: string;
    role: string;
    period: string;
    bullets: string[];
  }>;
};

export const resume: Resume = {
  name: "Misha Gusev",
  email: "michaeljgusev@gmail.com",
  phone: "847-790-6529",
  linkedin: "https://www.linkedin.com/in/misha-gusev/",
  github: "https://github.com/mjgusev",
  education: [
    {
      school: "The Ohio State University",
      degree: "B.S. in Computer Science and Engineering, Economics Minor",
      location: "Columbus, OH",
      period: "Aug. 2022 — Dec. 2025",
    },
  ],
  skills: {
    languages: [
      "Python",
      "Java",
      "Go",
      "C",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Ruby",
      "HTML/CSS",
    ],
    frameworks: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Flask",
      "Django",
      "Vue.js",
      "Node.js",
      "Express.js",
      "Hugo",
      "Rails",
      "JUnit",
    ],
    tools: [
      "Git",
      "Linux",
      "Phabricator",
      "Sourcegraph",
      "VS Code",
      "Cursor",
      "IntelliJ",
      "Eclipse",
    ],
  },
  experiences: [
    {
      company: "Uber Freight",
      role: "Software Engineering Intern",
      location: "Chicago, IL",
      period: "Jun. 2025 — Aug. 2025",
      logo: "/UberFreight_stacked_white.svg",
      bullets: [
        "Crafted a real-time communication system using Go to replace a flaky script, eliminating 60+ monthly timeouts",
        "Reduced communication latency for critical load changes by 4x by implementing a new event-driven architecture",
        "Shipped a solution to send 5,000+ emails per week, integrating with Zendesk's API for two-way communication",
        "Deployed code impacting an annual run-rate of over 60,000 loads, with a full rollout to all Uber Freight carriers",
        "Led code reviews using Phabricator and managed version control with Git/Sourcegraph, maintaining a high code quality standard",
      ],
    },
    {
      company: "Uber Freight",
      role: "Software Engineering Intern",
      location: "Chicago, IL",
      period: "Jun. 2024 — Aug. 2024",
      logo: "/UberFreight_stacked_white.svg",
      bullets: [
        "Developed and refined fraud status mechanisms using Go, reducing overall brokerage fraud by 30%",
        "Redesigned carrier status architecture, significantly reducing technical debt and improving maintainability",
        "Engineered automated email communication systems for risky carriers, enhancing reporting efficiency by 50%",
        "Conducted end-to-end testing using internal tools and reached 100% test coverage, ensuring software reliability",
      ],
    },
    {
      company: "The Ohio State University",
      role: "Undergraduate Teaching Assistant",
      location: "Columbus, OH",
      period: "Jan. 2023 — Dec. 2023",
      logo: "/Ohio_State_University_seal.svg",
      bullets: [
        "Clarified complex concepts in Object-Oriented Programming, Java, and data structures for 50+ students in labs",
        "Graded assignments and provided constructive feedback on coding style and logic, leading to improved student project outcomes",
        "Hosted regular office hours and ad-hoc mentoring, fostering a supportive learning environment",
      ],
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      tech: "Next.js 15, TypeScript, Tailwind CSS 4",
      period: "Jan. 2025 — Present",
      bullets: [
        "Modern minimalist design with accent-driven noisy gradients and grain overlay",
        "Theme system with light/dark modes, accent color switcher, and persistent settings",
        "Command palette (⌘K/CTRL-K), keyboard shortcuts, smooth scrolling, and section scrollspy",
        "Experience timeline with animated show more/less and session-persisted expand state",
        "Reading progress bar, reveal-on-scroll animations, and static site generation for project pages",
      ],
    },
    {
      title: "Coming Soon",
      tech: "TBD",
      period: "2025",
      bullets: [
        "Details coming soon."
      ],
    },
  ],
  leadership: [
    {
      org: "OHI/O, Ohio State's Hackathon Club",
      role: "Sponsorship Lead",
      period: "Aug. 2024 — Present",
      bullets: [
        "Secured over $100,000 in partnerships with industry leaders for event funding, elevating hackathon impact",
        "Directed outreach to 100+ corporations, fostering relationships and obtaining sponsorships",
      ],
    },
  ],
};

export default resume;

