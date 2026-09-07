export const mockRoadmapData = {
  title: "MERN Developer Roadmap",
  goal: "Become a job-ready MERN Stack Developer",
  summary: "A practical roadmap covering frontend, backend, database, deployment and real-world projects.",
  estimatedDuration: "6 months",
  progress: 42,
  steps: [
    {
      id: "javascript",
      order: 1,
      title: "JavaScript",
      subtitle: "Foundation",
      reason: "JavaScript is the foundation of both React frontend development and Node.js backend development.",
      duration: "4 weeks",
      status: "completed",
      topics: [
        {
          title: "ES6+",
          reason: "Modern JavaScript features are heavily used in modern React and Node.js applications.",
          action: "Practice destructuring, spread syntax, modules and arrow functions.",
          completed: true
        },
        {
          title: "Promises & Async/Await",
          reason: "Asynchronous programming is essential for API calls and backend operations.",
          action: "Build a small application that fetches data from an API.",
          completed: true
        }
      ],
      project: {
        title: "Weather Application",
        description: "Build a weather application using an external API.",
        skills: ["JavaScript", "Async/Await", "Fetch API"]
      }
    },
    {
      id: "react",
      order: 2,
      title: "React",
      subtitle: "Advanced Frontend",
      reason: "React allows you to build reusable component-based user interfaces efficiently.",
      duration: "5 weeks",
      status: "in_progress",
      topics: [
        {
          title: "Components",
          reason: "Components are the core building blocks of React applications.",
          action: "Build reusable Button, Card and Navbar components.",
          completed: true
        },
        {
          title: "Props",
          reason: "Props allow components to communicate and share data cleanly.",
          action: "Build a reusable ProductCard component.",
          completed: true
        },
        {
          title: "Hooks",
          reason: "Hooks allow functional components to manage state and side effects.",
          action: "Practice useState, useEffect and useRef.",
          completed: false
        },
        {
          title: "Context API",
          reason: "Context helps share global application state.",
          action: "Create a global authentication context.",
          completed: false
        }
      ],
      project: {
        title: "Task Manager",
        description: "Build a task management application using React state and context.",
        skills: ["React", "Hooks", "Context API"]
      }
    },
    {
      id: "node",
      order: 3,
      title: "Node.js & Express",
      subtitle: "Backend Development",
      reason: "Node.js allows you to build scalable backend applications using JavaScript.",
      duration: "4 weeks",
      status: "not_started",
      topics: [
        {
          title: "Node.js Fundamentals",
          reason: "You need to understand the Node runtime before building backend servers.",
          action: "Create a basic HTTP server using Node modules.",
          completed: false
        },
        {
          title: "Express.js",
          reason: "Express simplifies API development and route handling.",
          action: "Build a REST API with routing and middleware.",
          completed: false
        },
        {
          title: "REST APIs",
          reason: "REST APIs allow your frontend and backend applications to communicate.",
          action: "Build CRUD APIs for a task management application.",
          completed: false
        }
      ],
      project: {
        title: "Task Management API",
        description: "Build a robust REST API using Node.js and Express.",
        skills: ["Node.js", "Express", "REST API"]
      }
    },
    {
      id: "mongodb",
      order: 4,
      title: "MongoDB",
      subtitle: "Database & Integration",
      reason: "MongoDB allows you to persist application data and complete the MERN stack.",
      duration: "3 weeks",
      status: "not_started",
      topics: [
        {
          title: "MongoDB Basics",
          reason: "You need to understand documents and collections for data storage.",
          action: "Create a database and perform basic CRUD operations.",
          completed: false
        },
        {
          title: "Mongoose",
          reason: "Mongoose provides schema modeling and convenient database queries for Node.js.",
          action: "Create User and Task schemas with validation.",
          completed: false
        }
      ],
      project: {
        title: "Full Stack Task Manager",
        description: "Connect React, Node.js, Express and MongoDB into one production application.",
        skills: ["React", "Node.js", "Express", "MongoDB"]
      }
    }
  ]
};

export default mockRoadmapData;
