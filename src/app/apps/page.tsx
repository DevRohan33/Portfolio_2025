import type { Metadata } from "next";
import Link from "next/link";
import { appsStoreData } from "@/content/site";

export const metadata: Metadata = {
  title: "App Store",
  description: "Small apps and tools I've shipped.",
};

export default function AppStorePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 font-sans text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">App Store</h1>
            <p className="text-gray-500 mt-2">Discover my crafted applications and tools.</p>
          </div>
        </div>

        {appsStoreData.length > 0 && (
          <Link href={`/apps/${appsStoreData[0].id}`} className="block mb-12 group cursor-pointer">
            <div className="relative rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 h-[300px] md:h-[400px]">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-6">
                  <img
                    src={appsStoreData[0].icon}
                    alt={appsStoreData[0].title}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-lg border-2 border-white/20 object-cover bg-white"
                  />
                  <div className="text-white">
                    <h2 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-1">
                      Featured App
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {appsStoreData[0].title}
                    </h3>
                    <p className="text-gray-200 line-clamp-1">{appsStoreData[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        <section>
          <h2 className="text-2xl font-bold mb-6">All apps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {appsStoreData.map((app) => (
              <Link key={app.id} href={`/apps/${app.id}`} className="group block">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={app.icon}
                        alt={app.title}
                        className="w-16 h-16 rounded-xl shadow-sm object-cover bg-gray-50 border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate group-hover:text-blue-600 transition-colors">
                          {app.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">{app.category}</p>
                        <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
                          <span>★ {app.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
