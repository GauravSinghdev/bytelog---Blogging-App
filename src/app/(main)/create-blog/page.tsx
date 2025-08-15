import redirectFn from '@/lib/redirectFn'
import AddBlog from './AddBlog'

export default async function CreateBlogPage() {
  await redirectFn();
  return (
    <main className="mt-20 max-w-6xl mx-auto min-h-screen flex flex-col gap-5">
        <AddBlog/>
    </main>
  )
}
