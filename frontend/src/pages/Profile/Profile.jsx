import React, { useState } from "react";
import {
  User,
  Edit,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  X,
  Star,
  ChevronDown,
  HeartHandshake,
  MessageSquare,
  Plus,
  Trash2,
  Search,
  Paperclip,
  Calendar,
  Filter,
  ArrowRight,
  Zap,
  ChevronRight,
  ChevronLeft,
  Send,
  MoreVertical,
  Bell,
  Settings,
  LogOut,
  Users,
  FileText,
  Award,
  BarChart2,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import ChatPanel from "./chatPanel";

const ProfilePage = () => {

  const { usertoken,setUsertoken } = React.useContext(AuthContext);
  const [editUser, setEditUser] = useState({
    ...usertoken?.user,
    availability: usertoken?.user?.availability || "", // single value
  });
  console.log("User token:", editUser);


  // User data state
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "Boston, MA",
    bio: "UI/UX Designer open to skill exchanges. Available weekdays after 5pm and weekends all day.",
    rating: 4.7,
    skillsOffered: ["UI/UX Design", "Photography", "Figma"],
    skillsNeeded: ["Web Development", "Video Editing"],
    availability: ["Weekdays", "Evenings"],
    completedSwaps: 12,
    memberSince: "2022",
    badges: ["Top Swapper", "Verified", "Early Adopter"],
  });

  // Requests data state
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      skillOffered: "Web Development",
      skillRequested: "UI/UX Design",
      user: "Sam Wilson",
      userRating: 4.3,
      userPhoto: "SW",
      date: "2023-05-15",
      time: "14:30",
      message:
        "Can you help me with React components? I need a complete redesign of my portfolio.",
      attachment: "project_brief.pdf",
      availability: ["Weekends", "Mornings"],
      chatMessages: [
        {
          id: 1,
          sender: "Sam Wilson",
          text: "Hi Alex! I saw your profile and love your design work.",
          time: "10:30 AM",
        },
        {
          id: 2,
          sender: "You",
          text: "Thanks Sam! What kind of design help do you need?",
          time: "10:35 AM",
        },
      ],
    },
    {
      id: 2,
      skillOffered: "Video Editing",
      skillRequested: "Photography",
      user: "Jamie Lee",
      userRating: 4.8,
      userPhoto: "JL",
      date: "2023-05-16",
      time: "10:00",
      message:
        "Need professional product photos for my e-commerce store. Can offer video editing services in return.",
      attachment: null,
      availability: ["Weekdays", "Afternoons"],
      chatMessages: [],
    },
  ]);

  const [completedRequests, setCompletedRequests] = useState([
    {
      id: 3,
      skillOffered: "Copywriting",
      skillRequested: "Figma",
      user: "Taylor Smith",
      userRating: 4.5,
      userPhoto: "TS",
      date: "2023-05-10",
      time: "16:45",
      message:
        "Need help with website content writing. Can offer Figma design in exchange.",
      attachment: "content_guidelines.docx",
      status: "accepted",
      feedback:
        "Alex did an amazing job with the content! Very professional and delivered on time.",
      availability: ["Evenings", "Weekends"],
      chatMessages: [
        {
          id: 1,
          sender: "Taylor Smith",
          text: "The content looks great! Exactly what I needed.",
          time: "May 12, 3:45 PM",
        },
        {
          id: 2,
          sender: "You",
          text: "Glad you like it! The Figma designs were super helpful.",
          time: "May 12, 4:02 PM",
        },
      ],
    },
    {
      id: 4,
      skillOffered: "SEO Optimization",
      skillRequested: "UI/UX Design",
      user: "Chris Brown",
      userRating: 4.1,
      userPhoto: "CB",
      date: "2023-05-05",
      time: "09:15",
      message: "Looking for UI/UX design consultation for my startup website.",
      attachment: null,
      status: "rejected",
      availability: ["Mornings", "Weekdays"],
      chatMessages: [
        {
          id: 1,
          sender: "Chris Brown",
          text: "Sorry we couldn't make the timing work this time.",
          time: "May 5, 11:30 AM",
        },
      ],
    },
  ]);

  // UI state
  const [editMode, setEditMode] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pendingFilter, setPendingFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("");
  const [pendingAvailabilityFilter, setPendingAvailabilityFilter] =
    useState("");
  const [completedAvailabilityFilter, setCompletedAvailabilityFilter] =
    useState("");
  const [newRequest, setNewRequest] = useState({
    skillOffered: "",
    skillRequested: "",
    message: "",
    date: "",
    time: "",
    attachment: null,
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [activeChatId, setActiveChatId] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Availability options
  const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Mornings",
    "Afternoons",
    "Evenings",
  ];

  useEffect(() => {
    if (usertoken?.user) {
      setEditUser(usertoken.user);
    }
  }, [usertoken]);

  // Filter functions
  const filterRequests = (requests, filter, availabilityFilter) => {
    return requests.filter((req) => {
      const matchesText =
        filter === "" ||
        req.skillOffered.toLowerCase().includes(filter.toLowerCase()) ||
        req.skillRequested.toLowerCase().includes(filter.toLowerCase()) ||
        req.user.toLowerCase().includes(filter.toLowerCase()) ||
        req.message.toLowerCase().includes(filter.toLowerCase());

      const matchesAvailability =
        availabilityFilter === "" ||
        req.availability.some((avail) =>
          avail.toLowerCase().includes(availabilityFilter.toLowerCase())
        );

      return matchesText && matchesAvailability;
    });
  };

  const filteredPending = filterRequests(
    pendingRequests,
    pendingFilter,
    pendingAvailabilityFilter
  );
  const filteredCompleted = filterRequests(
    completedRequests,
    completedFilter,
    completedAvailabilityFilter
  );

  // Handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    setNewRequest((prev) => ({
      ...prev,
      attachment: e.target.files[0]?.name || null,
    }));
  };

  const acceptRequest = (id) => {
    const request = pendingRequests.find((r) => r.id === id);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    setCompletedRequests((prev) => [
      { ...request, status: "accepted" },
      ...prev,
    ]);
  };

  const rejectRequest = (id) => {
    const request = pendingRequests.find((r) => r.id === id);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
    setCompletedRequests((prev) => [
      { ...request, status: "rejected" },
      ...prev,
    ]);
  };

  const deleteRequest = (id) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const submitFeedback = (id, feedback) => {
    setCompletedRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, feedback } : req))
    );
    setShowFeedbackForm(null);
  };

  const submitRequest = (e) => {
    e.preventDefault();
    const newReq = {
      id: Date.now(),
      ...newRequest,
      user: "You",
      userRating: user.rating,
      userPhoto: user.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      status: "pending",
      availability: user.availability,
      chatMessages: [],
    };
    setPendingRequests((prev) => [newReq, ...prev]);
    setNewRequest({
      skillOffered: "",
      skillRequested: "",
      message: "",
      date: "",
      time: "",
      attachment: null,
    });
    setShowRequestModal(false);
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    if (activeTab === "pending") {
      setPendingRequests((prev) =>
        prev.map((req) =>
          req.id === activeChatId
            ? { ...req, chatMessages: [...req.chatMessages, newMessage] }
            : req
        )
      );
    } else {
      setCompletedRequests((prev) =>
        prev.map((req) =>
          req.id === activeChatId
            ? { ...req, chatMessages: [...req.chatMessages, newMessage] }
            : req
        )
      );
    }
  };

  // Request Card Component
  const RequestCard = ({ request, type = "pending" }) => (
    <div
      className={`border rounded-xl p-5 mb-4 transition-all hover:shadow-md cursor-pointer ${
        activeChatId === request.id ? "ring-2 ring-indigo-500" : ""
      } ${
        type === "completed"
          ? request.status === "accepted"
            ? "border-green-200 bg-green-50/20"
            : "border-red-200 bg-red-50/20"
          : "border-gray-200"
      }`}
      onClick={() => setActiveChatId(request.id)}
    >
      <div className="flex justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-700 font-bold">
              {request.userPhoto}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{request.user}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="text-yellow-500 fill-yellow-500 w-4 h-4 mr-1" />
                  {request.userRating}
                </div>
              </div>
              {type === "pending" && request.user !== "You" && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptRequest(request.id);
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    title="Accept"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      rejectRequest(request.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Reject"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              {type === "pending" && request.user === "You" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRequest(request.id);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              )}
              {type === "completed" && (
                <span
                  className={`px-2 py-1 rounded text-xs ${request.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {request.status}
                </span>
              )}
            </div>

            <div className="mt-3 bg-blue-50 rounded-lg p-3 flex items-center">
              <div className="flex-1">
                <p className="text-xs text-blue-600">Offering</p>
                <p className="font-medium">{request.skillOffered}</p>
              </div>
              <ArrowRight className="text-blue-400 mx-2" />
              <div className="flex-1">
                <p className="text-xs text-blue-600">Requesting</p>
                <p className="font-medium">{request.skillRequested}</p>
              </div>
            </div>

            <p className="mt-3 text-gray-700 line-clamp-2">{request.message}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {request.availability.map((avail) => (
                <span
                  key={avail}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {avail}
                </span>
              ))}
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center">
                <Calendar size={12} className="mr-1" />
                {request.date} at {request.time}
              </span>
            </div>

            {request.attachment && (
              <div className="mt-2 flex items-center text-blue-600 text-sm">
                <Paperclip size={14} className="mr-1" />
                {request.attachment}
              </div>
            )}

            {request.chatMessages.length > 0 && (
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <MessageSquare size={14} className="mr-1" />
                {request.chatMessages.length} message
                {request.chatMessages.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>

      {type === "completed" && request.status === "accepted" && (
        <div className="mt-4 pt-4 border-t">
          {request.feedback ? (
            <div>
              <p className="text-sm font-medium text-gray-700">
                Your Feedback:
              </p>
              <p className="text-sm text-gray-600 mt-1">{request.feedback}</p>
            </div>
          ) : showFeedbackForm === request.id ? (
            <div>
              <textarea
                placeholder="Share your experience..."
                className="w-full p-2 border rounded text-sm mb-2"
                rows="2"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowFeedbackForm(null)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    submitFeedback(request.id, "Great experience!")
                  }
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFeedbackForm(request.id);
              }}
              className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
            >
              <MessageSquare size={14} className="mr-1" />
              Leave Feedback
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Filter Component
  const FilterSection = ({
    filter,
    setFilter,
    availabilityFilter,
    setAvailabilityFilter,
    placeholder,
  }) => (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="relative">
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="pl-10 pr-8 py-2 border rounded-lg appearance-none"
        >
          <option value="">All Availability</option>
          {availabilityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">SkillSwap</h1>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold"
          >
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="inline mr-2" />
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle size={16} className="inline mr-2" />
                Help
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} className="inline mr-2" />
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white shadow-md p-4">
          <div className="space-y-3">
            <button className="w-full flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white">
              <User size={18} className="mr-2" />
              My Profile
            </button>
            <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Users size={18} className="mr-2" />
              Community
            </button>
            <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Award size={18} className="mr-2" />
              Badges
            </button>
            <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BarChart2 size={18} className="mr-2" />
              Stats
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-800">SkillSwap</h1>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold"
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings size={16} className="inline mr-2" />
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <HelpCircle size={16} className="inline mr-2" />
                        Help
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="inline mr-2" />
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white">
                  <User size={18} className="mr-2" />
                  My Profile
                </button>
                <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Users size={18} className="mr-2" />
                  Community
                </button>
                <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Award size={18} className="mr-2" />
                  Badges
                </button>
                <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <BarChart2 size={18} className="mr-2" />
                  Stats
                </button>
                <button className="w-full flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  <CreditCard size={18} className="mr-2" />
                  Premium
                </button>
              </nav>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="font-bold text-lg mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Completed Swaps</p>
                  <p className="text-2xl font-bold">{user.completedSwaps}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-medium">{user.memberSince}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Badges Earned</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center overflow-hidden shadow-md">
                      <span className="text-4xl font-bold text-indigo-700">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    {editMode && (
                      <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition">
                        <Edit size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star
                      size={16}
                      className="mr-1 text-yellow-500 fill-yellow-500"
                    />
                    <span className="font-medium">{user.rating}</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">
                        {editMode ? (
                          <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                          />
                        ) : (
                          user.name
                        )}
                      </h1>
                      <p className="text-indigo-600 font-medium">
                        {user.skillsOffered.join(", ")}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className={`flex items-center px-4 py-2 rounded-lg transition ${
                        editMode
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {editMode ? (
                        <>
                          <Check size={16} className="mr-1" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit size={16} className="mr-1" />
                          Edit
                        </>
                      )}
                    </button>
                  </div>

                  {editMode ? (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-3 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 flex-grow py-1"
                        />
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="mr-3 text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone}
                          onChange={handleInputChange}
                          className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 flex-grow py-1"
                        />
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-3 text-gray-500" />
                        <input
                          type="text"
                          name="location"
                          value={user.location}
                          onChange={handleInputChange}
                          className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 flex-grow py-1"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">
                          Availability
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {availabilityOptions.map((option) => (
                            <label key={option} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={user.availability.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setUser((prev) => ({
                                      ...prev,
                                      availability: [
                                        ...prev.availability,
                                        option,
                                      ],
                                    }));
                                  } else {
                                    setUser((prev) => ({
                                      ...prev,
                                      availability: prev.availability.filter(
                                        (a) => a !== option
                                      ),
                                    }));
                                  }
                                }}
                                className="mr-1"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <textarea
                        name="bio"
                        value={user.bio}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg mt-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows="3"
                        placeholder="Tell others about yourself..."
                      />
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <Mail size={18} className="mr-3 text-gray-500" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="mr-3 text-gray-500" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-3 text-gray-500" />
                        <span>{user.location}</span>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-700">
                          Availability
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.availability.map((avail) => (
                            <span
                              key={avail}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                            >
                              {avail}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700 leading-relaxed">
                        {user.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Requests Section with Tabs */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className={`${activeChatId ? "lg:w-2/3" : "w-full"}`}>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab("pending")}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                          activeTab === "pending"
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Clock size={18} className="mr-2" />
                        Pending ({pendingRequests.length})
                      </button>
                      <button
                        onClick={() => setActiveTab("completed")}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                          activeTab === "completed"
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <HeartHandshake size={18} className="mr-2" />
                        Completed ({completedRequests.length})
                      </button>
                    </div>

                    <button
                      onClick={() => setShowRequestModal(true)}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      <Plus size={16} className="mr-1" />
                      New Request
                    </button>
                  </div>

                  {activeTab === "pending" ? (
                    <>
                      <FilterSection
                        filter={pendingFilter}
                        setFilter={setPendingFilter}
                        availabilityFilter={pendingAvailabilityFilter}
                        setAvailabilityFilter={setPendingAvailabilityFilter}
                        placeholder="Filter pending requests..."
                      />

                      {filteredPending.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">
                            No pending requests found
                          </p>
                          <button
                            onClick={() => {
                              setPendingFilter("");
                              setPendingAvailabilityFilter("");
                            }}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Clear filters
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredPending.map((request) => (
                            <RequestCard
                              key={request.id}
                              request={request}
                              type="pending"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <FilterSection
                        filter={completedFilter}
                        setFilter={setCompletedFilter}
                        availabilityFilter={completedAvailabilityFilter}
                        setAvailabilityFilter={setCompletedAvailabilityFilter}
                        placeholder="Filter completed requests..."
                      />

                      {filteredCompleted.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">
                            No completed requests yet
                          </p>
                          <button
                            onClick={() => {
                              setCompletedFilter("");
                              setCompletedAvailabilityFilter("");
                            }}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Clear filters
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredCompleted.map((request) => (
                            <RequestCard
                              key={request.id}
                              request={request}
                              type="completed"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Chat Panel */}
              <div className={`${activeChatId ? "lg:w-1/3" : "hidden"}`}>
                <ChatPanel
                  activeTab={activeTab}
                  activeChatId={activeChatId}
                  pendingRequests={pendingRequests}
                  completedRequests={completedRequests}
                  onClose={() => setActiveChatId(null)}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Create New Swap Request</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitRequest}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Skill You're Offering
                </label>
                <select
                  name="skillOffered"
                  value={newRequest.skillOffered}
                  onChange={handleRequestChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a skill you can offer</option>
                  {user.skillsOffered.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Skill You're Requesting
                </label>
                <input
                  type="text"
                  name="skillRequested"
                  value={newRequest.skillRequested}
                  onChange={handleRequestChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter skill you need"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={newRequest.message}
                  onChange={handleRequestChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe what you're looking for..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newRequest.date}
                    onChange={handleRequestChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newRequest.time}
                    onChange={handleRequestChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Attachment (Optional)
                </label>
                <label className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="text-center">
                    <Paperclip className="mx-auto text-gray-400" />
                    <p className="text-sm text-gray-500 mt-1">
                      {newRequest.attachment
                        ? newRequest.attachment
                        : "Click to upload files"}
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Zap className="mr-2" size={16} />
                  Post Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
