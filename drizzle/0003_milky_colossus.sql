CREATE TABLE "my-next-app-schema"."post_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"parent_id" integer,
	"depth" integer NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."post_comments" ADD CONSTRAINT "post_comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "my-next-app-schema"."posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "my-next-app-schema"."post_comments" ADD CONSTRAINT "post_comments_parent_id_post_comments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "my-next-app-schema"."post_comments"("id") ON DELETE set null ON UPDATE no action;