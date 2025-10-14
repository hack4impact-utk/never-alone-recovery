CREATE TYPE "public"."audit_type" AS ENUM('rent_payment', 'rent_charge', 'client_discharge', 'client_enrollment', 'client_graduation', 'client_staff_changed', 'client_task_completed', 'staff_role_changed');--> statement-breakpoint
CREATE TYPE "public"."client_status" AS ENUM('discharged', 'resident', 'graduated');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('disabled', 'staff', 'admin');--> statement-breakpoint
CREATE TYPE "public"."task_type" AS ENUM('drug_test', 'meeting');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('charge', 'payment');--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "audit" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"staff_id" text,
	"client_id" text,
	"type" "audit_type",
	"message" text
);
--> statement-breakpoint
CREATE TABLE "client" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"status" "client_status" DEFAULT 'resident' NOT NULL,
	"staff_id" text NOT NULL,
	"intake_form" text NOT NULL,
	CONSTRAINT "client_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "intake_form" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"date_of_birth" date NOT NULL,
	CONSTRAINT "intake_form_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "rent_transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"staff_id" text NOT NULL,
	"client_id" text NOT NULL,
	"type" "transaction_type" NOT NULL,
	"amount" numeric(19, 4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"staff_id" text NOT NULL,
	"client_id" text NOT NULL,
	"type" "task_type" NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "task_blueprint" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"staff_id" text NOT NULL,
	"client_id" text NOT NULL,
	"type" "task_type" NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"name" text NOT NULL,
	"email" text,
	"emailVerified" timestamp,
	"image" text NOT NULL,
	"role" "staff_role" DEFAULT 'disabled' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit" ADD CONSTRAINT "audit_staff_id_user_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit" ADD CONSTRAINT "audit_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_staff_id_user_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_intake_form_intake_form_id_fk" FOREIGN KEY ("intake_form") REFERENCES "public"."intake_form"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rent_transaction" ADD CONSTRAINT "rent_transaction_staff_id_user_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rent_transaction" ADD CONSTRAINT "rent_transaction_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_staff_id_user_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_blueprint" ADD CONSTRAINT "task_blueprint_staff_id_user_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_blueprint" ADD CONSTRAINT "task_blueprint_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;