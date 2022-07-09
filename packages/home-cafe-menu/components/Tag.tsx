export function Tag({ title }: { title: string }) {
  return <section className="border border-slate-500 bg-slate-200 rounded text-xs text-slate-600 font-light px-1 mr-1">
    {title}
  </section>
}