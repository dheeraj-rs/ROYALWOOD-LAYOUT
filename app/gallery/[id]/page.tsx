import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, User, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// Define the project type for TypeScript
type Project = {
  id: string;
  title: string;
  category: string;
  mainImage: string;
  images: string[];
  description: string;
  client: string;
  location: string;
  completedDate: string;
  projectDuration: string;
  budget: string;
  details: {
    challenge: string;
    solution: string;
    materials: string[];
    features: string[];
  };
  testimonial: {
    text: string;
    author: string;
    rating: number;
  };
};

// Projects data
const projects: Project[] = [
  {
    id: "1",
    title: "Modern Luxury Living Room",
    category: "living",
    mainImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/586922/pexels-photo-586922.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "A sophisticated living space featuring our premium leather sectional and handcrafted coffee table. This project showcases the perfect blend of modern aesthetics and timeless comfort.",
    client: "The Henderson Residence",
    location: "Manhattan, NY",
    completedDate: "March 2024",
    projectDuration: "8 weeks",
    budget: "$45,000 - $60,000",
    details: {
      challenge: "The clients wanted to transform their traditional living room into a modern, sophisticated space while maintaining comfort for their family of four.",
      solution: "We designed a custom sectional sofa in premium Italian leather, paired with a live-edge walnut coffee table and complementary accent pieces.",
      materials: ["Premium Italian Leather", "Solid Walnut Wood", "Brushed Steel Hardware", "High-Density Foam Cushioning"],
      features: ["Custom Sectional Sofa", "Live-Edge Coffee Table", "Built-in Storage Ottoman", "Accent Lighting", "Custom Area Rug"]
    },
    testimonial: {
      text: "Royalwood transformed our living room beyond our wildest dreams. The attention to detail and quality of craftsmanship is exceptional. Our family loves spending time in this beautiful space.",
      author: "Sarah Henderson",
      rating: 5
    }
  },
  {
    id: "2",
    title: "Executive Office Suite",
    category: "office",
    mainImage: "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Custom executive desk and built-in shelving system for a corporate headquarters. Designed to inspire productivity while maintaining executive presence.",
    client: "Sterling & Associates",
    location: "Financial District, NY",
    completedDate: "January 2024",
    projectDuration: "12 weeks",
    budget: "$75,000 - $90,000",
    details: {
      challenge: "Create an executive office that reflects the company's success while providing functional workspace for daily operations.",
      solution: "We crafted a custom executive desk with integrated technology, built-in storage solutions, and a sophisticated meeting area.",
      materials: ["Solid Mahogany", "Leather Inlays", "Brass Hardware", "Tempered Glass", "Premium Fabric"],
      features: ["Custom Executive Desk", "Built-in Shelving", "Meeting Table", "Ergonomic Seating", "Integrated Technology"]
    },
    testimonial: {
      text: "The executive suite Royalwood created perfectly represents our company's values. It's both impressive for clients and functional for daily work.",
      author: "Michael Chen, CEO",
      rating: 5
    }
  },
  {
    id: "2",
    title: "Executive Office Suite",
    category: "office",
    mainImage: "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Custom executive desk and built-in shelving system for a corporate headquarters. Designed to inspire productivity while maintaining executive presence.",
    client: "Sterling & Associates",
    location: "Financial District, NY",
    completedDate: "January 2024",
    projectDuration: "12 weeks",
    budget: "$75,000 - $90,000",
    details: {
      challenge: "Create an executive office that reflects the company's success while providing functional workspace for daily operations.",
      solution: "We crafted a custom executive desk with integrated technology, built-in storage solutions, and a sophisticated meeting area.",
      materials: ["Solid Mahogany", "Leather Inlays", "Brass Hardware", "Tempered Glass", "Premium Fabric"],
      features: ["Custom Executive Desk", "Built-in Shelving", "Meeting Table", "Ergonomic Seating", "Integrated Technology"]
    },
    testimonial: {
      text: "The executive suite Royalwood created perfectly represents our company's values. It's both impressive for clients and functional for daily work.",
      author: "Michael Chen, CEO",
      rating: 5
    }
  }
];

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects.find((p: Project) => p.id === params.id);

  if (!project) {
    return {
      title: 'Project Not Found | Royalwood Interiors',
    };
  }

  return {
    title: `${project.title} | Royalwood Interiors`,
    description: project.description,
    openGraph: {
      images: [project.mainImage],
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-300 mb-8">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Portfolio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.mainImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {project.category}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(project.testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <User className="text-amber-400" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Client</div>
                  <div className="text-white font-medium">{project.client}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-amber-400" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white font-medium">{project.location}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-amber-400" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Completed</div>
                  <div className="text-white font-medium">{project.completedDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div key={index} className="group cursor-pointer overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Project Overview</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Duration</div>
                    <div className="text-white font-medium">{project.projectDuration}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Budget Range</div>
                    <div className="text-white font-medium">{project.budget}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Materials Used</h3>
                <div className="space-y-2">
                  {project.details.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                <div className="space-y-2">
                  {project.details.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
                <p className="text-gray-300 leading-relaxed">{project.details.challenge}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
                <p className="text-gray-300 leading-relaxed">{project.details.solution}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Client Testimonial</h3>
                <div className="flex items-center mb-4">
                  {[...Array(project.testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">&ldquo;{project.testimonial.text}&rdquo;</p>
                <div className="text-amber-400 font-medium">- {project.testimonial.author}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Your Own Transformation?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Let us create something extraordinary for your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-amber-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Start Your Project
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-amber-600 transition-all duration-300"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}