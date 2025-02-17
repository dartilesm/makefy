import { google } from "@ai-sdk/google";
import { smoothStream, streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeSuggestionsSchema } from "@/schemas/resume-suggestions.schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { resumeRawContent, jobDescription, jobTitle } = await request.json();

    if (!resumeRawContent || !jobDescription || !jobTitle) {
      return NextResponse.json(
        { error: "Resume text, job description and job title are required" },
        { status: 400 },
      );
    }

    // Stream improvement suggestions based on job description
    /* const result = streamObject({
      model: google("gemini-1.5-flash-latest"),
      system: `You are a career advisor. You will analyze a resume against a job description and provide specific suggestions to help the candidate optimize their resume for the role.`,
      prompt: `Analyze this resume against the job description and provide specific suggestions for improvement.
        Resume: ${resumeText}
        Job Title: ${jobTitle}
        Job Description: ${jobDescription}`,
      schema: resumeSuggestionsSchema,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse(); */
    return NextResponse.json({
      areasToExpand:
        '- **Highlight English Proficiency**: Explicitly state advanced English proficiency in the resume summary and reiterate it in the skills section.  Add a specific example showcasing professional English communication skills (e.g., "Successfully collaborated with US-based clients on multiple projects, delivering clear and concise technical documentation.").\n- **Showcase Teamwork and Problem-Solving**:  The job description emphasizes teamwork and problem-solving. Add quantifiable examples to your experience section demonstrating these skills. For instance, "Collaborated effectively with a team of 5 engineers to resolve a critical production issue, reducing downtime by X% and improving user satisfaction."\n- **Quantify Next.js Experience**:  The job description specifically mentions Next.js.  Highlight your Next.js experience with quantifiable results in each role.  For example, instead of "Built a high-performance website using Next.js," write "Built a high-performance website using Next.js, resulting in a Y% improvement in page load speed and a Z% increase in conversion rates."\n- **Emphasize Impact**:  Focus on the impact of your work in each role.  Instead of simply listing tasks, describe the positive outcomes and how your contributions benefited the company or clients.  Use action verbs and quantify your achievements whenever possible.\n- **Tailor to Oowlish\'s Mission**:  Incorporate language that aligns with Oowlish\'s mission of empowering therapists.  For example, you could mention how your work on previous projects improved accessibility or user experience, indirectly relating it to the positive impact on healthcare.\n- **Address \'Nice to Have\' Skills**: If you possess any familiarity with Nest.js, TypeScript, or Postgres, explicitly mention them in your skills section. Even a basic familiarity is worth highlighting.\n- **Update Resume Format**: The current resume format is inconsistent.  Use a more professional and consistent format, ensuring clear section headings and easy readability.\n- **Remove Typos**: Correct the typos present in the original resume (e.g., "Argentinaa," "C ontext," etc.).',
      exampleText:
        "- Successfully collaborated with US-based clients on multiple projects, delivering clear and concise technical documentation in English.\n- Collaborated effectively with a team of 5 engineers to resolve a critical production issue, reducing downtime by 15% and improving user satisfaction.\n- Built a high-performance website using Next.js, resulting in a 20% improvement in page load speed and a 10% increase in conversion rates.\n- Improved the accessibility of an e-commerce platform, resulting in a 12% increase in sales from users with disabilities.\n- Proficient in using TypeScript to build scalable and maintainable React applications.\n- Experience with Nest.js in building server-side applications.",
      keyJobQualifications:
        "- Advanced English proficiency (written and verbal)\n- 4+ years of professional experience in software development with a strong focus on React and Next.js\n- Excellent written communication and documentation skills\n- Problem-solving mindset\n- Ability to work effectively in a team\n- Eagerness to learn new technologies",
    });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
