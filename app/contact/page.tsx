"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success(
        "Message sent successfully! We'll get back to you within 24 hours."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Phone Support",
      description: "Speak directly with our donor care team",
      details: "+880 1860155311",
      availability: "Saturday - Thursday, 8:00 AM - 6:00 PM",
      action: "Call Now",
    },
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email Support",
      description: "Send us your questions and we'll respond promptly",
      details: "bloodbridge654@gmail.com",
      availability: "Response within 24 hours",
      action: "Send Email",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
      title: "Emergency Hotline",
      description: "24/7 support for urgent blood requests",
      details: "+880 1860155311",
      availability: "Available 24/7",
      action: "Call Emergency",
    },
  ];

  // const officeLocations = [
  //   {
  //     name: "Main Office - Downtown",
  //     address: "123 Health Street, Medical District",
  //     city: "New York, NY 10001",
  //     phone: "(555) 123-4567",
  //     hours: "Mon-Fri: 8:00 AM - 6:00 PM",
  //   },
  //   {
  //     name: "Community Center - Uptown",
  //     address: "456 Community Ave, Uptown",
  //     city: "New York, NY 10002",
  //     phone: "(555) 123-4568",
  //     hours: "Mon-Fri: 9:00 AM - 5:00 PM",
  //   },
  //   {
  //     name: "Hospital Partnership - Central",
  //     address: "789 Medical Plaza, Central District",
  //     city: "New York, NY 10003",
  //     phone: "(555) 123-4569",
  //     hours: "Mon-Sun: 7:00 AM - 7:00 PM",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Phone className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Reach out to us with questions, feedback, or if
            you need assistance with blood donation or requests.
          </p>
        </div>

        <div className="flex justify-center">
          {/* grid grid-cols-1 lg:grid-cols-2 gap-12 */}
          {/* Contact Form */}
          {/* <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-red-600" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="donation">
                          Blood Donation Question
                        </SelectItem>
                        <SelectItem value="request">
                          Blood Request Support
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="partnership">
                          Partnership Opportunity
                        </SelectItem>
                        <SelectItem value="feedback">
                          Feedback or Suggestion
                        </SelectItem>
                        <SelectItem value="emergency">
                          Emergency Request
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      required
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div> */}

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {method.description}
                        </p>
                        <p className="font-medium text-gray-900 mb-1">
                          {method.details}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          {method.availability}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (
                              method.title.includes("Phone") ||
                              method.title.includes("Emergency")
                            ) {
                              window.open(`tel:${method.details}`);
                            } else if (method.title.includes("Email")) {
                              window.open(`mailto:${method.details}`);
                            }
                          }}
                        >
                          {method.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Notice */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">
                      Emergency Blood Requests
                    </h3>
                    <p className="text-red-700 text-sm mb-3">
                      For life-threatening emergencies requiring immediate
                      blood, call 911 first, then contact our emergency hotline
                      for additional support.
                    </p>
                    {/* <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Emergency Line
                    </Button> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        {/* <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officeLocations.map((location, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-red-600" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-gray-900 font-medium">
                      {location.address}
                    </p>
                    <p className="text-gray-600">{location.city}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{location.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{location.hours}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${encodeURIComponent(
                          location.address + ", " + location.city
                        )}`
                      )
                    }
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* FAQ Link */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Looking for Quick Answers?
            </h3>
            <p className="text-gray-600 mb-4">
              Check out our comprehensive FAQ section for immediate answers to
              common questions.
            </p>
            <Button asChild variant="outline">
              <a href="/faq">
                <HelpCircle className="h-4 w-4 mr-2" />
                View FAQ
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
