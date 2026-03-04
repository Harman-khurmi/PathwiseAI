"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => (
        <Card
          key={letter.id}
          className="group relative rounded-[32px] border-2 border-muted/30 bg-muted/5 hover:bg-muted/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 overflow-hidden"
        >
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl md:text-2xl font-black tracking-tight leading-none">
                  {letter.jobTitle}{" "}
                  <span className="text-muted-foreground font-medium text-lg leading-none">
                    at
                  </span>{" "}
                  {letter.companyName}
                </CardTitle>
                <CardDescription className="font-medium">
                  Generated on {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl h-10 w-10 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  onClick={() => router.push(`/cover-letter/${letter.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl h-10 w-10 hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[32px] border-2">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black">
                        Delete Cover Letter?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-base font-medium">
                        This action cannot be undone. This will permanently
                        delete your tailored cover letter for{" "}
                        <span className="text-primary font-bold">
                          {letter.jobTitle}
                        </span>{" "}
                        at{" "}
                        <span className="text-primary font-bold">
                          {letter.companyName}
                        </span>
                        .
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                      <AlertDialogCancel className="rounded-xl font-bold">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm font-medium line-clamp-3 leading-relaxed whitespace-pre-wrap">
              {letter.jobDescription}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
