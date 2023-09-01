import { GrpcStatus } from "firebase-admin/firestore";
import { Response } from "express";
import { FirestoreError } from "./types";

export const handleUpdateError = ({
  e,
  res,
}: {
  e: unknown;
  res: Response;
}) => {
  const error = e as FirestoreError;
  if (error.code === GrpcStatus.NOT_FOUND) {
    return res.status(404).json({ msg: "Task not found" });
  }

  return res.status(500).json({ msg: "An error has ocurred!" });
};
