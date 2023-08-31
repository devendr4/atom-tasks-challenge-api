import { getFirestore } from "firebase-admin/firestore";
import { cert, initializeApp } from "firebase-admin/app";
import { Task } from "./types";

initializeApp({ credential: cert("./gcp_key.json") });
const db = getFirestore();

export const fetchTasksCollection = async (): Promise<Task[]> => {
  const snapshot = await db.collection("tasks").get();
  return snapshot.docs.map(v => v.data()) as Task[];
};

export const createTask = async () => {
  const snapshot = await db.collection("tasks").get();
  return snapshot;
  // console.log(snapshot.docs.map(v => v.data()));
};
