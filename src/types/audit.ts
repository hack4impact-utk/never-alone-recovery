export type Audit = {
  id: string;
  createdDate: Date;
  staffName: string | null;
  clientName: string | null;
  type:
    | "rent_payment"
    | "rent_charge"
    | "client_discharge"
    | "client_enrollment"
    | "client_graduation"
    | "client_staff_changed"
    | "client_task_completed"
    | "staff_role_changed"
    | null;
  message: string | null;
};
