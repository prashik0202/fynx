export type ProjectType = {
  id: number;
  name: string;
  createdDate: string;
  status: string
}

export const mockProjects = [
  {
    id: 1,
    name: "User Feedback Form",
    createdDate: "2025-01-10",
    status: "active",
  },
  {
    id: 2,
    name: "Bug Report Tracker",
    createdDate: "2025-01-15",
    status: "inactive",
  },
  {
    id: 3,
    name: "Customer Satisfaction Survey",
    createdDate: "2025-02-01",
    status: "active",
  },
  {
    id: 4,
    name: "Feature Request Board",
    createdDate: "2025-02-05",
    status: "archived",
  },
  {
    id: 5,
    name: "Internal Team Feedback",
    createdDate: "2025-02-20",
    status: "active",
  },
  {
    id: 6,
    name: "Product Review Collection",
    createdDate: "2025-03-01",
    status: "inactive",
  },
  {
    id: 7,
    name: "Beta Tester Feedback Form",
    createdDate: "2025-03-10",
    status: "active",
  },
  {
    id: 8,
    name: "Event Registration Form",
    createdDate: "2025-03-15",
    status: "inactive",
  },
  {
    id: 9,
    name: "Employee Exit Survey",
    createdDate: "2025-03-20",
    status: "archived",
  },
  {
    id: 10,
    name: "Onboarding Feedback Form",
    createdDate: "2025-04-01",
    status: "active",
  },
]
