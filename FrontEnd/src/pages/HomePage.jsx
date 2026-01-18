import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-2"></span>
            <span className="text-indigo-400 text-sm font-medium">Master Data Structures & Algorithms</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Level Up Your <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Coding Skills
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Practice curated DSA problems, track your progress, and ace your technical interviews with confidence
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg shadow-indigo-500/30">
              Start Learning Free
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition">
              View Problems
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400 text-sm">Problems</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Students</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-gray-400 text-lg">
            Comprehensive tools and resources for your DSA journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-indigo-500/50 transition">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Curated Problems</h3>
            <p className="text-gray-400">
              Hand-picked problems organized by difficulty and topic to maximize your learning efficiency
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-indigo-500/50 transition">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Track Progress</h3>
            <p className="text-gray-400">
              Visualize your improvement with detailed analytics and progress tracking dashboards
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-indigo-500/50 transition">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Learn Concepts</h3>
            <p className="text-gray-400">
              Master fundamental concepts with clear explanations and real-world examples
            </p>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Popular Topics
          </h2>
          <p className="text-gray-400 text-lg">
            Start with any topic that interests you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Arrays', count: 120, icon: '📊' },
            { name: 'Linked Lists', count: 45, icon: '🔗' },
            { name: 'Trees', count: 80, icon: '🌳' },
            { name: 'Graphs', count: 65, icon: '🕸️' },
            { name: 'Dynamic Programming', count: 95, icon: '💡' },
            { name: 'Sorting', count: 30, icon: '🔄' },
            { name: 'Searching', count: 40, icon: '🔍' },
            { name: 'Recursion', count: 55, icon: '♻️' }
          ].map((topic, idx) => (
            <button
              key={idx}
              className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-indigo-500/50 rounded-xl p-6 text-left transition group"
            >
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h3 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition">
                {topic.name}
              </h3>
              <p className="text-gray-500 text-sm">{topic.count} problems</p>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are mastering DSA and landing their dream jobs
            </p>
            <button className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 shadow-xl">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">DSA Master</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your path to mastering data structures and algorithms
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Problems</a></li>
                <li><a href="#" className="hover:text-white transition">Topics</a></li>
                <li><a href="#" className="hover:text-white transition">Progress</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 DSA Master. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;