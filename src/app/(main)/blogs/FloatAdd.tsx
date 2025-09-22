import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function FloatAdd() {
  const router = useRouter();
  return (
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <button
        onClick={() => router.push("/create-blog")}
        className="border rounded-full p-3 bg-primary text-white shadow-lg hover:scale-105 transition-transform"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
