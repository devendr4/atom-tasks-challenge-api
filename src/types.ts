import { GrpcStatus } from "firebase-admin/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  pending: boolean;
  deleted?: boolean;
}

export interface FirestoreError {
  code: GrpcStatus;
  details: string;
  metadata: string;
  note: string;
}
