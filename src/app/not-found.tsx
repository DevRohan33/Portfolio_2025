import Link from "next/link";
import HandNote from "@/components/HandNote";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-5">
      <p className="label-eyebrow mb-4">404</p>
      <h1 className="font-serif text-[48px] md:text-[64px] font-medium tracking-[-0.03em]">
        Nothing <em className="italic text-accent">here.</em>
      </h1>
      <HandNote className="mt-4 origin-center">this page took a wrong turn somewhere…</HandNote>
      <Link href="/" className="pill-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
