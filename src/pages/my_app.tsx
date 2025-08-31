import { useEffect, useRef, useState } from "react";

const MySaasApp = () => {
  const currentDate = new Date();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const currentMonthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const sectionRef = useRef<HTMLElement>(null);
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
    <section
      id="my-saas-app"
      ref={sectionRef}
      className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        {/* App Header Section - Play Store Style */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 animate-on-scroll">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* App Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                <img
                  src="/app/app_logo.png"
                  alt="Prompt Generator Logo"
                  className="object-contain w-16 h-16 md:w-20 md:h-20 rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = '<div class="text-white text-2xl font-bold">PG</div>';
                  }}
                />
              </div>
            </div>

            {/* App Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Prompt Converter
              </h1>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500">Productivity</span>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">4.8</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                Transform your ideas into structured AI prompts in seconds. An intuitive AI-powered app that converts your natural language into optimized prompts for better AI responses. Perfect for content creators, developers, and AI enthusiasts.
              </p>

              {/* App Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>10+ Downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>Safe & Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                  </svg>
                  <span>Updated {currentMonthYear}</span>

                </div>
              </div>

              {/* Download Button */}
              <a
                href="/downloads/app-release.apk"
                download
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                </svg>
                Download APK
              </a>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 animate-on-scroll">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-amber-800 font-semibold text-sm mb-1">
                Security Notice
              </h3>
              <p className="text-amber-700 text-sm">
                This APK is <strong>safe to install</strong> and has been verified.
                Some devices may show a security alert when installing apps from
                sources outside the Google Play Store—this is normal. Your data and
                device remain secure.
              </p>
            </div>
          </div>
        </div>
                          

        {/* Screenshots Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-on-scroll">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="group cursor-pointer">
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-br from-gray-100 to-gray-200 aspect-[9/16] transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setFullScreenImg(`/app/img${index}.jpg`)}
                  >
                    <img
                      src={`/app/img${index}.jpg`}
                      alt={`Screenshot ${index}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const placeholder = document.createElement("div");
                        placeholder.className =
                          "w-full h-full flex items-center justify-center text-gray-400";
                        placeholder.innerHTML = `
                          <div class="text-center">
                            <svg class="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                            <p class="text-xs">Screenshot ${index}</p>
                          </div>
                        `;
                        e.currentTarget.parentElement.appendChild(placeholder);
                      }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center animate-on-scroll">
            <p className="text-gray-500 text-sm">
              Compatible with Android 5.0+ • Version 1.1.0 • Size: 3.9 MB
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {fullScreenImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setFullScreenImg(null)}
        >
          <img
            src={fullScreenImg}
            alt="Full Screen"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}

      <style>{`
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
     </>
  );
};

export default MySaasApp;