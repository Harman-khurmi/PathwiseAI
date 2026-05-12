import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <h1 className="text-6xl font-black gradient-title">404</h1>
      <h2 className="text-2xl font-bold text-foreground">Resume Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The resume you are looking for does not exist or you don&apos;t have access to it.
      </p>
      <Link href="/dashboard">
        <Button className="mt-4 shadow-xl active:scale-95 transition-all">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
