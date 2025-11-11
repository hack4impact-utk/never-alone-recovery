import { Client, Task } from "./schema";

export type ClientTasks = Client & {
  tasks: Task[];
};
