import React from "react";
import { useTheme } from "../context/ThemeContext";
import Paper from "@mui/material/Paper";
import Header from "../components/Header";

function Home() {
  const { darkMode } = useTheme();

  return (
    <>
      <Header />
      <Paper
        sx={{
          minHeight: "100vh",
          borderRadius: 0,
          bgcolor: darkMode ? "bg-[#121212]" : "bg-[#f5f5f5]",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <section
          className={`${
            darkMode ? "bg-[#121212]" : "bg-[#f5f5f5]"
          } py-10 sm:py-40 lg:py-36`}
        >
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
              {/* TEXT SECTION */}
              <div className="order-2 lg:order-1">
                <p
                  className={`text-base font-semibold tracking-wider ${
                    darkMode ? "text-blue-400" : "text-blue-900"
                  } uppercase`}
                >
                  Bring home a best friend.
                </p>
                <h1
                  className={`mt-4 text-4xl font-bold ${
                    darkMode ? "text-red-400" : "text-red-800"
                  } lg:mt-8 sm:text-6xl xl:text-7xl`}
                >
                  Rescue. Love. Repeat.
                </h1>
                <p
                  className={`mt-4 text-base ${
                    darkMode ? "text-red-300" : "text-red-800"
                  } lg:mt-6 sm:text-xl`}
                >
                  Take your happiness via us.
                </p>

                {/* MOBILE BUTTON */}
                <div className="mt-6 lg:hidden">
                  <a
                    href="/login"
                    className={`inline-flex items-center px-6 py-4 font-semibold ${
                      darkMode
                        ? "text-black bg-yellow-400 hover:bg-yellow-500"
                        : "text-black bg-yellow-300 hover:bg-yellow-400"
                    } transition-all duration-200 rounded-full focus:bg-yellow-400`}
                  >
                    Explore now
                    <svg
                      className="w-6 h-6 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                  <p
                    className={`mt-4 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Terms and conditions apply
                    <button
                      onClick={() => alert("Learn more clicked")}
                      className={`ml-2 ${
                        darkMode ? "text-amber-400" : "text-amber-500"
                      } hover:underline`}
                    >
                      Learn more
                    </button>
                  </p>
                </div>
              </div>

              {/* IMAGE SECTION */}
              <div className="order-1 lg:order-2 flex justify-center">
                <img
                  className="max-w-full sm:max-w-lg md:max-w-xl object-contain max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] rounded-lg shadow-md"
                  src="/home.jpg" // Place your image in the public folder as public/home.jpg
                  alt="Happy pet with owner"
                />
              </div>

              {/* DESKTOP BUTTON */}
              <div className="hidden lg:flex order-3">
                <a
                  href="/login"
                  className={`inline-flex items-center px-6 py-4 font-semibold ${
                    darkMode
                      ? "text-black bg-yellow-400 hover:bg-yellow-500"
                      : "text-black bg-yellow-300 hover:bg-yellow-400"
                  } transition-all duration-200 rounded-full focus:bg-yellow-400`}
                >
                  Explore now
                  <svg
                    className="w-6 h-5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Paper>
    </>
  );
}

export default Home;
