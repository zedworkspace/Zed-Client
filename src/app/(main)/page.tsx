"use client";
import React from "react";
import { GitBranch, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeHeader from "@/components/home/homeheader"; 
import { useNewProjectStore } from "@/store/projectStore";

export default function Page() {
  const { onOpen, isOpen } = useNewProjectStore();

  const data = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce website with payment integration and user authentication.",
      projectLogo:
        "https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg",
      projectMembers: ["60d5ec49f1b2c72d88f8e8b7", "60d5ec49f1b2c72d88f8e8b8"],
      projectOwner: "60d5ec49f1b2c72d88f8e8b7",
      projectRepo: [
        "https://github.com/user/ecommerce-frontend",
        "https://github.com/user/ecommerce-backend",
      ],
    },
    {
      title: "Task Management App",
      description:
        "A web-based application for managing tasks, deadlines, and collaborations.",
      projectLogo:
        "https://cdn.dribbble.com/userupload/17175617/file/original-d4550896a72e6f3aae597e493a67d170.jpg?resize=752x&vertical=center",
      projectMembers: ["60d5ec49f1b2c72d88f8e8b9", "60d5ec49f1b2c72d88f8e8c0"],
      projectOwner: "60d5ec49f1b2c72d88f8e8b9",
      projectRepo: ["https://github.com/user/taskmanager"],
    },
    {
      title: "Online Learning Platform",
      description:
        "A platform for online courses, including video lectures, quizzes, and certifications.",
      projectLogo:
        "https://img.freepik.com/premium-vector/online-school-logo-learning-logo-design-vector_7888-850.jpg?semt=ais_hybridhttps://example.com/elearning-logo.png",
      projectMembers: ["60d5ec49f1b2c72d88f8e8c1", "60d5ec49f1b2c72d88f8e8c2"],
      projectOwner: "60d5ec49f1b2c72d88f8e8c1",
      projectRepo: [
        "https://github.com/user/elearning-frontend",
        "https://github.com/user/elearning-backend",
      ],
    },
    {
      title: "Finance Tracker",
      description:
        "A web app to track expenses, set budgets, and analyze financial habits.",
      projectLogo:
        "https://images-platform.99static.com/fE3VP38GdvmpBhQ75p_erWEseqw=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/90/90538/attachment_90538620",
      projectMembers: ["60d5ec49f1b2c72d88f8e8c3", "60d5ec49f1b2c72d88f8e8c4"],
      projectOwner: "60d5ec49f1b2c72d88f8e8c3",
      projectRepo: ["https://github.com/user/financetracker"],
    },
    {
      title: "Social Media App",
      description:
        "A social networking platform with real-time chat and media sharing features.",
      projectLogo:
        "https://cdn.shopify.com/app-store/listing_images/d4718e5822b10dc93891cc169d97f4e3/icon/CLnh6ejKhfkCEAE=.png",
      projectMembers: ["60d5ec49f1b2c72d88f8e8c5", "60d5ec49f1b2c72d88f8e8c6"],
      projectOwner: "60d5ec49f1b2c72d88f8e8c5",
      projectRepo: ["https://github.com/user/socialapp"],
    },
  ];

  return (
    <div className="flex flex-col justify-center h-auto scrollbar-hide overflow-y">
      <HomeHeader />

      <div className="p-6 scrollbar-hide overflow-y">
        <div className="bg- rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-6">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project, index) => (
              <div
                key={index}
                className="bg-secondary rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={project.projectLogo}
                      alt={`${project.title} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-muted-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div className="flex -space-x-2">
                        {project.projectMembers.map((member, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-muted-foreground border-2 border-white flex items-center justify-center text-blue-600 text-xs font-medium"
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-muted-foreground">
                          Repositories:
                        </span>
                      </div>
                      <div className="space-y-1 pl-6">
                        {project.projectRepo.map((repo, i) => (
                          <a
                            key={i}
                            href={repo}
                            className="text-sm text-blue-500 hover:underline block truncate"
                          >
                            {repo.split("/").pop()}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Owner ID: {project.projectOwner.slice(-4)}
                        </span>
                        <Button className="bg-primary">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Create Project Card */}
            <div
              className="bg-secondary rounded-lg border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center hover:border-gray-300 transition-colors cursor-pointer"
              onClick={onOpen}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <span className="text-2xl text-blue-500">+</span>
              </div>
              <h3 className="text-lg font-medium text-muted-foreground">
                Create Project
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                Start a new project collaboration
              </p>
            </div>
          </div>

          {data.length === 0 && (
            <div className="flex justify-center p-8">
              <div className="text-center">
                <p className="text-gray-500">No projects found</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    console.log("isOpen", isOpen);
                    onOpen();
                  }}
                >
                  Create Your First Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
