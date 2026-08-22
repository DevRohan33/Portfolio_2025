"use client";

import { useState } from "react";
import Link from "next/link";
import type { appsStoreData } from "@/content/site";

type App = (typeof appsStoreData)[number];

export default function AppDetailsClient({ app }: { app: App }) {
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  return (
    <>
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen font-sans text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <Link className="inline-flex items-center gap-1" href="/apps">
              ← Back to Apps
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 md:w-40 md:h-40 bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl flex items-center justify-center shadow-md p-1 border border-gray-100">
                  <img
                    src={app.icon}
                    alt={`${app.title} Logo`}
                    className="object-cover w-full h-full rounded-[1.3rem]"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{app.title}</h1>
                <div className="text-blue-600 font-medium mb-3">{app.developer}</div>

                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-sm font-medium text-gray-600">{app.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-800">★ {app.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({app.reviews})</span>
                  </div>
                </div>

                <a
                  href={app.downloadLink}
                  download={app.downloadLink.includes(".apk") ? true : undefined}
                  target={app.downloadLink.includes("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex w-full md:w-auto items-center justify-center px-10 py-3.5 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 active:scale-95 mb-6"
                >
                  {app.downloadLink.includes(".apk") ? "Install" : "Open App"}
                </a>

                <div className="flex flex-wrap gap-8 py-4 border-t border-gray-100 text-center md:text-left">
                  <div>
                    <div className="text-xl font-bold">{app.reviews}</div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                      Reviews
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gray-200" />
                  <div>
                    <div className="text-xl font-bold">{app.downloads}</div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                      Downloads
                    </div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gray-200" />
                  <div>
                    <div className="text-xl font-bold">{app.size}</div>
                    <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                      Size
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {app.screenshots && app.screenshots.length > 0 && (
            <div className="mb-8">
              <div className="flex overflow-x-auto pb-6 pt-2 gap-4 snap-x [scrollbar-width:none]">
                {app.screenshots.map((imgSrc, index) => (
                  <div key={index} className="snap-center flex-shrink-0 cursor-pointer group">
                    <div
                      className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-gray-100 h-72 md:h-96 w-auto aspect-[9/16] transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
                      onClick={() => setFullScreenImg(imgSrc)}
                    >
                      <img
                        src={imgSrc}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold mb-4">About this app</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{app.description}</p>
              </div>

              {app.features && app.features.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-xl font-bold mb-6">Key Features</h2>
                  <ul className="space-y-4">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {app.safetyNotice && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                  <h3 className="text-emerald-800 font-bold text-sm mb-1">Safety verified</h3>
                  <p className="text-emerald-700 text-sm leading-snug">{app.safetyNotice}</p>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold mb-4 tracking-tight">App Info</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-0.5">Version</div>
                    <div className="font-medium">{app.version}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-0.5">Updated on</div>
                    <div className="font-medium">{app.lastUpdated}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-0.5">Requires</div>
                    <div className="font-medium">{app.compatibility}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fullScreenImg && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer p-4"
          onClick={() => setFullScreenImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImg(null);
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={fullScreenImg}
            alt="Full screen screenshot"
            className="max-w-full max-h-full rounded-md shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
