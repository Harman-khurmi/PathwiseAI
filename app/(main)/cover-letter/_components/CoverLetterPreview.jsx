"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Copy, Save, Edit, Eye, Split, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { Card } from "@/components/ui/card";

const CoverLetterPreview = ({ id, content: initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [editorMode, setEditorMode] = useState("preview"); // edit, live, preview
  const { theme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const {
    loading: isSaving,
    fn: updateLetterFn,
    data: updatedLetter,
  } = useFetch(updateCoverLetter);

  useEffect(() => {
    if (updatedLetter) {
      toast.success("Cover letter updated successfully!");
    }
  }, [updatedLetter]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Cover letter copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy cover letter");
    }
  };

  const handleSave = async () => {
    try {
      if (!content.trim()) {
        toast.error("Cover letter content cannot be empty");
        return;
      }
      await updateLetterFn(id, content);
    } catch (error) {
      toast.error(error.message || "Failed to save cover letter");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-muted/5 dark:bg-white/5 backdrop-blur-xl border-2 border-muted/30 p-4 rounded-3xl">
        <div className="flex items-center gap-1.5 bg-background p-1.5 rounded-2xl border-2 shadow-sm">
          <Button
            variant={editorMode === "edit" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setEditorMode("edit")}
            className={`rounded-xl px-4 font-bold transition-all duration-200 ${editorMode === "edit" ? "shadow-sm scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"}`}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant={editorMode === "live" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setEditorMode("live")}
            className={`rounded-xl px-4 font-bold transition-all duration-200 ${editorMode === "live" ? "shadow-sm scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"}`}
          >
            <Split className="h-4 w-4 mr-2" />
            Split
          </Button>
          <Button
            variant={editorMode === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setEditorMode("preview")}
            className={`rounded-xl px-4 font-bold transition-all duration-200 ${editorMode === "preview" ? "shadow-sm scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"}`}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex-1 md:flex-none rounded-xl font-bold h-10 border-2 hover:bg-muted transition-all duration-200 active:scale-[0.98]"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Letter
          </Button>
          <Button
            disabled={isSaving}
            onClick={handleSave}
            className="flex-1 md:flex-none rounded-xl font-bold h-10 px-6 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="rounded-[32px] border-2 border-muted/30 bg-muted/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
        <div
          data-color-mode={
            mounted ? (theme === "dark" ? "dark" : "light") : "light"
          }
        >
          <MDEditor
            value={content}
            onChange={setContent}
            preview={editorMode}
            height={700}
            className="border-none bg-transparent!"
            previewOptions={{
              className: "prose dark:prose-invert max-w-none p-8 md:p-12",
            }}
          />
        </div>
      </Card>

      <style jsx global>{`
        .w-md-editor-toolbar {
          background-color: transparent !important;
          border-bottom: 2px solid var(--border) !important;
          padding: 8px 16px !important;
        }
        .w-md-editor {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        .w-md-editor-content {
          background-color: transparent !important;
        }
        .w-md-editor-preview {
          background-color: transparent !important;
        }
        .prose h1,
        .prose h2,
        .prose h3 {
          font-weight: 900 !important;
          letter-spacing: -0.05em !important;
        }
      `}</style>
    </div>
  );
};

export default CoverLetterPreview;
