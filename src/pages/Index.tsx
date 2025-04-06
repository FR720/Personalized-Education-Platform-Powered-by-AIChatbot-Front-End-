import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import withAuth from "@/lib/withAuth";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
          {/* Hero Section */}
          <section className="pt-32 pb-24 px-4 sm:px-6 relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl"></div>
              <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-300/20 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-5xl mx-auto relative">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`opacity-0 ${
                    isLoaded ? "animate-slide-down" : ""
                  }`}
                  style={{ animationDelay: "100ms" }}
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Next-gen Learning Platform
                  </div>
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 opacity-0 ${
                    isLoaded ? "animate-slide-down" : ""
                  }`}
                  style={{ animationDelay: "200ms", lineHeight: "1.1" }}
                >
                  Elevate Your Learning Experience
                </h1>
                <p
                  className={`text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-8 opacity-0 ${
                    isLoaded ? "animate-slide-down" : ""
                  }`}
                  style={{ animationDelay: "300ms" }}
                >
                  Discover a seamless course navigation system designed with
                  elegance and simplicity. Access courses, track progress, and
                  receive personalized guidance.
                </p>

                <div
                  className={`flex flex-wrap justify-center gap-4 mb-12 opacity-0 ${
                    isLoaded ? "animate-slide-down" : ""
                  }`}
                  style={{ animationDelay: "400ms" }}
                >
                  <Link to="/signup">
                    <Button size="lg" className="shadow-md">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/signin">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </div>

                <div
                  className={`relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-glossy opacity-0 ${
                    isLoaded ? "animate-slide-up" : ""
                  }`}
                  style={{ animationDelay: "600ms" }}
                >
                  <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
                      {/* Dashboard preview mockup */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4/5 h-4/5 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 overflow-hidden">
                          <div className="h-1/5 border-b border-slate-200 dark:border-slate-700 flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
                            <div>
                              <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                              <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800 rounded mt-1"></div>
                            </div>
                            <div className="ml-auto flex space-x-2">
                              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                            </div>
                          </div>
                          <div className="flex h-4/5">
                            <div className="w-1/4 p-2 border-r border-slate-200 dark:border-slate-700">
                              <div className="h-full flex flex-col space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                  <div
                                    key={i}
                                    className="h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center p-2"
                                  >
                                    <div className="w-5 h-5 rounded-full bg-blue-500 mr-2"></div>
                                    <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="w-3/4 p-4">
                              <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                              <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                  <div
                                    key={i}
                                    className="aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 p-3 flex flex-col justify-between"
                                  >
                                    <div className="w-full h-3/5 rounded bg-slate-200 dark:bg-slate-700"></div>
                                    <div>
                                      <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                      <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded mt-1"></div>
                                      <div className="flex items-center mt-2">
                                        <div className="h-2 w-12 bg-blue-500 rounded"></div>
                                        <div className="ml-auto h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features section */}
          <section className="py-24 px-4 sm:px-6 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Experience the Future of Learning
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Our platform combines elegant design with powerful features to
                  create a seamless learning journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
                    title: "Interactive Courses",
                    description:
                      "Browse and enroll in a variety of courses with rich multimedia content and interactive elements.",
                  },
                  {
                    icon: <Video className="h-8 w-8 text-blue-600" />,
                    title: "Video Lectures & Quizzes",
                    description:
                      "Access high-quality video lectures and test your knowledge with comprehensive quizzes.",
                  },
                  {
                    icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
                    title: "AI Learning Assistant",
                    description:
                      "Get personalized recommendations and answers to your questions from our intelligent AI assistant.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-soft hover:shadow-glossy transition-all duration-300 border border-slate-100 dark:border-slate-800"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial/CTA section */}
          <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-glossy overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                      Ready to Transform Your Learning?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-8">
                      Join thousands of learners who have enhanced their skills
                      and knowledge through our platform.
                    </p>

                    <ul className="space-y-4 mb-8">
                      {[
                        "Access to premium courses",
                        "Track your progress across subjects",
                        "Personalized learning recommendations",
                        "Connect with experts and other learners",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <Link to="/signup">
                        <Button
                          size="lg"
                          className="w-full sm:w-auto shadow-md"
                        >
                          Create Your Account{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="hidden md:block bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-8 max-w-md text-white">
                        <div className="mb-6">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21.3 8.7l-8.8-6.4a1 1 0 0 0-1 0L2.7 8.7a1 1 0 0 0-.3 1.4l.3.3c.4.4 1 .5 1.4.1L12 4l7.9 5.7c.4.3 1 .3 1.4-.1l.3-.3a1 1 0 0 0-.3-1.3z"></path>
                            <path d="M5 10v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"></path>
                            <path d="M9 15v-2"></path>
                            <path d="M15 15v-2"></path>
                          </svg>
                        </div>

                        <blockquote className="text-xl font-medium italic mb-4">
                          "This platform transformed how I approach online
                          learning. The interface is intuitive and the AI
                          recommendations are spot-on."
                        </blockquote>

                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-white/20 mr-3"></div>
                          <div>
                            <div className="font-medium">Alex Johnson</div>
                            <div className="text-sm opacity-70">
                              Software Developer
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <div className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center">
                    <div className="mr-2 relative">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 relative flex items-center justify-center">
                        <div className="h-3 w-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    CourseNav
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Elevating your learning experience
                  </p>
                </div>

                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Privacy
                  </a>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Help
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
                © {new Date().getFullYear()} CourseNav. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </>
  );
};

export default withAuth(Index);
