import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  Clock,
  User,
  HeartHandshake,
  ArrowRight,
  Zap,
  MessageSquare,
  Handshake,
  Users,
  Award,
  Calendar,
} from "lucide-react";
import Pagination from "../../component/utils/Pegination";
const HomePage = () => {
  const [publicRequests, setPublicRequests] = useState([
    {
      id: 1,
      user: "Sam Wilson",
      userRating: 4.3,
      userPhoto: "SW",
      skillOffered: "Web Development",
      skillRequested: "UI/UX Design",
      location: "Boston, MA",
      availability: ["Weekends", "Evenings"],
      posted: "2 days ago",
      description:
        "Looking for help with redesigning my portfolio site in exchange for React development.",
    },
    {
      id: 2,
      user: "Jamie Lee",
      userRating: 4.8,
      userPhoto: "JL",
      skillOffered: "Video Editing",
      skillRequested: "Photography",
      location: "New York, NY",
      availability: ["Weekdays", "Afternoons"],
      posted: "1 day ago",
      description:
        "Need product photos for my e-commerce store. Can edit your videos in return.",
    },
    {
      id: 3,
      user: "Taylor Smith",
      userRating: 4.5,
      userPhoto: "TS",
      skillOffered: "Copywriting",
      skillRequested: "Social Media Management",
      location: "Chicago, IL",
      availability: ["Mornings", "Weekends"],
      posted: "3 hours ago",
      description:
        "Will write website copy in exchange for managing my Instagram for a week.",
    },
    {
      id: 4,
      user: "Chris Brown",
      userRating: 4.1,
      userPhoto: "CB",
      skillOffered: "SEO Optimization",
      skillRequested: "Content Writing",
      location: "Austin, TX",
      availability: ["Weekdays", "Evenings"],
      posted: "1 week ago",
      description:
        "Can optimize your website SEO if you can write blog posts for my site.",
    },
    {
      id: 5,
      user: "Morgan Taylor",
      userRating: 4.6,
      userPhoto: "MT",
      skillOffered: "Graphic Design",
      skillRequested: "WordPress Development",
      location: "Seattle, WA",
      availability: ["Weekends"],
      posted: "5 days ago",
      description:
        "Looking for someone to build a WordPress site in exchange for logo and branding design.",
    },
    {
      id: 6,
      user: "Jordan Parker",
      userRating: 4.9,
      userPhoto: "JP",
      skillOffered: "Photography",
      skillRequested: "Fitness Training",
      location: "Miami, FL",
      availability: ["Mornings", "Weekdays"],
      posted: "Just now",
      description:
        "Professional headshots in exchange for personalized workout plans.",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [requestedSkillFilter, setRequestedSkillFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [skillTypeFilter, setSkillTypeFilter] = useState("");

  const filteredRequests = publicRequests.filter((request) => {
    const matchesSearch =
      searchTerm === "" ||
      request.skillOffered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.skillRequested.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRequestedSkill =
      requestedSkillFilter === "" ||
      request.skillRequested
        .toLowerCase()
        .includes(requestedSkillFilter.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "" ||
      request.availability.some((avail) =>
        avail.toLowerCase().includes(availabilityFilter.toLowerCase())
      );

    const matchesSkillType =
      skillTypeFilter === "" ||
      (skillTypeFilter === "offered" && request.skillOffered) ||
      (skillTypeFilter === "requested" && request.skillRequested);

    return (
      matchesSearch &&
      matchesRequestedSkill &&
      matchesAvailability &&
      matchesSkillType
    );
  });

  const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Mornings",
    "Afternoons",
    "Evenings",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Trade Skills, Not Cash</h1>
            <p className="text-xl mb-6 max-w-2xl">
              Connect with professionals who want to exchange their expertise -
              grow your skills without spending money!
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search skills (e.g. 'Web Design', 'Photography')"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center">
                <Zap className="mr-2" />
                Find Swaps
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-400 rounded-full opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-400 rounded-full opacity-20"></div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search needed skills"
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
              value={requestedSkillFilter}
              onChange={(e) => setRequestedSkillFilter(e.target.value)}
            />
          </div>

          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border rounded-md text-sm appearance-none"
            >
              <option value="">Any Availability</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={skillTypeFilter}
              onChange={(e) => setSkillTypeFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border rounded-md text-sm appearance-none"
            >
              <option value="">All Listings</option>
              <option value="offered">Skills Offered</option>
              <option value="requested">Skills Needed</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setRequestedSkillFilter("");
              setAvailabilityFilter("");
              setSkillTypeFilter("");
            }}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center ml-auto"
          >
            Clear all filters
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <HeartHandshake className="mr-2 text-indigo-500" />
            Available Skill Swaps ({filteredRequests.length})
          </h2>

          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">No matching requests found</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setRequestedSkillFilter("");
                  setAvailabilityFilter("");
                  setSkillTypeFilter("");
                }}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div>
              {" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
                  >
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="text-lg font-bold text-indigo-700">
                            {request.userPhoto}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold">{request.user}</h3>
                          <div className="flex items-center">
                            <Star className="text-yellow-500 fill-yellow-500 w-4 h-4 mr-1" />
                            <span className="text-sm text-gray-600">
                              {request.userRating}
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-600">
                              {request.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center bg-blue-50 rounded-lg p-3 mb-3">
                          <div className="flex-grow">
                            <p className="text-xs text-gray-500">Offering</p>
                            <p className="font-medium text-blue-700">
                              {request.skillOffered}
                            </p>
                          </div>
                          <ArrowRight className="text-gray-400 mx-2" />
                          <div className="flex-grow">
                            <p className="text-xs text-gray-500">Requesting</p>
                            <p className="font-medium text-blue-700">
                              {request.skillRequested}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3">
                          {request.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {request.availability.map((avail) => (
                            <span
                              key={avail}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {avail}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-sm text-gray-500">
                          {request.posted}
                        </span>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2 text-center">
            How Skill Swapping Works
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Exchange your expertise with others in three simple steps
          </p>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-indigo-600" size={24} />
                </div>
                <div className="mb-3 flex justify-center">
                  <span className="bg-indigo-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    1
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">Find Your Match</h3>
                <p className="text-gray-600 mb-4">
                  Browse our community for people offering skills you need and
                  needing skills you have.
                </p>
                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    <Search className="inline mr-1" size={14} />
                    Discover
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-purple-600" size={24} />
                </div>
                <div className="mb-3 flex justify-center">
                  <span className="bg-purple-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    2
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">Connect & Plan</h3>
                <p className="text-gray-600 mb-4">
                  Message potential partners to discuss details, expectations,
                  and timelines.
                </p>
                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                    <Handshake className="inline mr-1" size={14} />
                    Negotiate
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-green-600" size={24} />
                </div>
                <div className="mb-3 flex justify-center">
                  <span className="bg-green-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    3
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">Swap & Grow</h3>
                <p className="text-gray-600 mb-4">
                  Exchange your skills, help each other, and build valuable
                  connections.
                </p>
                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                    <Calendar className="inline mr-1" size={14} />
                    Schedule
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-indigo-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-700 font-bold">AM</span>
                </div>
                <div>
                  <h4 className="font-medium">Alex Morgan</h4>
                  <div className="flex">
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I got my entire website redesigned in exchange for helping with
                SEO. Saved thousands and made a great connection!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-purple-700 font-bold">SD</span>
                </div>
                <div>
                  <h4 className="font-medium">Samira Davis</h4>
                  <div className="flex">
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Traded my photography skills for Spanish lessons. Now I'm
                fluent and have an amazing portfolio!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-700 font-bold">TJ</span>
                </div>
                <div>
                  <h4 className="font-medium">Taylor Johnson</h4>
                  <div className="flex">
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                    <Star className="text-yellow-500 w-4 h-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a startup founder, skill swapping helped me get critical
                services without burning cash. Game changer!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
