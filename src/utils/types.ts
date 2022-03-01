import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export interface Todo {
  id?: string;
  title: string;
  done: boolean;
  createTimestamp: Timestamp;
}

export const createConverter = <T extends { id?: string }>() => ({
  toFirestore: (data: T): DocumentData => {
    const result: DocumentData = {
      ...data,
    };
    return result;
  },
  fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions): T => {
    const data = snap.data(options);
    const result: T = {
      ...(data as T),
    };
    return result;
  },
});
