import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SCHOOL_CONTEXT = `
You are an AI assistant for Westmead International School (WIS), located in Batangas City, Philippines.

KEY INFORMATION ABOUT WESTMEAD INTERNATIONAL SCHOOL:

OVERVIEW:
- Westmead International School (WIS) is the first international school accredited by DepEd, TESDA, and CHED
- Founded in 2004 as Batangas Institute of Science and Technology
- Became Westmead International School on September 5, 2006
- A private stock corporation offering education from pre-elementary to college level
- Located in Batangas City, Batangas, Philippines

MISSION & VISION:
- WIS education is geared towards the full consummation of the talents and potentials of the Filipino in the task of nation-building
- Focus on preparing students as "Westmead Warriors"

ACCREDITATION:
- Recognized by DepEd (Department of Education)
- Recognized by TESDA (Technical Education and Skills Development Authority)
- Recognized by CHED (Commission on Higher Education)

PROGRAMS:
- Pre-elementary education courses
- Full range of courses from preparatory school to college level
- Various colleges and programs available
- Scholarship opportunities available

ADMISSIONS:
- Online application available at: admission.westmead-is.edu.ph
- Admission requirements and enrollment procedures are available
- Students are encouraged to "Apply Now" to become Westmead Warriors

EVENTS & ACTIVITIES:
- Annual commencement exercises (e.g., 15th Commencement Exercises in 2025)
- Regular graduation ceremonies
- Student testimonials available on the website

CONTACT & RESOURCES:
- Main website: westmead-is.edu.ph
- Facebook page: facebook.com/westmead.official
- YouTube channel with videos and highlights
- Course information and programs available online

INSTRUCTIONS:
- You may ONLY answer questions related to Westmead International School and general educational topics
- If a question is not related to school, education, or Westmead International School, politely redirect the user
- Be helpful, friendly, and professional
- Provide accurate information based on the context above
- If you don't have specific information, suggest the user contact the school directly or visit the website
`;

export async function chatWithAI(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<{ content: string; isSchoolRelated: boolean }> {
  try {
    // First, check if the question is school-related
    const validationResponse = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a content filter for a school information kiosk. Determine if the user's question is related to:
          1. Westmead International School specifically
          2. General education topics (courses, schedules, campus, admissions, academics)
          3. Student life and school activities
          
          Questions about weather, entertainment, food recipes, general trivia, or non-school topics should be marked as NOT school-related.
          
          Respond with JSON in this exact format: { "isSchoolRelated": true/false, "reason": "brief explanation" }`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      response_format: { type: "json_object" },
    });

    const validation = JSON.parse(validationResponse.choices[0].message.content || '{"isSchoolRelated": false}');

    if (!validation.isSchoolRelated) {
      return {
        content: "I can only help with school-related questions about Westmead International School. Please ask about our courses, campus facilities, admission procedures, schedules, academic programs, or student services. You can also visit our website at westmead-is.edu.ph for more information.",
        isSchoolRelated: false
      };
    }

    // If school-related, generate a helpful response
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: SCHOOL_CONTEXT
      },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      })),
      {
        role: "user",
        content: userMessage
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages,
      max_completion_tokens: 500,
    });

    return {
      content: response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.",
      isSchoolRelated: true
    };
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error("Failed to process your request. Please try again.");
  }
}
