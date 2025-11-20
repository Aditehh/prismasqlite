import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
    // Fetch all posts
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">Welcome to my blog</h1>

            <Link href="/posts" className="underline">
                View posts
            </Link>

            <div className="mt-10 w-full max-w-xl text-left">
                <h2 className="text-xl font-bold mb-4">Recent Posts</h2>

                {posts.length === 0 && <p>No posts yet.</p>}

                {posts.map((post) => (
                    <div key={post.id} className="border p-4 rounded mb-4">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <p className="text-gray-600">{post.content}</p>
                        <p className="text-sm text-gray-400">
                            {new Date(post.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}
