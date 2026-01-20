import type { ApiQuestion } from "@/lib/types/survey-type"

export const mockSurveyQuestions: ApiQuestion[] = [
  {
    uuid: "550e8400-e29b-41d4-a716-446655440001",
    questionText: "What is your primary occupation?",
    questionType: "SINGLE_CHOICE",
    orderIndex: 1,
    isRequired: true,
    options: [
      {
        uuid: "opt-001-001",
        optionText: "Software Engineer",
        orderIndex: 1,
      },
      {
        uuid: "opt-001-002",
        optionText: "Product Manager",
        orderIndex: 2,
      },
      {
        uuid: "opt-001-003",
        optionText: "Designer",
        orderIndex: 3,
      },
      {
        uuid: "opt-001-004",
        optionText: "Business Analyst",
        orderIndex: 4,
      },
      {
        uuid: "opt-001-005",
        optionText: "Other",
        orderIndex: 5,
      },
    ],
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440002",
    questionText: "Please provide any additional feedback.",
    questionType: "SHORT_ANSWER",
    orderIndex: 2,
    isRequired: false,
    options: [],
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440003",
    questionText: "How satisfied are you with our service?",
    questionType: "SINGLE_CHOICE",
    orderIndex: 3,
    isRequired: true,
    options: [
      {
        uuid: "opt-003-001",
        optionText: "Very Satisfied",
        orderIndex: 1,
      },
      {
        uuid: "opt-003-002",
        optionText: "Satisfied",
        orderIndex: 2,
      },
      {
        uuid: "opt-003-003",
        optionText: "Neutral",
        orderIndex: 3,
      },
      {
        uuid: "opt-003-004",
        optionText: "Dissatisfied",
        orderIndex: 4,
      },
      {
        uuid: "opt-003-005",
        optionText: "Very Dissatisfied",
        orderIndex: 5,
      },
    ],
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440004",
    questionText: "Which features do you use most? (Select all that apply)",
    questionType: "MULTIPLE_CHOICE",
    orderIndex: 4,
    isRequired: true,
    options: [
      {
        uuid: "opt-004-001",
        optionText: "User Management",
        orderIndex: 1,
      },
      {
        uuid: "opt-004-002",
        optionText: "Analytics",
        orderIndex: 2,
      },
      {
        uuid: "opt-004-003",
        optionText: "Reporting",
        orderIndex: 3,
      },
      {
        uuid: "opt-004-004",
        optionText: "Integration Tools",
        orderIndex: 4,
      },
      {
        uuid: "opt-004-005",
        optionText: "API Access",
        orderIndex: 5,
      },
    ],
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440005",
    questionText: "What is your company size?",
    questionType: "SINGLE_CHOICE",
    orderIndex: 5,
    isRequired: true,
    options: [
      {
        uuid: "opt-005-001",
        optionText: "1-10 employees",
        orderIndex: 1,
      },
      {
        uuid: "opt-005-002",
        optionText: "11-50 employees",
        orderIndex: 2,
      },
      {
        uuid: "opt-005-003",
        optionText: "51-200 employees",
        orderIndex: 3,
      },
      {
        uuid: "opt-005-004",
        optionText: "201-1000 employees",
        orderIndex: 4,
      },
      {
        uuid: "opt-005-005",
        optionText: "1000+ employees",
        orderIndex: 5,
      },
    ],
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440006",
    questionText: "How did you hear about us?",
    questionType: "MULTIPLE_CHOICE",
    orderIndex: 6,
    isRequired: false,
    options: [
      {
        uuid: "opt-006-001",
        optionText: "Search Engine",
        orderIndex: 1,
      },
      {
        uuid: "opt-006-002",
        optionText: "Social Media",
        orderIndex: 2,
      },
      {
        uuid: "opt-006-003",
        optionText: "Referral",
        orderIndex: 3,
      },
      {
        uuid: "opt-006-004",
        optionText: "Advertisement",
        orderIndex: 4,
      },
      {
        uuid: "opt-006-005",
        optionText: "Word of Mouth",
        orderIndex: 5,
      },
    ],
  },
]

export const mockSurveyMetadata = {
  uuid: "d30ac73f-a761-4f6a-9713-68a191270dba",
  title: "Customer Satisfaction Survey",
  description:
    "Help us improve our service by sharing your feedback and experience.",
  startDate: "2024-01-15",
  closeDate: "2024-12-31",
  isPublic: "true",
  isClosed: "false",
  surveyType: "FEEDBACK",
}
