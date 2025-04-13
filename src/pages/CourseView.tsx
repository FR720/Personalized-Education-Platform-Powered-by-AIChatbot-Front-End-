import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  BookOpen,
  Check,
  Clock,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Video,
  FileText,
  Settings,
  CheckCircle,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import withAuth from "@/lib/withAuth";
import { useApiQuery } from "@/hooks/useQuery";
import ChatAI from "@/components/ChatAI";

// Dummy course data
const courseData = {
  id: 1,
  title: "Introduction to Machine Learning",
  description:
    "Learn the fundamentals of machine learning algorithms and applications in this comprehensive course.",
  progress: 65,
  instructor: "Dr. Sarah Johnson",
  category: "Data Science",
  level: "Intermediate",
  duration: "8 hours",
  rating: 4.8,
  enrollmentDate: "October 5, 2023",
  image:
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1200&h=400",
  sections: [
    {
      id: 1,
      title: "Introduction to ML Concepts",
      completed: true,
      duration: "45 min",
      modules: [
        {
          id: 1,
          type: "video",
          title: "What is Machine Learning?",
          duration: "15 min",
          completed: true,
        },
        {
          id: 2,
          type: "video",
          title: "History and Evolution of AI",
          duration: "12 min",
          completed: true,
        },
        {
          id: 3,
          type: "quiz",
          title: "Basic Concepts Quiz",
          questions: 5,
          completed: true,
          score: 90,
        },
      ],
    },
    {
      id: 2,
      title: "Supervised Learning",
      completed: true,
      duration: "1h 20min",
      modules: [
        {
          id: 4,
          type: "video",
          title: "Classification Algorithms",
          duration: "18 min",
          completed: true,
        },
        {
          id: 5,
          type: "video",
          title: "Regression Models",
          duration: "22 min",
          completed: true,
        },
        {
          id: 6,
          type: "reading",
          title: "Supervised Learning Use Cases",
          pages: 8,
          completed: true,
        },
        {
          id: 7,
          type: "quiz",
          title: "Supervised Learning Quiz",
          questions: 8,
          completed: true,
          score: 85,
        },
      ],
    },
    {
      id: 3,
      title: "Unsupervised Learning",
      completed: false,
      duration: "1h 15min",
      modules: [
        {
          id: 8,
          type: "video",
          title: "Clustering Algorithms",
          duration: "20 min",
          completed: true,
        },
        {
          id: 9,
          type: "video",
          title: "Dimensionality Reduction",
          duration: "15 min",
          completed: true,
        },
        {
          id: 10,
          type: "reading",
          title: "Unsupervised Learning Applications",
          pages: 6,
          completed: false,
        },
        {
          id: 11,
          type: "quiz",
          title: "Unsupervised Learning Assessment",
          questions: 7,
          completed: false,
        },
      ],
    },
    {
      id: 4,
      title: "Neural Networks & Deep Learning",
      completed: false,
      duration: "2h 10min",
      modules: [
        {
          id: 12,
          type: "video",
          title: "Introduction to Neural Networks",
          duration: "25 min",
          completed: false,
        },
        {
          id: 13,
          type: "video",
          title: "Deep Learning Frameworks",
          duration: "28 min",
          completed: false,
        },
        {
          id: 14,
          type: "reading",
          title: "Neural Network Architectures",
          pages: 12,
          completed: false,
        },
        {
          id: 15,
          type: "quiz",
          title: "Neural Networks Comprehension",
          questions: 10,
          completed: false,
        },
      ],
    },
    {
      id: 5,
      title: "ML in Practice & Ethics",
      completed: false,
      duration: "1h 30min",
      modules: [
        {
          id: 16,
          type: "video",
          title: "Implementing ML Solutions",
          duration: "22 min",
          completed: false,
        },
        {
          id: 17,
          type: "video",
          title: "Ethical Considerations in AI",
          duration: "18 min",
          completed: false,
        },
        {
          id: 18,
          type: "reading",
          title: "Case Studies in ML Applications",
          pages: 10,
          completed: false,
        },
        {
          id: 19,
          type: "quiz",
          title: "Final Assessment",
          questions: 15,
          completed: false,
        },
      ],
    },
  ],
};

// Calculate completed modules

const CourseView = () => {
  const { courseId } = useParams();
  console.log("🚀 ~ CourseView ~ courseId:", courseId);

  const {
    data,
    isLoading: isLoaded,
    error,
  } = useApiQuery({
    url: `/courses/${courseId}`,
  });
  const totalModules = (
    data?.course?.sections?.length
      ? data?.course?.sections
      : courseData.sections
  ).reduce((acc, section) => acc + section.modules.length, 0);
  const completedModules = (
    data?.course?.sections?.length
      ? data?.course?.sections
      : courseData.sections
  ).reduce((acc, section) => {
    const completedInSection = section.modules.filter(
      (module) => module.completed
    ).length;
    return acc + completedInSection;
  }, 0);
  console.log("🚀 ~ CourseView ~ data:", data);

  const [activeModule, setActiveModule] = useState(
    (data?.course?.sections?.length
      ? data?.course?.sections
      : courseData.sections)[2].modules[0]
  );
  const [videoPlaying, setVideoPlaying] = useState(false);

  const [sendingMessage, setSendingMessage] = useState(false);
  const { toast } = useToast();

  const videoRef = useRef<HTMLDivElement>(null);

  const handleModuleSelect = (module: any) => {
    setActiveModule(module);
    if (module.type === "video") {
      setVideoPlaying(false);
    }

    // Scroll to video player on mobile
    if (window.innerWidth < 768 && videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleVideo = () => {
    setVideoPlaying(!videoPlaying);
    toast({
      title: videoPlaying ? "Video Paused" : "Video Playing",
      description: activeModule.title,
    });
  };

  const markComplete = () => {
    toast({
      title: "Progress Updated",
      description: `${activeModule.title} marked as complete`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 pb-12">
      {/* Course header */}
      <div className="relative aspect-[3/1] min-h-[220px] bg-slate-800 overflow-hidden">
        <img
          src={courseData.image}
          alt={courseData.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-8">
            <Link
              to="/courses"
              className="inline-flex items-center text-sm text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to courses
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {courseData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
              <Badge
                variant="secondary"
                className="bg-white/20 hover:bg-white/25 text-white border-none"
              >
                {courseData.category}
              </Badge>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" /> {courseData.duration}
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" /> {courseData.level}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" /> {completedModules}/
                {totalModules} completed
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - video and tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video player */}
            <div
              ref={videoRef}
              className={`bg-slate-900 rounded-xl overflow-hidden aspect-video relative group ${
                !isLoaded ? "animate-fade-in" : ""
              }`}
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {activeModule.type === "video" ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        className="w-full h-full object-cover"
                        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200&h=675"
                      />
                    </div>

                    <button
                      onClick={toggleVideo}
                      className="absolute z-10 p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg transform group-hover:scale-105"
                    >
                      {videoPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </button>

                    <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between text-white">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">
                          {activeModule.title}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white bg-white/10 hover:bg-white/20"
                        onClick={markComplete}
                      >
                        <Check className="h-4 w-4 mr-2" /> Mark Complete
                      </Button>
                    </div>
                  </>
                ) : activeModule.type === "quiz" ? (
                  <div className="text-center p-8">
                    <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {activeModule.title}
                    </h3>
                    <p className="text-white/70 mb-6">
                      This quiz contains {activeModule.questions} questions
                    </p>
                    <Button>Start Quiz</Button>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {activeModule.title}
                    </h3>
                    <p className="text-white/70 mb-6">
                      Reading material - {activeModule.pages} pages
                    </p>
                    <Button>Open Reading Material</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs for content, discussion, etc. */}
            <div className={` `}>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Course Content</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="notes">My Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden">
                    {courseData.sections.map((section, idx) => (
                      <div
                        key={section.id}
                        className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                      >
                        <div
                          className={`p-4 flex items-center justify-between transition-colors ${
                            section.completed
                              ? "bg-blue-50/50 dark:bg-blue-900/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                section.completed
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              {section.completed ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <span className="text-xs font-medium">
                                  {idx + 1}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-900 dark:text-white">
                                {section.title}
                              </h3>
                              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-0.5">
                                <Clock className="h-3.5 w-3.5 mr-1" />{" "}
                                {section.duration}
                                <span className="mx-2">•</span>
                                <span>{section.modules.length} modules</span>
                              </div>
                            </div>
                          </div>

                          <Badge
                            variant={
                              section.completed ? "secondary" : "outline"
                            }
                          >
                            {section.completed ? "Completed" : "In Progress"}
                          </Badge>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                          {section.modules.map((module) => (
                            <button
                              key={module.id}
                              onClick={() => handleModuleSelect(module)}
                              className={`w-full text-left p-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 flex items-start group transition-colors hover:bg-slate-100/60 dark:hover:bg-slate-800/50 ${
                                activeModule.id === module.id
                                  ? "bg-blue-50 dark:bg-blue-900/10"
                                  : ""
                              }`}
                            >
                              <div
                                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                                  module.completed
                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                }`}
                              >
                                {module.completed ? (
                                  <Check className="h-3 w-3" />
                                ) : module.type === "video" ? (
                                  <Video className="h-3 w-3" />
                                ) : module.type === "quiz" ? (
                                  <FileText className="h-3 w-3" />
                                ) : (
                                  <BookOpen className="h-3 w-3" />
                                )}
                              </div>

                              <div>
                                <div className="font-medium text-sm text-slate-900 dark:text-white">
                                  {module.title}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                                  {module.type === "video" ? (
                                    <>
                                      <Video className="h-3 w-3 mr-1" />{" "}
                                      {module.duration} video
                                    </>
                                  ) : module.type === "quiz" ? (
                                    <>
                                      <FileText className="h-3 w-3 mr-1" />{" "}
                                      {module.questions} question quiz
                                      {module.completed && (
                                        <span className="ml-2 text-green-500">
                                          Score: {module.score}%
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <BookOpen className="h-3 w-3 mr-1" />{" "}
                                      {module.pages} pages reading
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                          <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="font-medium text-slate-900 dark:text-white mb-1">
                              Instructor
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                              Welcome to the course discussion! Feel free to ask
                              questions about any of the course material here.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                          <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="font-medium text-slate-900 dark:text-white mb-1">
                              Alex
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                              Could someone explain the difference between
                              supervised and unsupervised learning again?
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                          <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="font-medium text-slate-900 dark:text-white mb-1">
                              Jordan
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                              Supervised learning uses labeled data where the
                              algorithm learns the mapping between inputs and
                              outputs. Unsupervised learning works with
                              unlabeled data and tries to find patterns or
                              structure in the data on its own.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <textarea
                            placeholder="Add your comment..."
                            className="w-full h-24 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          ></textarea>
                          <div className="flex justify-end mt-2">
                            <Button>Post Comment</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 mb-4">
                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-500 mb-1">
                          Supervised Learning Notes
                        </h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Classification vs. Regression: Classification predicts
                          categories, regression predicts continuous values.
                          Common algorithms: Decision Trees, SVM, Linear
                          Regression.
                        </p>
                      </div>

                      <textarea
                        placeholder="Add a new note for this module..."
                        className="w-full h-32 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button>Save Note</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar - course info and AI assistant */}
          <div className="space-y-6">
            {/* Course info */}
            <Card className={``} style={{ animationDelay: "400ms" }}>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Course Overview
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Progress
                    </h3>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {courseData.progress}%
                    </span>
                  </div>
                  <Progress value={courseData.progress} className="h-2" />

                  <div className="pt-2">
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Instructor
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {courseData.instructor}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Modules
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {totalModules}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Completed
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {completedModules}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">
                        Enrolled
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {courseData.enrollmentDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" className="w-full" size="sm">
                    <Settings className="h-4 w-4 mr-2" /> Course Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Learning Assistant */}
            <ChatAI courseId={courseId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CourseView);
