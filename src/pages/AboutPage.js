import React from 'react';
// eslint-disable-next-line no-unused-vars
import { ShoppingCart, Heart, Star, User, Shield, Truck, Award, Users, Globe, TrendingUp, Target, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { APP_CONFIG } from '../utils/constants';

const AboutPage = ({ setCurrentPage }) => {
  const { isDarkMode } = useAppContext();

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50,000+', color: 'text-blue-600' },
    { icon: ShoppingCart, label: 'Products Sold', value: '1M+', color: 'text-green-600' },
    { icon: Globe, label: 'Countries Served', value: '25+', color: 'text-purple-600' },
    { icon: Award, label: 'Awards Won', value: '15+', color: 'text-orange-600' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We carefully vet every product to ensure you receive only the highest quality items that exceed your expectations.',
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600'
    },
    {
      icon: Heart,
      title: 'Customer Love',
      description: 'Your satisfaction is our top priority. We go above and beyond to make every shopping experience memorable.',
      color: 'bg-red-100 dark:bg-red-900 text-red-600'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping options to get your purchases to you as soon as possible, anywhere you are.',
      color: 'bg-green-100 dark:bg-green-900 text-green-600'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product curation to customer service and beyond.',
      color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3B82F6&color=fff&size=150',
      bio: 'Passionate entrepreneur with 10+ years in e-commerce, dedicated to creating amazing shopping experiences.',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: 'https://ui-avatars.com/api/?name=Mike+Chen&background=10B981&color=fff&size=150',
      bio: 'Tech innovator focused on building scalable solutions and cutting-edge user experiences.',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Emily Davis',
      role: 'Head of Marketing',
      image: 'https://ui-avatars.com/api/?name=Emily+Davis&background=F59E0B&color=fff&size=150',
      bio: 'Creative marketer with a passion for brand storytelling and connecting with customers.',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'David Wilson',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=David+Wilson&background=8B5CF6&color=fff&size=150',
      bio: 'Operations expert ensuring smooth logistics and exceptional customer service delivery.',
      social: { twitter: '#', linkedin: '#' }
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'ShopHub Founded',
      description: 'Started with a vision to revolutionize online shopping and make it accessible to everyone.',
      icon: Target
    },
    {
      year: '2021',
      title: 'First 1,000 Customers',
      description: 'Reached our first major milestone with 1,000 satisfied customers and 5-star reviews.',
      icon: Users
    },
    {
      year: '2022',
      title: 'International Expansion',
      description: 'Expanded our reach to serve customers in 25+ countries across 4 continents.',
      icon: Globe
    },
    {
      year: '2023',
      title: 'Mobile App Launch',
      description: 'Launched our mobile app for iOS and Android with enhanced shopping features.',
      icon: Zap
    },
    {
      year: '2024',
      title: '1M+ Products Sold',
      description: 'Celebrated selling over 1 million products and winning multiple industry awards.',
      icon: TrendingUp
    }
  ];

  const achievements = [
    'Best E-commerce Platform 2023',
    'Customer Choice Award Winner',
    'Fastest Growing Online Store',
    'Excellence in Customer Service',
    'Sustainable Business Practices Leader',
    'Innovation in E-commerce Technology'
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            About {APP_CONFIG.NAME}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We're on a mission to make online shopping simple, enjoyable, and accessible to everyone around the world.
          </p>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce hidden lg:block"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce hidden lg:block" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce hidden lg:block" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={`fill-current ${isDarkMode ? 'text-gray-900' : 'text-gray-50'}`}></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These numbers represent our commitment to excellence and the trust our customers place in us.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  {APP_CONFIG.NAME} was born from a simple yet powerful idea: online shopping should be easy, enjoyable, and trustworthy for everyone. Founded in 2020 by a team of passionate entrepreneurs, we started as a small startup with big dreams of revolutionizing the e-commerce experience.
                </p>
                <p>
                  What began as a passion project in a small garage has grown into a platform trusted by thousands of customers worldwide. We've carefully curated a diverse selection of high-quality products while maintaining our unwavering commitment to exceptional customer service and innovative technology.
                </p>
                <p>
                  Today, {APP_CONFIG.NAME} continues to evolve and expand, always putting our customers first and striving to create the best possible shopping experience. Our journey is far from over – we're just getting started on our mission to make online shopping better for everyone.
                </p>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 lg:p-12`}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8">
                  <ShoppingCart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  To provide customers worldwide with high-quality products at competitive prices, backed by exceptional service, innovative technology, and a seamless shopping experience that exceeds expectations.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-blue-600 mb-1">4.9★</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Customer Rating</div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and help us deliver the best possible experience to our customers every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 ${value.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted e-commerce platform, here are the key milestones in our exciting journey.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center z-10 hidden lg:flex">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 lg:hidden bg-gradient-to-br from-blue-500 to-purple-600`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden lg:block w-5/12"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The passionate, dedicated people behind {APP_CONFIG.NAME} who work tirelessly to bring you the best shopping experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300`}>
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-blue-100 dark:border-blue-900 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{member.bio}</p>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <a href={member.social.twitter} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <span className="text-xs font-bold">T</span>
                  </a>
                  <a href={member.social.linkedin} className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                    <span className="text-xs font-bold">in</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're honored to be recognized by industry leaders and customers alike for our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300`}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-bold text-lg">{achievement}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Experience the {APP_CONFIG.NAME} difference today and discover why thousands of customers trust us for all their shopping needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium text-lg btn-hover"
            >
              Start Shopping Now
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-medium text-lg"
            >
              Get in Touch
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Shopping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span className="text-sm">5-Star Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Customer Love</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;