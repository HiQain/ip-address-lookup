import { MOCK_POSTS } from "../lib/blog-store";

export function useListBlogs() {
  return {
    data: MOCK_POSTS,
    loading: false,
    error: null
  };
}
