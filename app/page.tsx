import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Users,
  Clock,
  Shield,
  Phone,
  MapPin,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Community Network",
      description:
        "Connect with a growing network of verified blood donors in your area.",
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Quick Response",
      description: "Find available donors instantly when time is critical.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Safe & Verified",
      description:
        "All donors are verified and follow strict safety protocols.",
    },
    {
      icon: <Activity className="h-8 w-8 text-red-600" />,
      title: "Real-time Updates",
      description: "Get live updates on donor availability and blood requests.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Registered Donors" },
    { number: "5,000+", label: "Lives Saved" },
    { number: "50+", label: "Cities Covered" },
    { number: "24/7", label: "Emergency Support" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Connecting Donors,{" "}
                <span className="text-red-600">Saving Lives</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join BloodBridge, the community-driven platform that connects
                blood donors with those in urgent need. Every donation can save
                up to three lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Link href="/register">
                    <Heart className="mr-2 h-5 w-5 fill-current" />
                    Become a Donor
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/donors">Find Donors Near You</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mx-auto mb-6">
                  <Heart className="h-12 w-12 text-red-600 fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                  Emergency Blood Request
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-sm">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Activity className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-sm">Blood Group: O+ (Critical)</span>
                  </div>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    asChild
                  >
                    <Link href="/request">Request Blood Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-red-100 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BloodBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes blood donation simple, safe, and effective.
              Connect with your community and make a real difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of heroes who are making a difference in their
            communities. Your donation can be the gift of life for someone in
            need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/register">
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Register as Donor
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/request">
                <Phone className="mr-2 h-5 w-5" />
                Need Blood Urgently?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
