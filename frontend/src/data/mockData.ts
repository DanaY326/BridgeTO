
export interface Event {
  id: string;
  name: string;
  description: string;
  datetime: string;
  groups: string[];
  approved: boolean;
  distance: number;
  category: string;
  organization: string;
}

export const categories = [
  "All Categories",
  "Missional Prayer",
  "Outreach",
  "Charity",
  "Other"
];

// ...existing interface and categories...

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "Uyghur Community Prayer & Cultural Exchange",
    description: "Join us in praying for and connecting with Uyghur families in our city. We're organizing a cultural exchange evening featuring traditional Uyghur music and cuisine while building meaningful friendships.",
    datetime: "2025-11-15 18:00:00",
    groups: ["Uyghur", "Central Asian"],
    approved: true,
    distance: 5.2,
    category: "Missional Prayer",
    organization: "City Hope Church"
  },
  {
    id: "2",
    name: "Bukharian Jewish Heritage Evening",
    description: "A respectful gathering to learn about and appreciate Bukharian Jewish culture and traditions. Local Bukharian community members will share their stories and experiences.",
    datetime: "2025-11-20 19:00:00",
    groups: ["Bukharian Jewish"],
    approved: true,
    distance: 3.8,
    category: "Outreach",
    organization: "Community Connect Org"
  },
  {
    id: "3",
    name: "Kurdish Community Support Initiative",
    description: "Monthly gathering focused on supporting local Kurdish families through practical assistance and friendship building. Currently seeking those with translation skills.",
    datetime: "2025-11-25 17:30:00",
    groups: ["Kurdish", "Middle Eastern", "Iranian Kurdish"],
    approved: true,
    distance: 4.5,
    category: "Charity",
    organization: "Helping Hands Ministry"
  },
  {
    id: "4",
    name: "Tibetan Friendship Network",
    description: "Weekly prayer and outreach planning for connecting with our  ibetan neighbors. We're developing relationships through ESL classes and cultural exchange activities.",
    datetime: "2025-11-10 19:00:00",
    groups: ["Tibetan", "Himalayan", "Diaspora Communities"],
    approved: true,
    distance: 2.3,
    category: "Missional Prayer",
    organization: "Global Outreach Church"
  },
  {
    id: "5",
    name: "Persian Jewish Community Bridge",
    description: "Building bridges with the Persian Jewish community through professional networking and cultural appreciation events. Focus on authentic relationships and mutual understanding.",
    datetime: "2025-11-30 18:30:00",
    groups: ["Persian Jewish", "Iranian Jewish"],
    approved: true,
    distance: 6.1,
    category: "Outreach",
    organization: "Unity Fellowship"
  }
];

export const myEvents: Event[] = [
  {
    id: "6",
    name: "Hazara Afghan Community Night",
    description: "Monthly gathering to support and pray for our Hazara Afghan neighbors. Looking for volunteers to help with children's programs and women's ESL conversation circles. Special focus on recently arrived families.",
    datetime: "2025-12-05 18:30:00",
    groups: ["Hazara", "Afghan", "Persian-speaking", "Refugee Communities"],
    approved: true,
    distance: 3.9,
    category: "Missional Prayer",
    organization: "New Hope International Fellowship"
  }
];