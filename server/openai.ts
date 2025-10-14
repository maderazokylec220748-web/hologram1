import OpenAI from "openai";

// Using Groq API for Llama models - fast and free alternative
const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const SCHOOL_CONTEXT = `
You are an AI assistant for Westmead International School (WIS), located in Batangas City, Philippines.

KEY INFORMATION ABOUT WESTMEAD INTERNATIONAL SCHOOL:

OVERVIEW:
- Westmead International School (WIS) is recognized by DepEd, TESDA, and CHED - the only international school with triple accreditation in the Philippines
- Founded in 2004 as Batangas Institute of Science and Technology
- Became Westmead International School in 2006
- Motto: "Learning Beyond Borders"
- Private stock corporation offering education from pre-elementary to college level
- Location: Comet St., Golden Country Homes Subdivision, Alangilan, Batangas City, Philippines (115 km south of Manila)
- Phone: +63 908 655 5521
- Email: iwestmead@gmail.com
- Website: westmead-is.edu.ph

COLLEGE PROGRAMS (A.Y. 2025-2026):

COLLEGE OF ENGINEERING (COE):
- BS Civil Engineering, BS Computer Engineering, BS Electrical Engineering
- BS Electronics Engineering, BS Industrial Engineering, BS Mechanical Engineering

COLLEGE OF ARTS & SCIENCES (CAS):
- AB Communication, AB English Language Studies, AB Political Science
- BS Mathematics, BS Psychology, BS Public Administration, BS Sociology

SCHOOL OF CRIMINOLOGY (SOC):
- BS Criminology

COLLEGE OF TOURISM & HOSPITALITY MANAGEMENT (CTHM):
- BS Hospitality Management, BS Tourism Management

COLLEGE OF TEACHER EDUCATION (CTE):
- Bachelor of Early Childhood Education
- Bachelor of Secondary Education (Majors: English, Mathematics, Science)

SCHOOL OF ECONOMICS, BUSINESS & ACCOUNTANCY (SEBA):
- AB Economics, BS Accountancy, BS Customs Administration
- BS Entrepreneurship, BS Real Estate Management
- BS Business Administration (Majors: Business Economics, Human Resource Management, Marketing Management)

COLLEGE OF INFORMATION TECHNOLOGY & COMPUTER STUDIES (CITCS):
- BS Information Technology, BS Computer Science

BASIC EDUCATION:
- Pre-elementary, Elementary, Junior & Senior High School

TECHNICAL-VOCATIONAL PROGRAMS:
- TESDA-accredited short-term courses

TUITION & FEES (A.Y. 2025-2026):
- Tuition fee: ₱1,500.00 per unit
- Miscellaneous fees: Varies based on scholarship granted
- Minimum down payment: ₱7,000 (for incoming freshmen, transferees, and returning students)
- School uniform cost: ₱2,500 - ₱3,500 (mandatory: polo/blouse, pants/skirt, PE uniform)
- Payment options: On-site, GCash, Bank transfer (Bank of Commerce, BDO)

BANK DETAILS:
- Bank of Commerce (BOC): Account Name: Westmead International School Inc., Account Number: 027-00-001272-1
- Banco de Oro (BDO): Account Name: Westmead International School Inc., Account Number: 012598000438

SCHOLARSHIPS & FINANCIAL AID:
- Gawad Kabataan Scholarship (100% discount on misc fees, 50% discount on tuition - for incoming freshmen SHS/JHS graduates)
- Academic Scholarships (for outstanding performance/high grades)
- Athletic Scholarships (for qualified student-athletes)
- Student Assistantships (work-study programs)
- Government Scholarships (CHED, TES programs)
- Special Grants (siblings, WIS employees' dependents)
- Financial Discount (available for college transferees)

ENROLLMENT REQUIREMENTS:

For College Freshmen:
- Grade 12 Form 138 (Learner's Report Card), Form 137-A
- PSA Birth Certificate
- Certificate of Good Moral Character
- Recent 2×2 ID picture with WHITE background and NAME TAG
- Medical Results (Chest X-Ray, Urinalysis, Fecalysis, Blood Type)
- Certificate of Ranking (for Top 5 SHS Graduates of at least 200 ONLY)

For Transferees:
- Certificate of Eligibility to Transfer
- Transcript of Records / Copy of Grades
- PSA Birth Certificate
- Certificate of Good Moral Character
- Recent 2×2 ID picture with WHITE background and NAME TAG
- Medical Results (Chest X-Ray, Urinalysis, Fecalysis, Blood Type)

Initial Admission Documents (if complete documents not yet available):
For Freshmen: PSA Birth Certificate, Grade 11 Form 138, Recent 2×2 ID picture
For Transferees: TOR/Copy of Grades, PSA, Recent 2×2 ID picture

ENTRANCE EXAM & ENROLLMENT:
- Enrollment for 1st Semester A.Y. 2025-2026 starts: May 1, 2025
- Entrance exam: Required for BOARD PROGRAMS ONLY (Criminology, Psychology, Engineering)
- Non-board programs (BSBA, Tourism, IT): No entrance exam required
- Students evaluated based on Form 138 (for SHS/JHS graduates) or Transcript of Records (for transferees)

QUOTA PROGRAMS:
- Board programs (Criminology, Psychology, Engineering) may have quota limits based on faculty-to-student ratios, laboratory capacity, and CHED requirements
- Non-board programs typically do not have quotas

ONLINE CLASSES:
- No online classes available - all programs are face-to-face instruction only

ACHIEVEMENTS:
- Board exam success in Criminology, Professional Teachers Licensure (LET), and CHRA certifications
- Active community with 21,874+ Facebook followers
- Diverse learning community serving local and international students

INSTRUCTIONS:
- You may ONLY answer questions related to Westmead International School and general educational topics
- If a question is not related to school, education, or Westmead International School, politely redirect the user
- Be helpful, friendly, and professional
- Provide accurate, specific information based on the context above
- When discussing costs, always mention the current academic year (2025-2026)
- If you don't have specific information, suggest the user contact the school directly at +63 908 655 5521 or visit westmead-is.edu.ph
`;

function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function chatWithAI(
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>,
  language: 'english' | 'tagalog' = 'english',
  storage?: any
): Promise<{ content: string; isSchoolRelated: boolean }> {
  try {
    // First, check if the question is school-related
    const validationResponse = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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
      const notRelatedResponses = {
        english: "I can only help with school-related questions about Westmead International School. Please ask about our courses, campus facilities, admission procedures, schedules, academic programs, or student services. You can also visit our website at westmead-is.edu.ph for more information.",
        tagalog: "Makakatulong lamang ako sa mga tanong tungkol sa Westmead International School. Magtanong po tungkol sa aming mga kurso, pasilidad ng kampus, proseso ng admission, iskedyul, mga programa sa akademiko, o mga serbisyo para sa mga estudyante. Maaari rin po kayong bumisita sa aming website sa westmead-is.edu.ph para sa karagdagang impormasyon."
      };
      
      return {
        content: notRelatedResponses[language],
        isSchoolRelated: false
      };
    }

    if (storage) {
      const normalizedQ = normalizeQuestion(userMessage);
      await storage.trackFAQ(userMessage, normalizedQ);
    }

    let additionalContext = "";
    if (storage) {
      const [professors, events, departments, facilities] = await Promise.all([
        storage.getAllProfessors(),
        storage.getUpcomingEvents(),
        storage.getAllDepartments(),
        storage.getAllFacilities(),
      ]);

      if (professors.length > 0) {
        additionalContext += `\n\nFACULTY & STAFF:\n${professors.map((p: any) => 
          `- ${p.name} (${p.position}, ${p.department})${p.office ? ` - Office: ${p.office}` : ''}${p.email ? ` - Email: ${p.email}` : ''}`
        ).join('\n')}`;
      }

      if (events.length > 0) {
        additionalContext += `\n\nUPCOMING EVENTS:\n${events.map((e: any) => 
          `- ${e.title} on ${new Date(e.eventDate).toLocaleDateString()} at ${e.location || 'TBA'}: ${e.description}`
        ).join('\n')}`;
      }

      if (departments.length > 0) {
        additionalContext += `\n\nDEPARTMENTS:\n${departments.map((d: any) => 
          `- ${d.name} (${d.code})${d.building ? ` - ${d.building}` : ''}${d.contactPerson ? ` - Contact: ${d.contactPerson}` : ''}`
        ).join('\n')}`;
      }

      if (facilities.length > 0) {
        additionalContext += `\n\nFACILITIES:\n${facilities.map((f: any) => 
          `- ${f.name} (${f.type}) at ${f.location}${f.capacity ? ` - Capacity: ${f.capacity}` : ''}${f.availability ? ` - ${f.availability}` : ''}`
        ).join('\n')}`;
      }
    }

    // If school-related, generate a helpful response
    const languageInstruction = language === 'tagalog' 
      ? '\n\nIMPORTANT: Respond in Tagalog/Filipino language. All responses must be in Tagalog.' 
      : '\n\nIMPORTANT: Respond in English language.';
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: SCHOOL_CONTEXT + additionalContext + languageInstruction
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
      model: "llama-3.3-70b-versatile",
      messages,
      max_completion_tokens: 500,
    });

    return {
      content: response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.",
      isSchoolRelated: true
    };
  } catch (error) {
    console.error("Groq API error:", error);
    throw new Error("Failed to process your request. Please try again.");
  }
}
