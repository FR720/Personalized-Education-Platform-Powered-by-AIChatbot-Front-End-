import { Play } from "lucide-react";
import { Link } from "react-router-dom";

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

const ContinueLearning = ({ coursesList }) => {
  console.log("🚀 ~ ContinueLearning ~ coursesList:", coursesList);
  return (
    <>
      {coursesList.length > 0 && (
        <div className={` `} style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Continue Learning
            </h2>
            <Link to="/courses">
              <Button
                variant="ghost"
                size="sm"
                className="text-md text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                View all courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesList.slice(0, 2).map((course) => (
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
                      <Play className="h-4 w-4 mr-2" /> Continue Learning
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContinueLearning;
