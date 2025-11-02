import { getSupabaseClient } from "@/lib/supabase-client"

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const supabase = getSupabaseClient()
  const { data } = await supabase.from("blogs").select("*").eq("slug", params.slug).single()
  const post = data

  if (!post) return <div className="p-12 text-center text-gray-500">Post not found</div>

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
