// Helper function to convert entries to markdown
export function entriesToMarkdown(entries, type) {
  if (!entries?.length) return "";

  return (
    `## ${type}\n<hr/>\n` +
    entries
      .map((entry) => {
        const dateRange = entry.current
          ? `${entry.startDate} - Present`
          : `${entry.startDate} - ${entry.endDate}`;
        
        return `<div><strong>${entry.title}</strong> <span style="float: right;">${dateRange}</span></div>\n` +
               `<div><em>${entry.organization}</em></div>\n\n` +
               `${entry.description}`;
      })
      .join("\n\n")
  );
}