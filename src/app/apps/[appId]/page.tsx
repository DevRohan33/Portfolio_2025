import type { Metadata } from "next";
import Link from "next/link";
import { appsStoreData } from "@/content/site";
import AppDetailsClient from "./AppDetailsClient";

export function generateStaticParams() {
  return appsStoreData.map((app) => ({ appId: app.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ appId: string }>;
}): Promise<Metadata> {
  const { appId } = await params;
  const app = appsStoreData.find((a) => a.id === appId);
  if (!app) return {};
  return { title: app.title, description: app.description };
}

export default async function AppDetailsPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  const app = appsStoreData.find((a) => a.id === appId);

  if (!app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">App Not Found</h2>
          <Link href="/apps" className="text-blue-600 hover:underline">
            Return to App Store
          </Link>
        </div>
      </div>
    );
  }

  return <AppDetailsClient app={app} />;
}
