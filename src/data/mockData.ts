export interface Response {
  id: string;
  churchName: string;
  message: string;
  date: string;
}

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  requester: string;
  date: string;
  responses: Response[];
}

export const mockPrayerRequests: PrayerRequest[] = [
  {
    id: "1",
    title: "Prayer for Healing",
    description: "My mother is undergoing surgery next week. Please pray for her complete recovery and for the medical team's wisdom.",
    category: "Health",
    location: "Los Angeles, CA",
    requester: "Sarah Johnson",
    date: "2 days ago",
    responses: [
      {
        id: "r1",
        churchName: "Grace Community Church",
        message: "We're lifting your mother up in prayer. Our congregation will be praying for her healing and peace during this time.",
        date: "1 day ago"
      },
      {
        id: "r2",
        churchName: "Hope Baptist Church",
        message: "Praying for complete healing and comfort for your family. God is with you.",
        date: "1 day ago"
      }
    ]
  },
  {
    id: "2",
    title: "Guidance in Career Decision",
    description: "I'm facing a major career decision and need wisdom to choose the right path. Please pray for clarity and peace.",
    category: "Guidance",
    location: "New York, NY",
    requester: "Michael Chen",
    date: "5 days ago",
    responses: [
      {
        id: "r3",
        churchName: "City Light Church",
        message: "We're praying for divine wisdom and clarity. Trust that God will guide your steps.",
        date: "3 days ago"
      }
    ]
  },
  {
    id: "3",
    title: "Marriage Restoration",
    description: "My spouse and I are going through a difficult time. Please pray for healing, understanding, and restoration in our marriage.",
    category: "Relationships",
    location: "Chicago, IL",
    requester: "Anonymous",
    date: "1 week ago",
    responses: []
  },
  {
    id: "4",
    title: "Financial Breakthrough",
    description: "Struggling with unexpected bills and job loss. Praying for provision and new opportunities.",
    category: "Financial",
    location: "Houston, TX",
    requester: "David Martinez",
    date: "3 days ago",
    responses: [
      {
        id: "r4",
        churchName: "Cornerstone Fellowship",
        message: "Standing with you in prayer for provision and open doors. God is your provider.",
        date: "2 days ago"
      }
    ]
  },
  {
    id: "5",
    title: "Strength During Grief",
    description: "Recently lost my father. Please pray for comfort and peace for our family during this difficult time.",
    category: "Comfort",
    location: "Miami, FL",
    requester: "Emily Rodriguez",
    date: "4 days ago",
    responses: [
      {
        id: "r5",
        churchName: "First Methodist Church",
        message: "Our hearts are with you. Praying for God's comfort to surround you and your family.",
        date: "3 days ago"
      },
      {
        id: "r6",
        churchName: "Living Waters Church",
        message: "May the peace of God be with you. We're praying for strength and comfort.",
        date: "2 days ago"
      }
    ]
  }
];

export const categories = [
  "All Categories",
  "Unreached Peoples",
  "Persecution & Access Barriers",
  "Global Mobilization",
  "Indigenous Believers",
  "Transformation & Open Doors",
  "Other"
];

export const churchTypes = [
  "All Denominations",
  "Baptist",
  "Catholic",
  "Methodist",
  "Pentecostal",
  "Non-denominational",
  "Presbyterian",
  "Lutheran",
  "Episcopal",
  "Other"
];

export const locations = [
  "All Locations",
  "Brampton",
  "Danforth",
  "East York",
  "Etobicoke",
  "Mississauga",
  "North York",
  "Scarborough",
  "Vaughan",
  "York",
  "Other"
];
