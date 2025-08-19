import redirectFn from '@/lib/redirectFn'
import AddBlog from './AddBlog'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create a blog"
}

export default async function CreateBlogPage() {
  await redirectFn();
  return (
    <main className="mt-10 max-w-6xl mx-auto min-h-screen flex flex-col gap-5">
        <AddBlog/>
    </main>
  )
}
