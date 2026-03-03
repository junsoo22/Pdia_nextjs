ALTER TABLE "my-next-app-schema"."blog_comments" DROP CONSTRAINT "blog_comments_parent_id_blog_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."blog_comments" DROP COLUMN "parent_id";--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."blog_comments" DROP COLUMN "depth";--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."blog_comments" DROP COLUMN "is_deleted";