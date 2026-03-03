CREATE TABLE "my-next-app-schema"."blog_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_id" integer,
	"parent_id" integer,
	"depth" integer NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "my-next-app-schema"."blogsComment" CASCADE;--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."blog_comments" ADD CONSTRAINT "blog_comments_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "my-next-app-schema"."blogs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."blog_comments" ADD CONSTRAINT "blog_comments_parent_id_blog_comments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "my-next-app-schema"."blog_comments"("id") ON DELETE set null ON UPDATE no action;