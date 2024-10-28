// types.ts or at the top of your component files
export interface FamilyMember {
    _id: string;
    name: string;
    birthYear?: number;
    deathYear?: number;
    isAlive: boolean;
    gender: 'male' | 'female';
    parents: string[];
    children: FamilyMember[];
  }
  