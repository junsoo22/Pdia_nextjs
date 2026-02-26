import Blog from "@/features/blog/components/blog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function BlogPage() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Blog></Blog>
      </QueryClientProvider>
    </div>
  );
}
