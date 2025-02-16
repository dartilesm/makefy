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
    /* const result = streamObject({
      model: google("gemini-1.5-flash-latest"),
      system: `You are a career advisor. You will analyze a resume against a job description and provide specific suggestions to help the candidate optimize their resume for the role.`,
      prompt: `Analyze this resume against the job description and provide specific suggestions for improvement.
        Resume: ${resumeText}
        Job Description: ${jobDescription}`,
      schema: resumeSuggestionsSchema,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse(); */
    return NextResponse.json({
      areasToExpand:
        "- **Quantifiable achievements**: While the resume lists several accomplishments, it would benefit from more specific quantifiable results.  For example, instead of 'reducing page load times by 25%', specify the exact improvement (e.g., 'reduced page load time from 5 seconds to 3.75 seconds').  This adds credibility and showcases the impact of the candidate's work.\n- **Project details**:  Expand on the projects mentioned. Briefly describe the project's goals, challenges, and technologies used.  For instance, for the Shell Recharge project, mention the scale of the application (number of users, transactions, etc.).\n- **Leadership and teamwork**: Highlight instances where the candidate demonstrated leadership skills, mentored team members, or collaborated effectively.  The resume mentions mentorship, but adding specific examples would strengthen this aspect.\n- **Problem-solving skills**:  Showcase the candidate's ability to solve complex problems.  Describe situations where they identified and resolved critical issues, highlighting their analytical and problem-solving abilities.\n- **Keywords**: Incorporate relevant keywords from the job description to improve the resume's visibility to Applicant Tracking Systems (ATS).  Analyze the job description carefully and identify key skills and technologies mentioned.  Then, strategically integrate those keywords throughout the resume.\n- **Modernize the format**: The resume's formatting could be improved for better readability and visual appeal. Consider using a more modern and visually appealing template.  Ensure consistent formatting and use of capitalization.\n- **Skills section**: The skills section is a bit generic.  Categorize the skills (e.g., 'Frontend Frameworks', 'Testing', 'State Management') and use a consistent format.  Consider adding a proficiency level (e.g., Expert, Proficient, Familiar) to each skill.\n- **Portfolio**: Add a link to a portfolio showcasing the candidate's work.  This allows recruiters to see tangible examples of their skills and projects.",
      exampleText:
        "- **Quantifiable achievements example**:  Instead of 'reducing page load times by 25%', write 'Reduced page load time from 5 seconds to 3.75 seconds for Vizio and Inscape projects, resulting in a 25% improvement and a 10% increase in user engagement.'\n- **Project details example**: For the Shell Recharge project, add: 'Engineered a high-performance Next.js and Apollo (GraphQL) application for Shell Recharge (Volta Charging), serving over 10,000 users daily.  Successfully implemented caching improvements and enhanced usability, resulting in a 40% reduction in load time (from 3 seconds to 1.8 seconds).  Overcame challenges related to integrating with existing legacy systems and ensuring data consistency across multiple platforms.'\n- **Leadership and teamwork example**: 'Mentored junior developers on best practices in React development, leading to a 15% reduction in bug reports and improved code quality.'\n- **Problem-solving example**: 'Identified and resolved a critical performance bottleneck in the e-commerce platform, reducing server response time by 20% and improving overall system stability.'\n- **Keywords example**: If the job description mentions 'Agile methodologies', add a sentence like 'Successfully implemented Agile methodologies in multiple projects, contributing to efficient project delivery and improved team collaboration.'",
      keyJobQualifications:
        "- Proficiency in React, Next.js, and other modern frontend frameworks\n- Experience with server-side rendering and performance optimization\n- Strong understanding of state management libraries\n- Experience with testing frameworks\n- Ability to build high-performance, scalable web applications\n- Experience with GraphQL (if applicable based on the job description)\n- Demonstrated problem-solving and analytical skills\n- Leadership and teamwork skills",
    });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
