export default function QuizLoading() {
  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="bg-purple py-12 sm:py-16">
        <div className="container mx-auto max-w-3xl space-y-4 px-4">
          <div className="h-6 w-52 rounded-full bg-white/15" />
          <div className="h-10 w-72 rounded-lg bg-white/20" />
          <div className="h-5 w-full max-w-xl rounded bg-white/10" />
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 pt-8">
        <div
          role="status"
          aria-label="Loading quiz"
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="font-mono text-sm text-purple">
            $ npm install meetjs-quiz/questions
          </p>
          <div className="h-24 w-full rounded-xl bg-slate-100" />
          <div className="space-y-3">
            <div className="h-12 w-full rounded-xl bg-slate-100" />
            <div className="h-12 w-full rounded-xl bg-slate-100" />
            <div className="h-12 w-full rounded-xl bg-slate-100" />
            <div className="h-12 w-full rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
