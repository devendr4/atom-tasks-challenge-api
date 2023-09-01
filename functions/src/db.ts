import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { FirestoreTask, Task } from "./types";

initializeApp();

const db = getFirestore();

const pageSize = 10;

export const fetchTasksCollection = async (
  lastDocId?: string
): Promise<{ tasks: Task[]; lastTaskId?: string }> => {
  let lastDocDate = 0;

  if (lastDocId) {
    const lastDoc = (await db.collection("tasks").doc(lastDocId).get()).data();
    lastDocDate = lastDoc?.createdAt;
  }
  const snapshot = await db
    .collection("tasks")
    .orderBy("createdAt")
    .where("deleted", "==", false)
    .startAfter(lastDocDate || 0)
    .limit(pageSize)
    .get();

  const tasks: FirestoreTask[] = [];

  snapshot.forEach(task => {
    const data = task.data() as Omit<FirestoreTask, "id">;
    // only return non empty tasks
    if (Object.keys(data).length > 1) tasks.push({ id: task.id, ...data });
  });

  const snapshotLength = snapshot.docs.length;
  return {
    // only return lastTaskId if the current snapshot length is equal to pageSize
    // if no lastTaskId is returned, it means there isn't a next page to query
    lastTaskId:
      snapshotLength === pageSize
        ? snapshot.docs[snapshotLength - 1]?.id
        : undefined,
    tasks: tasks.map(v => ({ ...v, createdAt: v.createdAt.toDate() })),
  };
};

export const addTaskToCollection = async (task: Task) => {
  const newTask = db.collection("tasks");
  return newTask.add({ ...task, deleted: false, createdAt: new Date() });
};

export const editCollectionTask = async (task: Task) => {
  return db
    .collection("tasks")
    .doc(task.id)
    .update({
      ...task,
    });
};

export const deleteTaskFromCollection = async (id: string) => {
  return db.collection("tasks").doc(id).update({
    deleted: true,
  });
};
