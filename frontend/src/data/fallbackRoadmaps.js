// Local fallback roadmap templates.
// Used when the backend/AI is offline or fails to return a roadmap JSON,
// guaranteeing the roadmap panel is never left empty after a roadmap request.

const ROADMAP_TEMPLATES = {
  devops: {
    title: "DevOps Engineer Roadmap",
    goal: "Become a job-ready DevOps & Cloud Engineer",
    summary: "From Linux and networking to Docker, Kubernetes, CI/CD and cloud platforms.",
    estimatedDuration: "6 months",
    progress: 0,
    steps: [
      {
        id: "linux",
        order: 1,
        title: "Linux & Networking",
        subtitle: "Foundation",
        reason: "Every DevOps role runs on Linux servers, shells and networks.",
        duration: "3 weeks",
        status: "not_started",
        topics: [
          { title: "Linux Command Line & Permissions", reason: "You will live in the terminal for server administration.", action: "Practice file operations, users, groups, chmod/chown and process management.", completed: false },
          { title: "Bash Scripting", reason: "Automation is core to DevOps, and Bash is the glue.", action: "Write a script that backs up files and schedules it with cron.", completed: false },
          { title: "Networking Basics", reason: "Understanding IP, DNS, ports and firewalls is essential.", action: "Set up a simple VPS and configure firewall rules.", completed: false }
        ],
        project: {
          title: "Personal Linux VPS",
          description: "Provision a VPS, secure SSH, set up nginx and a firewall.",
          skills: ["Linux", "Bash", "Networking", "SSH", "Nginx"]
        }
      },
      {
        id: "containers",
        order: 2,
        title: "Docker & Containers",
        subtitle: "Core Skill",
        reason: "Containers are the standard way applications are packaged and shipped.",
        duration: "3 weeks",
        status: "not_started",
        topics: [
          { title: "Docker Fundamentals", reason: "Images, containers and the Docker lifecycle are the basics.", action: "Containerize a Node.js app with a Dockerfile and docker-compose.", completed: false },
          { title: "Docker Compose", reason: "Multi-service apps need orchestration at the dev level.", action: "Build a stack with app + database + redis using compose.", completed: false }
        ],
        project: {
          title: "Containerized Todo App",
          description: "Run a full app with database and cache using docker-compose.",
          skills: ["Docker", "Docker Compose", "Node.js", "PostgreSQL"]
        }
      },
      {
        id: "kubernetes",
        order: 3,
        title: "Kubernetes",
        subtitle: "Orchestration",
        reason: "Kubernetes is the industry standard for running containers at scale.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "Pods, Deployments & Services", reason: "These primitives define how workloads run and communicate.", action: "Deploy an app on minikube and expose it via a service.", completed: false },
          { title: "Helm & Ingress", reason: "Helm packages complex apps; Ingress routes external traffic.", action: "Install a chart with Helm and configure an ingress rule.", completed: false }
        ],
        project: {
          title: "Kubernetes Mini Cluster",
          description: "Deploy a microservice app with load balancing and scaling.",
          skills: ["Kubernetes", "Helm", "Ingress", "YAML"]
        }
      },
      {
        id: "cicd",
        order: 4,
        title: "CI/CD Pipelines",
        subtitle: "Automation",
        reason: "Automated build, test and deploy pipelines are the heartbeat of DevOps.",
        duration: "3 weeks",
        status: "not_started",
        topics: [
          { title: "GitHub Actions", reason: "Cloud CI/CD is the fastest way to see pipelines in action.", action: "Build a pipeline that runs tests and deploys on push.", completed: false },
          { title: "Deployment Strategies", reason: "Blue-green and canary releases reduce deployment risk.", action: "Implement a zero-downtime deploy for a web service.", completed: false }
        ],
        project: {
          title: "Automated Deploy Pipeline",
          description: "Push-to-deploy pipeline with tests, build and rollback.",
          skills: ["GitHub Actions", "Testing", "Deployment", "Docker"]
        }
      },
      {
        id: "cloud",
        order: 5,
        title: "Cloud & IaC",
        subtitle: "AWS / Terraform",
        reason: "Real production infrastructure runs on cloud platforms managed as code.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "AWS Core Services", reason: "EC2, S3, VPC, IAM and Lambda cover most daily work.", action: "Provision resources and secure them with IAM roles.", completed: false },
          { title: "Terraform", reason: "Infrastructure-as-Code makes cloud changes reviewable and repeatable.", action: "Write Terraform modules to create a full environment.", completed: false }
        ],
        project: {
          title: "Serverless + Infra Project",
          description: "Deploy a serverless API with S3, Lambda and Terraform.",
          skills: ["AWS", "Terraform", "IaC", "Serverless"]
        }
      }
    ]
  },

  mern: {
    title: "MERN Stack Developer Roadmap",
    goal: "Become a job-ready MERN Stack Developer",
    summary: "From JavaScript foundations to React, Node.js, MongoDB and deployment.",
    estimatedDuration: "6 months",
    progress: 0,
    steps: [
      {
        id: "javascript",
        order: 1,
        title: "JavaScript",
        subtitle: "Foundation",
        reason: "JavaScript powers both the React frontend and the Node.js backend.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "ES6+", reason: "Modern syntax is used everywhere in React and Node.", action: "Practice destructuring, spread, modules and arrow functions.", completed: false },
          { title: "Async & Promises", reason: "Every API call and database query is asynchronous.", action: "Build a small app that fetches data from an API.", completed: false }
        ],
        project: {
          title: "Weather Application",
          description: "Build a weather app using a public API.",
          skills: ["JavaScript", "Async/Await", "Fetch API"]
        }
      },
      {
        id: "react",
        order: 2,
        title: "React",
        subtitle: "Frontend",
        reason: "React is the core UI library of the MERN stack.",
        duration: "5 weeks",
        status: "not_started",
        topics: [
          { title: "Components & Props", reason: "Reusable components are the building blocks of a UI.", action: "Build a component library with Button, Card and Navbar.", completed: false },
          { title: "Hooks", reason: "useState and useEffect handle state and side effects.", action: "Build an interactive form with validation.", completed: false }
        ],
        project: {
          title: "Task Manager UI",
          description: "A task manager frontend with add, complete and delete.",
          skills: ["React", "Hooks", "Component Design"]
        }
      },
      {
        id: "node",
        order: 3,
        title: "Node.js & Express",
        subtitle: "Backend",
        reason: "Node.js with Express builds the API layer of the stack.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "Node Fundamentals", reason: "Understand the runtime, modules and file system.", action: "Create an HTTP server from scratch.", completed: false },
          { title: "Express & REST APIs", reason: "Express routes power CRUD operations cleanly.", action: "Build CRUD APIs with validation and middleware.", completed: false }
        ],
        project: {
          title: "Task Management API",
          description: "Robust REST API with auth, validation and error handling.",
          skills: ["Node.js", "Express", "REST API", "Auth"]
        }
      },
      {
        id: "mongodb",
        order: 4,
        title: "MongoDB & Mongoose",
        subtitle: "Database",
        reason: "MongoDB stores the data and Mongoose models it.",
        duration: "3 weeks",
        status: "not_started",
        topics: [
          { title: "Mongo Basics", reason: "Documents, collections and queries are the fundamentals.", action: "Perform CRUD operations on a sample database.", completed: false },
          { title: "Mongoose & Relations", reason: "Schema modeling keeps backend data consistent.", action: "Create User and Task schemas with relations.", completed: false }
        ],
        project: {
          title: "Full Stack Task Manager",
          description: "Connect React, Express and MongoDB into one app.",
          skills: ["React", "Node.js", "Express", "MongoDB"]
        }
      }
    ]
  },

  python: {
    title: "Python & Generative AI Engineer Roadmap",
    goal: "Become a Python & Generative AI Engineer",
    summary: "Python fundamentals to ML, LLM APIs, RAG and deployment.",
    estimatedDuration: "7 months",
    progress: 0,
    steps: [
      {
        id: "python-core",
        order: 1,
        title: "Python Core",
        subtitle: "Foundation",
        reason: "Everything AI-related is built on solid Python fundamentals.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "Syntax, Data Structures", reason: "Lists, dicts, sets and comprehensions do the heavy lifting.", action: "Solve 50 Python exercises on functions and data structures.", completed: false },
          { title: "OOP & Modules", reason: "Classes and packages structure large AI projects.", action: "Build a small library package with classes.", completed: false }
        ],
        project: {
          title: "Data Toolkit Package",
          description: "A Python package for reading and cleaning data.",
          skills: ["Python", "OOP", "Packaging"]
        }
      },
      {
        id: "data",
        order: 2,
        title: "Data & ML Basics",
        subtitle: "NumPy / Pandas",
        reason: "Data handling and model foundations precede generative AI.",
        duration: "5 weeks",
        status: "not_started",
        topics: [
          { title: "NumPy & Pandas", reason: "Vectorized operations are at the core of ML.", action: "Clean and analyze a real dataset with Pandas.", completed: false },
          { title: "ML Fundamentals", reason: "Understand training, features and evaluation.", action: "Train a scikit-learn model and evaluate it.", completed: false }
        ],
        project: {
          title: "Exploratory Data Analysis",
          description: "End-to-end analysis with visualizations and insights.",
          skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"]
        }
      },
      {
        id: "llm",
        order: 3,
        title: "LLMs & APIs",
        subtitle: "Generative AI",
        reason: "Modern AI apps are built on LLM APIs and prompt engineering.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "Prompt Engineering", reason: "Good prompts control model output reliably.", action: "Build a prompt template library and test variations.", completed: false },
          { title: "LLM API Integration", reason: "RAG and streaming need solid API integration.", action: "Build a chatbot that streams responses via an LLM API.", completed: false }
        ],
        project: {
          title: "AI Chat Assistant",
          description: "A streaming chatbot with conversation memory.",
          skills: ["LLM API", "Prompt Engineering", "Streaming", "Python"]
        }
      },
      {
        id: "rag",
        order: 4,
        title: "RAG & Vector DBs",
        subtitle: "Retrieval",
        reason: "RAG grounds answers in your own data using embeddings.",
        duration: "4 weeks",
        status: "not_started",
        topics: [
          { title: "Embeddings & Vector Search", reason: "Vectors power similarity search over documents.", action: "Index a document set and implement semantic search.", completed: false },
          { title: "Building a RAG Pipeline", reason: "Retrieve, augment and generate answers from sources.", action: "Build a document Q&A bot with citations.", completed: false }
        ],
        project: {
          title: "Document Q&A Bot",
          description: "Ask questions over your own documents with citations.",
          skills: ["RAG", "Embeddings", "Vector DB", "LLM"]
        }
      }
    ]
  },

  data: {
    title: "Data Analyst Roadmap",
    goal: "Become a job-ready Data Analyst",
    summary: "Excel and SQL to Python, statistics, dashboards and storytelling.",
    estimatedDuration: "5 months",
    progress: 0,
    steps: [
      { id: "sql", order: 1, title: "SQL & Databases", subtitle: "Foundation", reason: "SQL is the language of data analysis.", duration: "3 weeks", status: "not_started",
        topics: [
          { title: "Queries & Joins", reason: "Joins and aggregations are daily work for analysts.", action: "Answer 30 business questions with SQL queries.", completed: false },
          { title: "Window Functions", reason: "Ranking and running totals unlock advanced analysis.", action: "Compute running totals and rankings on a dataset.", completed: false }
        ],
        project: { title: "Sales Dashboard Queries", description: "Build a query set powering a sales dashboard.", skills: ["SQL", "Joins", "Aggregations"] } },
      { id: "python", order: 2, title: "Python & Pandas", subtitle: "Analysis", reason: "Python automates analysis and handles big tables.", duration: "4 weeks", status: "not_started",
        topics: [
          { title: "Pandas Essentials", reason: "Filter, group and pivot quickly.", action: "Clean a messy real-world dataset.", completed: false },
          { title: "Data Visualization", reason: "Charts communicate insights clearly.", action: "Build a multi-chart report with Matplotlib/Seaborn.", completed: false }
        ],
        project: { title: "Marketing Analysis", description: "Analyze campaign performance and visualize results.", skills: ["Python", "Pandas", "Seaborn"] } },
      { id: "stats", order: 3, title: "Statistics & A/B Testing", subtitle: "Insights", reason: "Statistics turn data into defensible conclusions.", duration: "4 weeks", status: "not_started",
        topics: [
          { title: "Descriptive & Inferential Stats", reason: "Summaries and sampling make analysis rigorous.", action: "Compute distributions and confidence intervals.", completed: false },
          { title: "A/B Testing", reason: "Experiments drive product decisions.", action: "Analyze an A/B test and report significance.", completed: false }
        ],
        project: { title: "A/B Test Report", description: "Full experiment analysis with recommendations.", skills: ["Statistics", "A/B Testing", "Reporting"] } },
      { id: "visualization", order: 4, title: "Dashboards & Storytelling", subtitle: "BI Tools", reason: "Dashboards turn analysis into decisions.", duration: "3 weeks", status: "not_started",
        topics: [
          { title: "Business Dashboards", reason: "Executives consume insights through dashboards.", action: "Build an interactive dashboard in Power BI or Tableau.", completed: false },
          { title: "Presentation Skills", reason: "Insights only matter if communicated clearly.", action: "Present a data story to a mock stakeholder.", completed: false }
        ],
        project: { title: "Interactive Business Dashboard", description: "End-to-end dashboard with drill-downs.", skills: ["Power BI", "SQL", "Storytelling"] } }
    ]
  },

  frontend: {
    title: "Frontend Developer Roadmap",
    goal: "Become a job-ready Frontend Developer",
    summary: "HTML, CSS, JavaScript, React and modern frontend tooling.",
    estimatedDuration: "5 months",
    progress: 0,
    steps: [
      { id: "htmlcss", order: 1, title: "HTML & CSS", subtitle: "Foundation", reason: "The semantic structure and styling foundation of every site.", duration: "3 weeks", status: "not_started",
        topics: [
          { title: "Semantic HTML & Layout", reason: "Modern layouts rely on Flexbox and Grid.", action: "Clone a landing page with Flexbox/Grid.", completed: false },
          { title: "Responsive Design", reason: "Users browse on every screen size.", action: "Make a site fully responsive across devices.", completed: false }
        ],
        project: { title: "Portfolio Landing Page", description: "A responsive, polished portfolio site.", skills: ["HTML", "CSS", "Responsive"] } },
      { id: "js", order: 2, title: "JavaScript", subtitle: "Interaction", reason: "JavaScript makes the UI interactive and powers React.", duration: "5 weeks", status: "not_started",
        topics: [
          { title: "DOM & Events", reason: "Direct DOM work teaches how browsers really work.", action: "Build a todo with dynamic DOM interactions.", completed: false },
          { title: "Fetch & Async", reason: "Apps consume data from APIs constantly.", action: "Build a UI fetching and rendering API data.", completed: false }
        ],
        project: { title: "Movie Search App", description: "Search and display movies from a public API.", skills: ["JavaScript", "Fetch", "DOM"] } },
      { id: "react", order: 3, title: "React", subtitle: "Framework", reason: "React is the most in-demand frontend library.", duration: "5 weeks", status: "not_started",
        topics: [
          { title: "Components & Props", reason: "Composition is how React UIs are built.", action: "Extract a component library from a UI.", completed: false },
          { title: "State & Effects", reason: "State and effects manage data flow.", action: "Add state management and data fetching to an app.", completed: false }
        ],
        project: { title: "E-Commerce Storefront", description: "A storefront with cart, filtering and checkout UI.", skills: ["React", "State", "Routing"] } },
      { id: "tooling", order: 4, title: "Tooling & Deployment", subtitle: "Production", reason: "Modern workflows need bundlers, Git and hosting.", duration: "3 weeks", status: "not_started",
        topics: [
          { title: "Vite & Build Tools", reason: "Fast dev server and optimized builds.", action: "Set up a Vite project with linting.", completed: false },
          { title: "Git & Deployment", reason: "Shipping requires version control and hosting.", action: "Deploy an app to Netlify/Vercel.", completed: false }
        ],
        project: { title: "Deployed Portfolio App", description: "A live, deployed React portfolio.", skills: ["Vite", "Git", "Vercel"] } }
    ]
  },

  backend: {
    title: "Backend Developer Roadmap",
    goal: "Become a job-ready Backend Developer",
    summary: "APIs, databases, authentication, testing and deployment.",
    estimatedDuration: "6 months",
    progress: 0,
    steps: [
      { id: "http-apis", order: 1, title: "HTTP & REST APIs", subtitle: "Foundation", reason: "Everything you build is an HTTP service.", duration: "3 weeks", status: "not_started",
        topics: [
          { title: "HTTP Fundamentals", reason: "Methods, status codes and headers drive all APIs.", action: "Build a request client and inspect traffic.", completed: false },
          { title: "REST Design", reason: "Clean resource design makes APIs easy to use.", action: "Design and document a RESTful API.", completed: false }
        ],
        project: { title: "Bookstore REST API", description: "CRUD API with validation and docs.", skills: ["HTTP", "REST", "Node.js"] } },
      { id: "db", order: 2, title: "Databases", subtitle: "Persistence", reason: "Backends exist to store and serve data safely.", duration: "4 weeks", status: "not_started",
        topics: [
          { title: "SQL & ORMs", reason: "Relational data and ORMs handle most apps.", action: "Model a domain using an ORM.", completed: false },
          { title: "Indexing & Performance", reason: "Slow queries kill apps.", action: "Optimize queries with indexes and explain plans.", completed: false }
        ],
        project: { title: "E-Commerce Catalog API", description: "A data-driven catalog with search and pagination.", skills: ["SQL", "ORMs", "Performance"] } },
      { id: "auth", order: 3, title: "Auth & Security", subtitle: "Security", reason: "Authentication protects every user system.", duration: "3 weeks", status: "not_started",
        topics: [
          { title: "Auth Methods", reason: "Session vs JWT and OAuth cover common cases.", action: "Implement login, signup and refresh tokens.", completed: false },
          { title: "Security Basics", reason: "Input validation and rate limiting stop attacks.", action: "Harden an API against common OWASP issues.", completed: false }
        ],
        project: { title: "Secure User Service", description: "Full auth microservice with rate limits.", skills: ["JWT", "Auth", "Security"] } },
      { id: "deploy", order: 4, title: "Deployment & Scaling", subtitle: "Production", reason: "Production readiness is the goal of a backend dev.", duration: "4 weeks", status: "not_started",
        topics: [
          { title: "Docker & Deployment", reason: "Containers make services portable.", action: "Containerize and deploy an API.", completed: false },
          { title: "Queues & Caching", reason: "Redis and message queues scale backends.", action: "Add caching and a background job queue.", completed: false }
        ],
        project: { title: "Production Backend", description: "Deploy a scalable API with Redis and Docker.", skills: ["Docker", "Redis", "Queues"] } }
    ]
  }
};

const GENERIC = {
  title: "Developer Learning Roadmap",
  goal: "Become a job-ready Developer",
  summary: "A flexible learning path covering fundamentals, core skills and projects.",
  estimatedDuration: "3 months",
  progress: 0,
  steps: [
    { id: "basics", order: 1, title: "Core Fundamentals", subtitle: "Foundation", reason: "Strong fundamentals make every later step faster.", duration: "2 weeks", status: "not_started",
      topics: [
        { title: "Programming Basics", reason: "Syntax, logic and problem solving come first.", action: "Solve daily coding challenges on your language of choice.", completed: false },
        { title: "Version Control with Git", reason: "Git is required in every dev job.", action: "Push a project to GitHub with commits and branches.", completed: false }
      ],
      project: { title: "Beginner Portfolio", description: "A small project you can show to recruiters.", skills: ["Programming", "Git", "Problem Solving"] } },
    { id: "stack", order: 2, title: "Your Core Stack", subtitle: "Core Skill", reason: "Depth in one stack beats shallow knowledge of many.", duration: "4 weeks", status: "not_started",
      topics: [
        { title: "Framework/Technology of Your Goal", reason: "Specialize in the tooling of your target role.", action: "Build 3 small apps using your core stack.", completed: false },
        { title: "APIs & Integration", reason: "Real apps combine multiple systems.", action: "Integrate a third-party API into an app.", completed: false }
      ],
      project: { title: "Full Feature App", description: "A polished app using your chosen stack.", skills: ["Your Stack", "APIs"] } },
    { id: "polish", order: 3, title: "Projects & Portfolio", subtitle: "Showcase", reason: "Projects are the proof employers want.", duration: "4 weeks", status: "not_started",
      topics: [
        { title: "Deploy & Document", reason: "Live projects and READMEs increase credibility.", action: "Deploy your app and write great documentation.", completed: false },
        { title: "Code Quality", reason: "Clean code and testing show professionalism.", action: "Add tests and refactor your project.", completed: false }
      ],
      project: { title: "Capstone Project", description: "A production-ready project for your portfolio.", skills: ["Deployment", "Testing", "Docs"] } },
    { id: "interview", order: 4, title: "Interview Prep", subtitle: "Getting Hired", reason: "Practice is what converts skill into a job.", duration: "2 weeks", status: "not_started",
      topics: [
        { title: "Problem Solving Practice", reason: "Coding interviews reward consistent practice.", action: "Solve 50 algorithm and logic questions.", completed: false },
        { title: "Resume & Storytelling", reason: "A clear narrative sells your experience.", action: "Tailor your resume to your target role.", completed: false }
      ],
      project: { title: "Mock Interviews", description: "Run practice interviews and improve weak areas.", skills: ["Problem Solving", "Resume"] } }
  ]
};

const ROLE_PATTERNS = [
  { key: "devops", words: ["devops", "kubernetes", "docker", "cloud engineer", "aws engineer", "cloud"] },
  { key: "mern", words: ["mern", "full stack", "fullstack", "react developer", "node developer", "web developer", "mevn"] },
  { key: "python", words: ["python", "generative ai", "gen ai", "llm", "machine learning", "ai engineer", "data science", "ai/ml"] },
  { key: "data", words: ["data analyst", "data analysis", "analytics", "power bi", "tableau"] },
  { key: "frontend", words: ["frontend", "front end", "ui developer", "react"] },
  { key: "backend", words: ["backend", "back end", "api developer", "server side", "node.js", "express"] }
];

const ROADMAP_WORDS = ["roadmap", "career path", "learning path", "learning plan", "study plan", "build my skills", "become a"];

/**
 * Detect which fallback roadmap template matches the user's request text.
 * Returns a roadmap object, or null if the message is not a roadmap request.
 */
export const buildFallbackRoadmap = (requestText = "") => {
  const text = (requestText || "").toLowerCase();

  for (const pattern of ROLE_PATTERNS) {
    if (pattern.words.some((w) => text.includes(w))) {
      return ROADMAP_TEMPLATES[pattern.key];
    }
  }

  if (ROADMAP_WORDS.some((w) => text.includes(w))) {
    return GENERIC;
  }

  return null;
};

export default { buildFallbackRoadmap };