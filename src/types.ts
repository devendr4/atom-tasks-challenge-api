export interface Task {
  id: string;
  title: string;
  description: string;
  pending: boolean;
  deleted?: boolean;
}
