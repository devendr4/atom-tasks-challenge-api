import { getFirestore } from "firebase-admin/firestore";
import { cert, initializeApp } from "firebase-admin/app";
import { Task } from "./types";

initializeApp({ credential: cert("./gcp_key.json") });
const db = getFirestore();

export const fetchTasksCollection = async (): Promise<Task[]> => {
  const snapshot = await db.collection("tasks").get();
  const tasks: Task[] = [];
  snapshot.forEach(task => {
    const data = task.data() as Omit<Task, "id">;
    tasks.push({ id: task.id, ...data });
  });
  // return tasks that aren't empty by checking they have more than one field (the id field)
  return tasks.filter(task => Object.keys(task).length > 1) as Task[];
};

export const addTaskToCollection = async (task: Task) => {
  const newTask = db.collection("tasks");
  return newTask.add({ ...task });
};
