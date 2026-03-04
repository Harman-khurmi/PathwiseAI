import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/CoverLetterPreview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="container mx-auto py-8 md:py-12 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col space-y-4 mb-8">
        <Link href="/cover-letter">
          <Button
            variant="link"
            className="gap-2 pl-0 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              {coverLetter?.jobTitle}{" "}
              <span className="gradient-title">
                @ {coverLetter?.companyName}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Review and refine your tailored cover letter
            </p>
          </div>
        </div>
      </div>

      <CoverLetterPreview id={id} content={coverLetter?.content} />
    </div>
  );
}
