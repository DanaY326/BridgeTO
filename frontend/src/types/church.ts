export interface Church {
  id: string;
  name: string;
  lat: number;
  lng: number;
  acceptedRequests: number;
  openRequests: number;
  area: string;
  peopleGroups: string[];
}

export interface AreaStats {
  area: string;
  totalOpen: number;
  totalAccepted: number;
  churches: Church[];
}

export interface PeopleGroupStats {
  area: string;
  groups: string[];
  totalOpen: number;
}
