import "./config/env.js";
import { compareMistralAndAnthropic } from "./services/resumeAi.js";

async function testCompare() {
    console.log("==================================================");
    console.log("⚔️  AI MODEL COMPARISON: Mistral AI vs Anthropic Claude");
    console.log("==================================================");

    const sampleContext = `
CANDIDATE: Ankush Das
ROLE: Senior Full Stack AI Engineer
SKILLS: React.js, Node.js, Express, MongoDB, Python, LangChain, RAG Pipelines, Vector Search, Redis, System Architecture.
PROBLEM SOLVING & PROJECTS:
- Built scalable AI interview simulator handling 10k+ concurrent requests.
- Optimized database query latency by 65% using Redis caching and Mongo indexing.
- Implemented RAG pipeline for automated resume scoring and code review.
    `;

    const sampleQuestion = "Analyze candidate's problem-solving skills and give a code review / technical capability summary.";

    console.log(`📝 Context: Resume of ${sampleContext.includes("Ankush Das") ? "Ankush Das" : "Candidate"}`);
    console.log(`❓ Question: "${sampleQuestion}"\n`);
    console.log("⏳ Fetching responses from both Mistral AI and Anthropic Claude...\n");

    const comparison = await compareMistralAndAnthropic(sampleQuestion, sampleContext);

    console.log("\n--------------------------------------------------");
    console.log(`🤖 1. MISTRAL AI (Model: ${comparison.mistral.model})`);
    console.log(`⏱️ Response Time: ${comparison.mistral.timeMs} ms`);
    if (comparison.mistral.error) {
        console.log(`❌ Error: ${comparison.mistral.error}`);
    } else {
        console.log(`💬 Answer:\n${comparison.mistral.answer}`);
    }

    console.log("\n--------------------------------------------------");
    console.log(`🧠 2. ANTHROPIC CLAUDE (Model: ${comparison.anthropic.model})`);
    console.log(`⏱️ Response Time: ${comparison.anthropic.timeMs} ms`);
    if (comparison.anthropic.error) {
        console.log(`⚠️ Error / Key Status: ${comparison.anthropic.error}`);
        console.log(`👉 Add ANTHROPIC_API_KEY=your_key in backend/.env to get Claude responses.`);
    } else {
        console.log(`💬 Answer:\n${comparison.anthropic.answer}`);
    }
    console.log("==================================================");
}

testCompare();
