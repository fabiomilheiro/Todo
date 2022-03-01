import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export const createConverter = <T extends { id: string }>() => ({
  toFirestore: (data: T): DocumentData => {
    const result: DocumentData = {
      ...data,
    };
    return result;
  },
  fromFirestore: (snap: QueryDocumentSnapshot): T => {
    const data = snap.data();
    const result: T = {
      ...(data as T),
      id: snap.id,
    };
    return result;
  },
});
