import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col text-center gap-10">
      <h1 className="text-5xl font-bold xl:mt-40 text-red-600">Not Found</h1>
      <p className="text-2xl">The page you are looking for does not exist.</p>
      <Link href={"/"}>
        <Button>Go to Home</Button>
      </Link>
    </main>
  );
}