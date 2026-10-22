import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">404 · Page not found</p>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">This page is unavailable</h1>
        <p className="mt-4 text-slate-600">The address may have changed or the page may no longer exist.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-xl bg-primary px-5 py-3 font-bold text-white hover:bg-primary-dark">Open calculator</Link>
          <Link href="/guides" className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50">Browse guides</Link>
          <Link href="/contact" className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50">Contact</Link>
        </div>
      </div>
    </main>
  );
}
