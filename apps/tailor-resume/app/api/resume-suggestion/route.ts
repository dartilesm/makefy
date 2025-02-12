import { google } from "@ai-sdk/google";
import { smoothStream, streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeSuggestionsSchema } from "@/schemas/resume-suggestions.schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume text and job description are required" },
        { status: 400 },
      );
    }

    // Stream improvement suggestions based on job description
    /*     const result = streamObject({
      model: google("gemini-1.5-flash-latest"),
      system: `You are a career advisor. You will analyze a resume against a job description and provide specific suggestions to help the candidate optimize their resume for the role.`,
      prompt: `Analyze this resume against the job description and provide specific suggestions for improvement.
        Resume: ${resumeText}
        Job Description: ${jobDescription}`,
      schema: resumeSuggestionsSchema,
      experimental_transform: smoothStream(),
    }); */

    /* return result.toTextStreamResponse(); */
    return NextResponse.json({
      areasToExpand: [
        "Highlight NestJS/Express.js experience: The job description emphasizes experience with NestJS or Express.js.  While the resume mentions extensive frontend experience, it lacks explicit mention of backend frameworks like NestJS or Express.js.  Add a section detailing projects where these technologies were used, even if it's a smaller part of the project. Quantify achievements whenever possible (e.g., 'Improved API response time by 15% using NestJS').",
        "Showcase Full-Stack Capabilities: The role is 60% frontend, 40% backend. The resume heavily focuses on frontend skills.  Re-organize the resume to better balance frontend and backend achievements.  Create a separate section for backend skills and projects, highlighting experience with relevant technologies like Node.js, GraphQL, PostgreSQL, CQRS, and event sourcing.  If limited backend experience exists, focus on transferable skills and a willingness to learn.",
        "Quantify Achievements More Effectively: The resume lists many accomplishments, but many lack quantifiable results.  Instead of 'Improved app load speed,' use 'Improved app load speed by 25% as measured by [tool/metric].'  This makes the impact of the work much clearer.",
        "Address Specific Job Requirements: The job description lists specific requirements like Docker, REST API consumption, and good software engineering fundamentals.  Explicitly mention experience with these in the skills section and provide examples in the work experience section.  For example, 'Developed and deployed microservices using Docker and Kubernetes, resulting in a 20% reduction in deployment time.'",
        "Improve English Language Proficiency: The job description requires good spoken and written English.  Ensure the resume is free of grammatical errors and uses strong, concise language.  Consider having a native English speaker review it.",
        "Tailor to Teramind's Culture:  The job description highlights Teramind's culture of innovation and collaboration.  Incorporate keywords and phrases that reflect these values.  For example, 'Collaborated with cross-functional teams to deliver high-quality software solutions.'",
        "Add a Summary/Profile Section:  Start with a brief summary highlighting key skills and experience relevant to the job description.  This will immediately grab the recruiter's attention.",
        "Refine Skills Section: The skills section is quite long and somewhat disorganized.  Categorize skills (e.g., Frontend Frameworks, Backend Frameworks, Databases, Testing, etc.) for better readability.  Remove less relevant skills unless they directly support the job requirements.",
      ],
      exampleText: [
        "**Summary:** Highly skilled and results-oriented Full-Stack Developer with 8+ years of experience building and optimizing high-performance web applications. Proven ability to translate UI/UX designs into clean, efficient code using React, Next.js, Node.js, and NestJS.  Experienced in implementing scalable solutions using GraphQL, PostgreSQL, and Docker.  Passionate about delivering exceptional user experiences and collaborating effectively within agile teams.",
        "**Backend Experience:**\n* Developed and maintained RESTful APIs using NestJS and Node.js for [Project Name], resulting in a 15% improvement in API response time.\n* Implemented a robust database schema using PostgreSQL for [Project Name], improving data retrieval efficiency by 20%.\n* Utilized Docker for containerization and deployment, reducing deployment time by 30%.",
        "**Skills:**\nFrontend: React, Next.js, Astro, TypeScript, Redux, Zustand, React Context, Tailwind CSS, Styled Components\nBackend: Node.js, NestJS, Express.js, GraphQL, PostgreSQL, Docker, CQRS, Event Sourcing\nDatabases: PostgreSQL, MySQL\nTesting: Jest, React Testing Library, Cypress\nOther: REST APIs, Agile methodologies, Git",
      ],
      keyJobQualifications: [
        "6+ years of experience in development",
        "4+ years of experience with React (Next.js), Nest.js (or Express.js), GraphQL, Docker",
        "Extensive programming experience in modern HTML, CSS, and JavaScript",
        "Experience consuming REST APIs and building scalable solutions",
        "Good software engineering fundamentals (data structures, OOP, algorithms, etc.)",
        "Excellent interpersonal skills",
        "Highly organized with precise attention to detail",
        "Ability to work well with others in a fast-paced, dynamic environment",
        "Desire to learn and adapt to new requirements",
        "Good spoken and written English",
      ],
    });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
