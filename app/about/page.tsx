"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Target,
  Award,
  Globe,
  Shield,
  Clock,
  TrendingUp,
  User,
  Mail,
  Linkedin,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      number: "10,000+",
      label: "Registered Donors",
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      number: "5,000+",
      label: "Lives Saved",
      icon: <Heart className="h-6 w-6 text-red-600" />,
    },
    {
      number: "50+",
      label: "Cities Covered",
      icon: <Globe className="h-6 w-6 text-green-600" />,
    },
    {
      number: "24/7",
      label: "Emergency Support",
      icon: <Clock className="h-6 w-6 text-purple-600" />,
    },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Compassion",
      description:
        "We believe in the power of human kindness and the willingness to help others in their time of greatest need.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Safety First",
      description:
        "The safety of our donors and recipients is our highest priority, with rigorous protocols and medical oversight.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community",
      description:
        "We foster a strong community of donors, volunteers, and healthcare partners working together to save lives.",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Efficiency",
      description:
        "We leverage technology to connect donors with recipients quickly and efficiently when every minute counts.",
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      title: "Accessibility",
      description:
        "We strive to make blood donation accessible to everyone, regardless of location or background.",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Excellence",
      description:
        "We maintain the highest standards in everything we do, from donor care to recipient matching.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image:
        "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Board-certified hematologist with 15+ years in blood banking and transfusion medicine.",
      email: "sarah.johnson@bloodbridge.org",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Former healthcare tech executive passionate about using technology to save lives.",
      email: "michael.chen@bloodbridge.org",
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Director of Operations",
      image:
        "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Healthcare operations expert with extensive experience in blood donation programs.",
      email: "maria.rodriguez@bloodbridge.org",
    },
    {
      name: "James Wilson",
      role: "Community Outreach Director",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Dedicated to building partnerships and expanding our donor network nationwide.",
      email: "james.wilson@bloodbridge.org",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "BloodBridge Founded",
      description:
        "Started as a small initiative to connect local blood donors with hospitals during the COVID-19 pandemic.",
    },
    {
      year: "2021",
      title: "First 1,000 Donors",
      description:
        "Reached our first major milestone with 1,000 registered donors across 5 cities.",
    },
    {
      year: "2022",
      title: "Technology Platform Launch",
      description:
        "Launched our comprehensive digital platform with real-time matching and notifications.",
    },
    {
      year: "2023",
      title: "National Expansion",
      description:
        "Expanded operations to 25 states with partnerships with major hospital networks.",
    },
    {
      year: "2024",
      title: "10,000+ Lives Saved",
      description:
        "Celebrated saving over 10,000 lives through our donor network and emergency response system.",
    },
  ];

  const partnerships = [
    "American Red Cross",
    "National Blood Foundation",
    "Hospital Networks Nationwide",
    "Medical Universities",
    "Community Health Centers",
    "Emergency Medical Services",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 p-4 rounded-full">
              <Heart className="h-12 w-12 text-white fill-current" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About BloodBridge
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to revolutionize blood donation by connecting
            generous donors with those in urgent need through technology,
            compassion, and community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="mb-16">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              To create a world where no one suffers or dies due to lack of
              available blood. We bridge the gap between willing donors and
              urgent medical needs through innovative technology, ensuring that
              life-saving blood is always within reach when it matters most.
            </p>
          </CardContent>
        </Card>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Blood donation in progress"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                BloodBridge was born from a simple yet powerful observation:
                while millions of people are willing to donate blood, finding
                the right donor at the right time remains a critical challenge
                in healthcare.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Founded in 2020 during the global pandemic, we witnessed
                firsthand how blood shortages could impact patient care. Our
                founders, a team of healthcare professionals and technology
                experts, came together with a shared vision of creating a more
                efficient, transparent, and accessible blood donation system.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, BloodBridge has grown into a nationwide network that has
                facilitated thousands of life-saving connections. We continue to
                innovate and expand, always keeping our core mission at heart:
                connecting donors with those who need them most.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => window.open(`mailto:${member.email}`)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <Linkedin className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Partnerships */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Our Partners</CardTitle>
            <CardDescription className="text-center">
              We work with leading healthcare organizations to maximize our
              impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partnerships.map((partner, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <p className="font-medium text-gray-800">{partner}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Section */}
        <Card className="mb-16">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
              Every donation facilitated through BloodBridge has the potential
              to save up to three lives. Our platform has reduced the average
              time to find compatible donors by 60%, ensuring that critical
              patients receive the blood they need when they need it most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  60%
                </div>
                <p className="text-gray-600">Faster donor matching</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">Donor satisfaction rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  24/7
                </div>
                <p className="text-gray-600">Emergency response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're a potential donor, healthcare professional, or
            organization interested in partnership, there's a place for you in
            the BloodBridge community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Become a Donor
            </button>
            {/* <button className="border border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Partner With Us
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
