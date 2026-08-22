import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-5">
      <p className="label-eyebrow mb-4">404</p>
      <h1 className="text-h2 font-semibold tracking-tight">Nothing here.</h1>
      <Link href="/" className="pill-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
