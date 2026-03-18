CREATE TABLE "donor" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	CONSTRAINT "donor_email_unique" UNIQUE("email")
);
