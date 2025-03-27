
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Clock, PlusCircle, Play, LayoutList, Filter, Star, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";

// Dummy course data
const allCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and applications.",
    progress: 65,
    duration: "8 hours",
    category: "Data Science",
    level: "Intermediate",
    enrolled: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 2,
    title: "Web Development Masterclass",
    description: "Master modern web development with HTML, CSS, and JavaScript.",
    progress: 42,
    duration: "12 hours",
    category: "Programming",
    level: "Beginner",
    enrolled: true,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Understand the core principles of creating effective user interfaces.",
    progress: 18,
    duration: "6 hours",
    category: "Design",
    level: "Beginner",
    enrolled: true,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 4,
    title: "Advanced Data Structures",
    description: "Deep dive into complex data structures and algorithms.",
    progress: 0,
    duration: "10 hours",
    category: "Computer Science",
    level: "Advanced",
    enrolled: true,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 5,
    title: "Python for Data Analysis",
    description: "Learn to analyze and visualize data using Python libraries.",
    duration: "8 hours",
    category: "Data Science",
    level: "Intermediate",
    enrolled: false,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 6,
    title: "Mobile App Development",
    description: "Create cross-platform mobile applications using React Native.",
    duration: "14 hours",
    category: "Programming",
    level: "Intermediate",
    enrolled: false,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 7,
    title: "Cloud Computing Essentials",
    description: "Master the fundamentals of cloud services and architectures.",
    duration: "9 hours",
    category: "IT & Cloud",
    level: "Beginner",
    enrolled: false,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    id: 8,
    title: "Digital Marketing Strategies",
    description: "Learn effective digital marketing techniques for modern businesses.",
    duration: "7 hours",
    category: "Marketing",
    level: "Beginner",
    enrolled: false,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500&h=300"
  },
];

const categories = ["All Categories", "Data Science", "Programming", "Design", "Computer Science", "IT & Cloud", "Marketing"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleEnroll = (courseId: number, courseTitle: string) => {
    console.log(`Enrolling in course: ${courseId}`);
    toast({
      title: "Enrolled Successfully",
      description: `You've been enrolled in "${courseTitle}"`,
    });
  };
  
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const enrolledCourses = filteredCourses.filter(course => course.enrolled);
  const availableCourses = filteredCourses.filter(course => !course.enrolled);
  
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 
                className={`text-3xl font-bold text-slate-900 dark:text-white mb-2 opacity-0 ${isLoaded ? "animate-slide-down" : ""}`}
                style={{ animationDelay: "100ms" }}
              >
                Courses
              </h1>
              <p 
                className={`text-slate-600 dark:text-slate-400 opacity-0 ${isLoaded ? "animate-slide-down" : ""}`}
                style={{ animationDelay: "200ms" }}
              >
                Browse our collection of high-quality courses to enhance your skills
              </p>
            </div>
            
            {/* Search and filters */}
            <div 
              className={`mb-8 opacity-0 ${isLoaded ? "animate-slide-up" : ""}`}
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 lg:col-span-5">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search for courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 lg:col-span-2">
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full h-10 pl-3 pr-10 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 lg:col-span-2">
                    <div className="relative">
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full h-10 pl-3 pr-10 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <Button className="w-full justify-between shadow-sm" variant="outline">
                      <Filter className="h-4 w-4 mr-2" /> More Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course listings */}
            <div 
              className={`opacity-0 ${isLoaded ? "animate-slide-up" : ""}`}
              style={{ animationDelay: "400ms" }}
            >
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                  <TabsTrigger value="available">Available Courses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No courses found</h3>
                      <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.map(course => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          onEnroll={handleEnroll} 
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="enrolled" className="space-y-6">
                  {enrolledCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No enrolled courses</h3>
                      <p className="text-slate-600 dark:text-slate-400">Browse available courses and enroll to start learning</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enrolledCourses.map(course => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          onEnroll={handleEnroll} 
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="available" className="space-y-6">
                  {availableCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No available courses</h3>
                      <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availableCourses.map(course => (
                        <CourseCard 
                          key={course.id} 
                          course={course} 
                          onEnroll={handleEnroll} 
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

// Course Card Component
interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    progress?: number;
    duration: string;
    category: string;
    level: string;
    enrolled: boolean;
    rating: number;
    image: string;
  };
  onEnroll: (courseId: number, courseTitle: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-glossy border border-slate-200 dark:border-slate-800">
      <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-white/90 text-slate-900 dark:bg-slate-800/90 dark:text-slate-200">
              {course.category}
            </Badge>
            <Badge variant="outline" className="bg-white/80 text-slate-900 border-none dark:bg-slate-800/80 dark:text-slate-200">
              <Clock className="h-3 w-3 mr-1" /> {course.duration}
            </Badge>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2 flex-grow">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className={`
            ${course.level === "Beginner" ? "border-green-500 text-green-500" : 
              course.level === "Intermediate" ? "border-blue-500 text-blue-500" : 
              "border-purple-500 text-purple-500"}
          `}>
            {course.level}
          </Badge>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{course.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
      </CardHeader>
      
      {course.enrolled && course.progress !== undefined && (
        <CardContent className="pb-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-1.5" />
        </CardContent>
      )}
      
      <CardFooter className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 mt-auto">
        {course.enrolled ? (
          <Link to={`/course/${course.id}`} className="w-full">
            <Button 
              variant="ghost" 
              className="w-full justify-start bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {course.progress !== undefined && course.progress > 0 ? (
                <>
                  <Play className="h-4 w-4 mr-2" /> Continue Learning
                </>
              ) : (
                <>
                  <LayoutList className="h-4 w-4 mr-2" /> Start Course
                </>
              )}
            </Button>
          </Link>
        ) : (
          <Button 
            className="w-full shadow-sm"
            onClick={() => onEnroll(course.id, course.title)}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Courses;
