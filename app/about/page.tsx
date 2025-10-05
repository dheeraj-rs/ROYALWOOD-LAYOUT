'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Award,
  Users,
  Globe,
  Leaf,
  ArrowRight,
  Clock
} from 'lucide-react';
import Footer from '@/components/Footer';
import SubHeader from '@/components/SubHeader';

function AboutPage() {
  const [visibleStats, setVisibleStats] = useState<boolean[]>([false, false, false, false]);
  const [activeValue, setActiveValue] = useState(0);

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: '50,000+', label: 'Happy Customers', color: 'from-blue-400 to-blue-600' },
    { icon: <Award className="w-8 h-8" />, value: '25+', label: 'Years Experience', color: 'from-yellow-400 to-yellow-600' },
    { icon: <Globe className="w-8 h-8" />, value: '15+', label: 'Cities Served', color: 'from-green-400 to-green-600' },
    { icon: <Leaf className="w-8 h-8" />, value: '100%', label: 'Eco-Friendly', color: 'from-purple-400 to-purple-600' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We never compromise on quality and strive for perfection in every piece.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We source our wood responsibly and practice eco-friendly manufacturing.'
    },
    {
      icon: Users,
      title: 'Craftsmanship',
      description: 'Our skilled artisans bring decades of experience to every creation.'
    },
    {
      icon: Clock,
      title: 'Timeless Design',
      description: 'We create furniture that transcends trends and lasts for generations.'
    }
  ];

  const milestones = [
    { year: '1999', title: 'Founded', description: 'Started as a small workshop with a vision to create exceptional furniture' },
    { year: '2005', title: 'First Showroom', description: 'Opened our flagship showroom in Mumbai' },
    { year: '2010', title: 'National Expansion', description: 'Expanded to 5 major cities across India' },
    { year: '2015', title: '10,000 Customers', description: 'Reached the milestone of serving 10,000 happy customers' },
    { year: '2020', title: 'Digital Transformation', description: 'Launched our e-commerce platform and digital services' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as one of India\'s leading luxury furniture brands' }
  ];

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Visionary leader with 25+ years in furniture design and manufacturing'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      description: 'Award-winning designer specializing in contemporary and luxury furniture'
    },
    {
      name: 'Vikram Singh',
      role: 'Master Craftsman',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      description: 'Third-generation craftsman with expertise in traditional woodworking'
    },
    {
      name: 'Anjali Mehta',
      role: 'Customer Experience',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      description: 'Dedicated to ensuring every customer has an exceptional experience'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleStats(prev => {
        const nextIndex = prev.findIndex(val => !val);
        if (nextIndex === -1) return prev;
        const newStats = [...prev];
        newStats[nextIndex] = true;
        return newStats;
      });
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(timer);
    }, 800);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 ">
      <SubHeader />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-sm border border-yellow-400/20 rounded-full px-6 py-2 mb-6">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400 tracking-wider uppercase">About Royalwood</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Crafting Dreams
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Since 1999
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              For over two decades, Royalwood has been synonymous with luxury, quality, and timeless design.
              We create furniture that transforms houses into homes and spaces into experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Story Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>

              <p className="text-lg text-white/80 leading-relaxed">
                What began as a small workshop in 1999 has evolved into one of India&apos;s most trusted luxury furniture brands.
                Our founder, Rajesh Sharma, started with a simple vision: to create furniture that combines traditional
                craftsmanship with contemporary design.
              </p>

              <p className="text-lg text-white/80 leading-relaxed">
                Today, Royalwood stands as a testament to that vision. We&apos;ve furnished over 50,000 homes across 15 cities,
                each piece telling a story of dedication, artistry, and passion. Our commitment extends beyond beautiful
                furniture – we believe in sustainable practices, ethical sourcing, and creating pieces that will be
                cherished for generations.
              </p>

              <p className="text-lg text-white/80 leading-relaxed">
                Every piece that leaves our workshop carries with it the legacy of master craftsmen, the innovation of
                modern design, and the promise of quality that has made Royalwood a household name in luxury furniture.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 font-semibold px-8 py-3 rounded-full group mt-8"
              >
                Explore Our Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Visual Content */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                      alt="Craftsmanship"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg"
                      alt="Quality Materials"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"
                      alt="Modern Design"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg"
                      alt="Elegant Spaces"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`group text-center p-8 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-yellow-400/30 rounded-2xl transition-all duration-500 hover:scale-105 transform ${visibleStats[index] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-white/70 font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do, from selecting the finest materials
              to delivering exceptional customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-white/70 text-lg">
              Key milestones in our 25-year journey
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-yellow-400/30 rounded-2xl p-6 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full border-4 border-black flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-ping opacity-75"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-white/70 text-lg">
              The passionate people behind Royalwood
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 hover:border-yellow-400/30 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-yellow-400/80 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made Royalwood their choice for luxury furniture.
                Let us help you create the home of your dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 font-semibold px-8 py-3 rounded-full"
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-yellow-400 px-8 py-3 rounded-full"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From concept to completion, every piece undergoes our meticulous crafting process
              that ensures uncompromising quality and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Design',
                description: 'Conceptualizing unique designs that blend form and function'
              },
              {
                step: '02',
                title: 'Material Selection',
                description: 'Sourcing the finest woods and materials from trusted suppliers'
              },
              {
                step: '03',
                title: 'Crafting',
                description: 'Expert artisans handcraft each piece with precision and care'
              },
              {
                step: '04',
                title: 'Finishing',
                description: 'Applying premium finishes and conducting quality inspections'
              }
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{process.title}</h3>
                <p className="text-gray-300">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;