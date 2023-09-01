import { GrpcStatus, Timestamp } from "firebase-admin/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deleted?: boolean;
  createdAt: Date;
}
export interface FirestoreTask extends Omit<Task, "createdAt"> {
  // firestore automatically changes Dates to Timestamps
  // so it's needed to create a different type for the tasks with Timestamps returned by firebase
  createdAt: Timestamp;
}

export interface FirestoreError {
  code: GrpcStatus;
  details: string;
  metadata: string;
  note: string;
}
