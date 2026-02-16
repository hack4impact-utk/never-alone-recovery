ALTER TABLE "task" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "task_blueprint" DROP COLUMN "type";--> statement-breakpoint
DROP TYPE "public"."task_type";