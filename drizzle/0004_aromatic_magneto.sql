CREATE TABLE "donation" (
	"id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"created_by" text,
	"edited_date" timestamp DEFAULT now() NOT NULL,
	"edited_by" text,
	"donor_id" text NOT NULL,
	"amount" numeric(19, 4) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "donation" ADD CONSTRAINT "donation_donor_id_donor_id_fk" FOREIGN KEY ("donor_id") REFERENCES "public"."donor"("id") ON DELETE no action ON UPDATE no action;