import React, { useEffect, useState } from "react";

import {
  Award,
  BarChart,
  Book,
  BookOpen,
  CheckCircle,
  Clock,
  MessageCircle,
  Play,
  PlusCircle,
  TrendingUp,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import withAuth from "@/lib/withAuth";
import WeeklyActivity from "./_comp/WeeklyActivity";

// Dummy course data
const courses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description:
      "Learn the fundamentals of machine learning algorithms and applications.",
    progress: 65,
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500&h=300",
  },
  {
    id: 2,
    title: "Web Development Masterclass",
    description:
      "Master modern web development with HTML, CSS, and JavaScript.",
    progress: 42,
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500&h=300",
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description:
      "Understand the core principles of creating effective user interfaces.",
    progress: 18,
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500&h=300",
  },
  {
    id: 4,
    title: "Advanced Data Structures",
    description: "Deep dive into complex data structures and algorithms.",
    progress: 0,
    category: "Computer Science",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500&h=300",
  },
];

const recommendations = [
  {
    id: 5,
    title: "Python for Data Analysis",
    description: "Learn to analyze and visualize data using Python libraries.",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500&h=300",
  },
  {
    id: 6,
    title: "Mobile App Development",
    description:
      "Create cross-platform mobile applications using React Native.",
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500&h=300",
  },
];

// Activity data for the chart

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: string; message: string }>
  >([
    {
      sender: "ai",
      message:
        "Hello! I'm your AI learning assistant. How can I help you with your courses today?",
    },
  ]);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { sender: "user", message: chatMessage }]);
    setSendingMessage(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your progress in Machine Learning, I'd recommend focusing on the neural networks module next.",
        "Great question! For web development, I suggest practicing with small projects to solidify your JavaScript skills.",
        "Looking at your learning patterns, you seem to excel at visual content. Have you considered the UX/UI design course?",
        "To improve in data structures, try solving the practice problems in the algorithm complexity section.",
        "Your consistent study habits are impressive! Keep up the good work on your current courses.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: randomResponse },
      ]);
      setChatMessage("");
      setSendingMessage(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-8">
              <h1
                className={`text-3xl font-bold text-slate-900 dark:text-white mb-2 opacity-0 ${
                  isLoaded ? "animate-slide-down" : ""
                }`}
                style={{ animationDelay: "100ms" }}
              >
                Welcome back, Alex
              </h1>
              <p
                className={`text-slate-600 dark:text-slate-400 opacity-0 ${
                  isLoaded ? "animate-slide-down" : ""
                }`}
                style={{ animationDelay: "200ms" }}
              >
                Continue your learning journey from where you left off
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Stats cards */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 ${
                    isLoaded ? "animate-slide-up" : ""
                  }`}
                  style={{ animationDelay: "300ms" }}
                >
                  {[
                    {
                      title: "Study Time",
                      value: "16.2 hours",
                      change: "+2.4",
                      icon: <Clock className="h-5 w-5 text-blue-600" />,
                      description: "Last 7 days",
                    },
                    {
                      title: "Courses",
                      value: "4",
                      change: "+1",
                      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
                      description: "Currently enrolled",
                    },
                    {
                      title: "Completion",
                      value: "32%",
                      change: "+5%",
                      icon: <BarChart className="h-5 w-5 text-blue-600" />,
                      description: "Average progress",
                    },
                  ].map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
                            {stat.icon}
                          </div>
                          <span className="text-sm text-green-500 flex items-center">
                            {stat.change}{" "}
                            <TrendingUp className="h-3 w-3 ml-1" />
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {stat.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Continue Learning */}
                <div
                  className={`opacity-0 ${isLoaded ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "400ms" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Continue Learning
                    </h2>
                    <Link to="/courses">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View all courses
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.slice(0, 2).map((course) => (
                      <Card key={course.id} className="overflow-hidden group">
                        <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="absolute bottom-4 left-4">
                              <span className="px-2 py-1 bg-blue-600/90 text-white text-xs rounded-full">
                                {course.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {course.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </CardContent>

                        <CardFooter className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                          <Link to={`/course/${course.id}`} className="w-full">
                            <Button
                              variant="ghost"
                              className="w-full justify-start bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <Play className="h-4 w-4 mr-2" /> Continue
                              Learning
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Course Recommendations & Achievements */}
                <div
                  className={`opacity-0 ${isLoaded ? "animate-slide-up" : ""}`}
                  style={{ animationDelay: "500ms" }}
                >
                  <Tabs defaultValue="recommendations" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="recommendations">
                        Recommended Courses
                      </TabsTrigger>
                      <TabsTrigger value="achievements">
                        Achievements
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="recommendations" className="space-y-4">
                      {recommendations.map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-auto md:h-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-40 md:h-full object-cover"
                              />
                            </div>

                            <div className="p-5 md:w-2/3 flex flex-col">
                              <div className="mb-2">
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                                  {course.category}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                {course.title}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow mb-4">
                                {course.description}
                              </p>

                              <div className="flex items-center justify-between mt-auto">
                                <Link to={`/course/${course.id}`}>
                                  <Button size="sm">
                                    <PlusCircle className="h-4 w-4 mr-2" /> Add
                                    Course
                                  </Button>
                                </Link>
                                <Link
                                  to={`/course/${course.id}`}
                                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                                >
                                  Preview
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}

                      <Link to="/courses" className="block text-center">
                        <Button variant="outline" className="mt-2">
                          Browse All Courses
                        </Button>
                      </Link>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            title: "Fast Learner",
                            description:
                              "Completed 3 course modules in a single day",
                            icon: <Award className="h-8 w-8 text-amber-500" />,
                            unlocked: true,
                          },
                          {
                            title: "Perfect Score",
                            description: "Scored 100% on a course quiz",
                            icon: (
                              <CheckCircle className="h-8 w-8 text-emerald-500" />
                            ),
                            unlocked: true,
                          },
                          {
                            title: "Knowledge Seeker",
                            description: "Enrolled in 5 different courses",
                            icon: <Book className="h-8 w-8 text-blue-500" />,
                            unlocked: false,
                          },
                          {
                            title: "Video Master",
                            description: "Watched 20 hours of course videos",
                            icon: <Video className="h-8 w-8 text-purple-500" />,
                            unlocked: false,
                          },
                        ].map((achievement, index) => (
                          <Card
                            key={index}
                            className={`overflow-hidden ${
                              !achievement.unlocked && "opacity-50"
                            }`}
                          >
                            <CardHeader className="pb-2 flex flex-row items-center space-x-4">
                              <div
                                className={`p-2 rounded-full ${
                                  achievement.unlocked
                                    ? "bg-amber-100"
                                    : "bg-slate-100"
                                }`}
                              >
                                {achievement.icon}
                              </div>
                              <div>
                                <CardTitle className="text-base">
                                  {achievement.title}
                                </CardTitle>
                                <CardDescription>
                                  {achievement.description}
                                </CardDescription>
                              </div>
                            </CardHeader>
                            <CardFooter className="pt-1">
                              <span
                                className={`text-xs font-medium ${
                                  achievement.unlocked
                                    ? "text-green-500"
                                    : "text-slate-500"
                                }`}
                              >
                                {achievement.unlocked ? "Unlocked" : "Locked"}
                              </span>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Right column - AI assistant and activity */}
              <div
                className={`space-y-6 opacity-0 ${
                  isLoaded ? "animate-slide-up" : ""
                }`}
                style={{ animationDelay: "300ms" }}
              >
                {/* AI Learning Assistant */}
                <Card className="overflow-hidden h-[500px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-4">
                    <div className="flex items-center">
                      <div className="mr-3 h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>AI Learning Assistant</CardTitle>
                        <CardDescription className="text-blue-100">
                          Get personalized help and recommendations
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow overflow-y-auto p-4">
                    <div className="space-y-4">
                      {chatHistory.map((chat, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            chat.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              chat.sender === "user"
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none"
                            }`}
                          >
                            {chat.message}
                          </div>
                        </div>
                      ))}
                      {sendingMessage && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                              <div
                                className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <form
                      onSubmit={handleSendMessage}
                      className="w-full flex space-x-2"
                    >
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        disabled={sendingMessage}
                        placeholder="Ask about your courses or get recommendations..."
                        className="flex-grow px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button
                        type="submit"
                        disabled={!chatMessage.trim() || sendingMessage}
                        size="sm"
                      >
                        Send
                      </Button>
                    </form>
                  </CardFooter>
                </Card>

                {/* Weekly activity */}
                <WeeklyActivity />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default withAuth(Dashboard);
