export const LearningPlayer = ({ courseId, lessonId }: { courseId: string; lessonId: string }) => (
  <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold text-foreground">Lesson {lessonId}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Video player placeholder for course {courseId}. Include slide notes, transcripts, and code labs.
      </p>
      <div className="mt-4 h-64 rounded-2xl bg-background" />
    </div>
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Lesson checklist</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>Watch the walkthrough</li>
        <li>Complete the mini-assignment</li>
        <li>Submit questions in community</li>
      </ul>
    </div>
  </div>
);
