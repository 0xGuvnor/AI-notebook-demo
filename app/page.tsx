import TypewriteTitle from "@/components/typewrite-title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-rose-100 to-teal-100 via-indigo-100 min-h-screen grainyx">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI <span className="text-emerald-500 font-bold">note taking</span>{" "}
          assistant.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-2xl text-center">
          <TypewriteTitle />
        </h2>
        <div className="mt-8"></div>
        <div className="flex items-center justify-center">
          <Button size={"lg"} asChild>
            <Link href={"/dashboard"} className="group">
              <span className="text-lg">Get started</span>{" "}
              <ArrowRight
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all ease-in-out"
                strokeWidth={3}
              />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
