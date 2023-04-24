import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type POSTTYPE = {
  id: string | number;
  title: string;
};

const POSTS: POSTTYPE[] = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// /post => ["posts"]
// /post/1 => ["posts", post.id]
// /post?authorId=1 => ["posts", {authorId: 1}]
// /post/2/comments => ["posts", post.id, "comments"]

function App() {
  // console.log(POSTS);
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: (obj) =>
      wait(1000).then(() => {
        console.log({ obj });
        return [...POSTS];
      }),
    // queryFn: () => Promise.reject("Error"),
  });

  const postMutation = useMutation({
    mutationFn: async (title: string) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  if (postsQuery.isLoading) return <h1>Loading ...</h1>;
  if (postsQuery.isError)
    return <pre>{JSON.stringify(postsQuery.error, null, 2)}</pre>;

  return (
    <div>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        onClick={() => postMutation.mutate("Post nth")}
        disabled={postMutation.isLoading}
      >
        Add New
      </button>
    </div>
  );
}

export default App;
