import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-svh">
      <div className="flex container min-h-20 items-center justify-between">
        <h1 className="text-4xl font-bold">SONGZ</h1>
        <div className="flex gap-2">
          <Input className="w-96" placeholder="Search for songs" />
          <Button variant="default">Search</Button>
        </div>
        <Button>
          <User size={24} />
        </Button>
      </div>
    </main>
  );
}
