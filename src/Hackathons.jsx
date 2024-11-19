import { useState } from 'react';

const HackathonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const hackathons = [
    {
      id: 1,
      title: "Tech Innovators Hackathon",
      date: "December 1-3, 2024",
      location: "San Francisco, CA",
      mode: "In-person",
      participants: "200+",
      description: "Join us for a weekend of innovation and coding. Build solutions for real-world problems.",
      applicationLink: "https://example.com/apply1"
    },
    {
      id: 2,
      title: "Global AI Challenge",
      date: "December 15-17, 2024",
      location: "Virtual",
      mode: "Online",
      participants: "500+",
      description: "Create AI-powered solutions to tackle global challenges. Open to developers worldwide.",
      applicationLink: "https://example.com/apply2"
    },
    {
      id: 3,
      title: "Sustainable Tech Hackathon",
      date: "January 5-7, 2025",
      location: "New York, NY",
      mode: "Hybrid",
      participants: "300+",
      description: "Develop green technology solutions for a sustainable future.",
      applicationLink: "https://example.com/apply3"
    }
  ];

  const filteredHackathons = hackathons.filter(hackathon =>
    hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hackathon.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Hackathons
          </h1>
          <p className="text-lg text-gray-600">
            Discover and participate in exciting hackathons worldwide
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search hackathons by name or location..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {hackathon.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">📅</span>
                    {hackathon.date}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">📍</span>
                    {hackathon.location}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">👥</span>
                    {hackathon.participants} participants
                  </p>
                  <p className="text-gray-600">
                    {hackathon.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {hackathon.mode}
                  </span>
                  <a
                    href={hackathon.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHackathons.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No hackathons found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonsPage;