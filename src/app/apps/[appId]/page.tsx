import type { Metadata } from "next";
import Link from "next/link";
import { appsStoreData } from "@/content/site";
import AppDetailsClient from "./AppDetailsClient";
import JsonLd from "@/components/JsonLd";
import { PERSON_ID, abs, breadcrumbs, graph, pageMeta } from "@/lib/seo";

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
  return pageMeta({ title: app.title, description: app.description, path: `/apps/${app.id}`, image: app.icon });
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

  // No ratings in the markup: structured data should only carry verifiable facts.
  const jsonLd = graph(
    {
      "@type": "MobileApplication",
      name: app.title,
      description: app.description,
      url: abs(`/apps/${app.id}`),
      image: abs(app.icon),
      applicationCategory: app.category,
      operatingSystem: "Android",
      softwareVersion: app.version,
      fileSize: app.size,
      ...(app.downloadLink.startsWith("/") ? { downloadUrl: abs(app.downloadLink) } : { sameAs: app.downloadLink }),
      author: { "@id": PERSON_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    breadcrumbs([
      { name: "Apps", path: "/apps" },
      { name: app.title, path: `/apps/${app.id}` },
    ]),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <AppDetailsClient app={app} />
    </>
  );
}
