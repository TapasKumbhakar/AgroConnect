import React, { useState } from 'react';
import {
  ChevronDownIcon,
  UserGroupIcon,
  ChartBarIcon,
  BeakerIcon,
  BookOpenIcon,
  MapPinIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapIcon
} from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, isLoggedIn, onLogout, user }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  const features = [
    {
      icon: UserGroupIcon,
      title: "Farmer Management",
      description: "Comprehensive farmer registration, profile management, and tracking system"
    },
    {
      icon: BeakerIcon,
      title: "Crop Analytics",
      description: "Advanced crop monitoring, yield prediction, and optimization recommendations"
    },
    {
      icon: ChartBarIcon,
      title: "Data Analytics",
      description: "Real-time insights, reports, and analytics for better decision making"
    },
    {
      icon: BookOpenIcon,
      title: "Resource Library",
      description: "Extensive collection of farming guides, best practices, and educational content"
    },
    {
      icon: MapPinIcon,
      title: "Location Tracking",
      description: "GPS-based field mapping and location-specific agricultural recommendations"
    }
  ];

  const stats = [
    { number: "1000+", label: "Registered Farmers" },
    { number: "50+", label: "Crop Varieties" },
    { number: "25+", label: "Locations Covered" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab, India",
      text: "ARMS has revolutionized how I manage my farm. The crop recommendations have increased my yield by 30%.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra, India",
      text: "The resource library is incredibly helpful. I've learned so many new techniques that have improved my farming.",
      rating: 5
    },
    {
      name: "Mohammed Ali",
      location: "Uttar Pradesh, India",
      text: "Excellent platform for modern farming. The analytics help me make better decisions for my crops.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                ARMS
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'features', 'farmers', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-colors ${
                    activeSection === section
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  {section === 'farmers' ? 'Our Farmers' : section}
                </button>
              ))}
            </div>

            {/* Login/Logout Button */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Welcome, {user?.name || 'User'}</span>
                  <button
                    onClick={onLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-gray-700 hover:text-green-600"
              >
                <ChevronDownIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">
                {['home', 'about', 'features', 'farmers', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left capitalize font-medium text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {section === 'farmers' ? 'Our Farmers' : section}
                  </button>
                ))}
                {isLoggedIn ? (
                  <button
                    onClick={onLogout}
                    className="text-left text-red-600 font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={onLogin}
                    className="text-left text-green-600 font-medium"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                  {" "}Agricultural{" "}
                </span>
                Future
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                ARMS (Agricultural Resource Management System) empowers farmers with cutting-edge technology, 
                data-driven insights, and comprehensive tools to maximize crop yields and optimize farming operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={isLoggedIn ? () => scrollToSection('features') : onLogin}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isLoggedIn ? 'Explore Features' : 'Get Started'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200 flex items-center justify-center">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl flex items-center justify-center text-white text-8xl">
                🌾
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
                ☀️
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center text-3xl">
                💧
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About ARMS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing agriculture through technology, empowering farmers with the tools and insights they need to thrive in modern farming.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To bridge the gap between traditional farming practices and modern technology, 
                providing farmers with accessible, data-driven solutions that increase productivity, 
                sustainability, and profitability.
              </p>
              <div className="space-y-4">
                {[
                  "Data-driven agricultural insights",
                  "Sustainable farming practices",
                  "Farmer community building",
                  "Technology accessibility"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center text-6xl">
                🚜
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to streamline your agricultural operations and maximize your farm's potential.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Farmers Section */}
      <section id="farmers" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Farmers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the farmers who have transformed their agricultural practices with ARMS.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your farming operations? Contact us today to learn more about ARMS.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneIcon className="w-6 h-6 text-green-400 mr-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="w-6 h-6 text-green-400 mr-4" />
                  <span>contact@arms.com</span>
                </div>
                <div className="flex items-center">
                  <MapIcon className="w-6 h-6 text-green-400 mr-4" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us about your farming needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌾</span>
                </div>
                <span className="ml-3 text-2xl font-bold">ARMS</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering farmers with technology-driven solutions for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-white transition-colors">Home</button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white transition-colors">About</button>
                <button onClick={() => scrollToSection('features')} className="block text-gray-400 hover:text-white transition-colors">Features</button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white transition-colors">Contact</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <button className="block text-gray-400 hover:text-white transition-colors text-left">Help Center</button>
                <button className="block text-gray-400 hover:text-white transition-colors text-left">Documentation</button>
                <button className="block text-gray-400 hover:text-white transition-colors text-left">Privacy Policy</button>
                <button className="block text-gray-400 hover:text-white transition-colors text-left">Terms of Service</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ARMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
