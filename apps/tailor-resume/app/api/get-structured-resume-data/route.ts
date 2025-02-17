import { google } from "@ai-sdk/google";
import { streamObject, smoothStream, generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeDataSchema } from "@/schemas/resume-data.schema";
import { MockLanguageModelV1 } from "ai/test";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { resumeRawContent } = await request.json();

    if (!resumeRawContent) {
      return NextResponse.json(
        { error: "Resume content is required" },
        { status: 400 },
      );
    }

    // Stream the parsed resume object
    /* const result = streamObject({
      model: google("gemini-2.0-flash-001"),
      system:
        "You are a resume parser. Extract structured information from the resume. Fix any spelling errors and normalize whitespace in the extracted text. Ensure consistent spacing and formatting in the output.",
      prompt: `Parse this resume into a structured format: ${resumeRawContent}`,
      schema: resumeDataSchema,
      experimental_transform: smoothStream(),
    });
    return result.toTextStreamResponse(); */

    return NextResponse.json({
      education: [
        {
          degree: "Computer Science",
          endDate: "2018",
          school: "CARABOBO UNIVERSITY",
          startDate: "2015",
        },
      ],
      experience: [
        {
          company: "DEPT®",
          description:
            "- Engineered a high-performance Next.js and Apollo (GraphQL) application for Shell Recharge (Volta Charging), achieving a 40% reduction in load time by implementing caching improvements and enhancing usability.\n- Assisted in React and Web Components projects for Vizio and Inscape, reducing page load times by 25% through code optimizations.\n- Built a high-performance website using Next.js 13.4 and Contentful in a monorepo setup, reducing content management time by 30% and improving page performance.",
          endDate: "Present",
          startDate: "Agosto 2022",
          title: "Frontend Developer",
        },
        {
          company: "Coco pago",
          description:
            "- Developed an e-commerce platform using Nuxt (Vue), enhancing platform stability and reducing server response time by 20% through server-side rendering.\n- Improved app load speed by 25% by delegating tasks to the server, resulting in a more efficient and responsive user experience.\n- Optimized performance and scalability, contributing to a robust and reliable e-commerce solution.",
          endDate: "August 2022",
          startDate: "June 2021",
          title: "Frontend Developer",
        },
        {
          company: "Santander Tecnología",
          description:
            "- Led the development of a React-based chat system with microfrontend architecture, reducing deployment time by 50% and ensuring seamless integration across various platforms.\n- Successfully integrated the chat system with a legacy AngularJS application, improving cross-application communication and reducing dependency issues.\n- Implemented RESTful APIs to enhance data retrieval efficiency and improve user experience.",
          endDate: "Jun 2021",
          startDate: "November 2019",
          title: "Frontend Developer",
        },
        {
          company: "Workana (Freelance work)",
          description:
            "- Developed mobile apps using Ionic 2 and React Native, enhancing GPS functionality and improving app performance through optimization techniques.\n- Integrated RESTful APIs, improving data retrieval efficiency and reducing error rates in data reading/writing, enhancing overall app reliability.\n- Implemented NFC technology, boosting app reliability and reducing error rates, ensuring seamless data transactions for clients.",
          endDate: "December 2020",
          startDate: "March 2019",
          title: "Frontend Developer",
        },
        {
          company: "Lagash",
          description:
            "- Directed the development of a high-traffic Angular-based app for a bank's call center, improving call handling efficiency through performance optimization and streamlined user workflows.\n- Offered mentorship and support to team members, leading to a reduction in frontend-related issues and increased code quality.\n- Integrated RESTful APIs to enhance data retrieval efficiency and improve user experience.",
          endDate: "November 2019",
          startDate: "February 2018",
          title: "Frontend Developer",
        },
        {
          company: "Grupo Nepuntobiz",
          description:
            "- Developed e-learning and telecommunications applications using AngularJS and Angular 2, improving real-time data visualization performance and increasing system reliability.\n- Optimized the e-learning platform’s video and course retrieval times, contributing to a smoother user experience.\n- Integrated RESTful APIs, enhancing data retrieval efficiency and improving user experience.",
          endDate: "January 2018",
          startDate: "February 2017",
          title: "Frontend Developer",
        },
      ],
      personalInfo: {
        email: "diego@dartiles.dev",
        fullName: "Diego Artiles",
        links: ["dartiles.link", "LinkedIn Profile"],
        phone: "",
      },
      skills:
        "- Native Spanish and English speaker at intermediate level\n- Knowledge of creating applications integrated with artificial intelligence\n- Experience working with Tailwind CSS, Styled Components\n- Extensive experience working with testing tools such as Jest, React Testing Library, or Cypress\n- Familiarity with state management libraries such as Redux, Zustand, and React Context\n- Experience working with CMS such as Sanity and Strapi\n- Ability to work autonomously and manage different contexts",
      summary:
        "Frontend Developer with over 8 years of experience in modern technologies like React, Next.js, Astro, and web animations. Proficient in building web applications, optimizing performance through server-side rendering, caching improvements, and implementing scalable solutions. Experienced in improving system efficiency, boosting user retention with interactive animations, and enhancing usability. Skilled in TypeScript, state management libraries (Redux, Zustand, React Context), and testing tools (Jest, React Testing Library, Cypress).",
    });
  } catch (error) {
    console.error("Error structuring resume data:", error);
    return NextResponse.json(
      { error: "Failed to structure resume data" },
      { status: 500 },
    );
  }
}
