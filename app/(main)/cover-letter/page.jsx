import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/CoverLetterList";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-8 mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            My Cover <span className="gradient-title">Letters</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Manage and generate tailored cover letters for your applications.
          </p>
        </div>
        <Link href="/cover-letter/new">
          <Button size="lg" className="rounded-xl font-bold">
            <Plus className="h-5 w-5 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
