import React from "react";
import { Users, HeartHandshake, Search, Star, Shield } from "lucide-react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About SkillSwap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting people through the exchange of knowledge and skills
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              At SkillSwap, we believe everyone has valuable skills to share and
              unique abilities to learn. Our platform breaks down traditional
              barriers to education by creating a community where knowledge
              flows freely between members.
            </p>
            <p className="text-gray-600">
              Whether you're looking to learn photography, improve your coding
              skills, or find someone to help with home repairs, SkillSwap makes
              it easy to connect with others who share your interests.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            How SkillSwap Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                List the skills you can offer and what you'd like to learn. Set
                your availability and preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Discover Skills</h3>
              <p className="text-gray-600">
                Browse or search for people offering skills you need. Filter by
                location, availability, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Request Swaps</h3>
              <p className="text-gray-600">
                Send swap requests to other members. Manage incoming and
                outgoing requests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Star className="text-indigo-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Exchange & Rate</h3>
              <p className="text-gray-600">
                Complete your skill swaps and leave feedback to build community
                trust.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Shield className="text-indigo-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Privacy Control</h3>
                <p className="text-gray-600">
                  Choose to make your profile public or private. You control
                  what information is visible to others.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-600"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Swap Management</h3>
                <p className="text-gray-600">
                  Easily accept, reject, or delete swap requests. Track pending
                  and completed exchanges.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-600"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Availability Scheduling
                </h3>
                <p className="text-gray-600">
                  Set your available times (weekends, evenings, etc.) to
                  coordinate swaps efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-600 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Swapping?
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join our growing community of knowledge sharers today. Whether
            you're looking to learn or teach, there's a place for you at
            SkillSwap.
          </p>
          <button className="bg-white text-indigo-600 font-medium py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
