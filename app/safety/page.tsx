'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Heart, AlertTriangle, CheckCircle, Clock, Users, Stethoscope, Droplets } from 'lucide-react';

export default function SafetyPage() {
  const safetyMeasures = [
    {
      icon: <Stethoscope className="h-6 w-6 text-blue-600" />,
      title: "Medical Screening",
      description: "Comprehensive health assessment before every donation",
      details: [
        "Temperature, blood pressure, and pulse check",
        "Hemoglobin level testing",
        "Medical history review",
        "Physical examination by qualified staff"
      ]
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Sterile Equipment",
      description: "All equipment is sterile and used only once",
      details: [
        "New, sterile needle for each donor",
        "Single-use collection bags and tubing",
        "Sterile gauze and bandages",
        "Disposable gloves for all staff"
      ]
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Trained Professionals",
      description: "Experienced medical staff oversee all donations",
      details: [
        "Licensed phlebotomists perform collections",
        "Registered nurses supervise procedures",
        "Medical directors provide oversight",
        "Regular staff training and certification"
      ]
    },
    {
      icon: <Droplets className="h-6 w-6 text-red-600" />,
      title: "Blood Testing",
      description: "Rigorous testing ensures blood safety",
      details: [
        "Testing for infectious diseases",
        "Blood typing and compatibility",
        "Quality control measures",
        "Quarantine until test results clear"
      ]
    }
  ];

  const donationProcess = [
    {
      step: 1,
      title: "Registration & Health History",
      description: "Complete donor registration and health questionnaire",
      duration: "10-15 minutes"
    },
    {
      step: 2,
      title: "Mini-Physical Examination",
      description: "Basic health screening including vital signs and hemoglobin test",
      duration: "5-10 minutes"
    },
    {
      step: 3,
      title: "Blood Donation",
      description: "Actual blood collection process with continuous monitoring",
      duration: "8-12 minutes"
    },
    {
      step: 4,
      title: "Recovery & Refreshments",
      description: "Rest period with snacks and fluids to ensure you feel well",
      duration: "10-15 minutes"
    }
  ];

  const afterCareInstructions = [
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      title: "Immediate Care (First 4 Hours)",
      instructions: [
        "Keep bandage on for at least 4 hours",
        "Avoid heavy lifting with donation arm",
        "Drink extra fluids (non-alcoholic)",
        "Eat healthy snacks if feeling lightheaded"
      ]
    },
    {
      icon: <Heart className="h-5 w-5 text-green-600" />,
      title: "First 24 Hours",
      instructions: [
        "Continue drinking plenty of fluids",
        "Avoid alcohol consumption",
        "Don't smoke for at least 2 hours",
        "Avoid strenuous exercise or heavy lifting"
      ]
    },
    {
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      title: "Next Few Days",
      instructions: [
        "Eat iron-rich foods to replenish stores",
        "Take a multivitamin with iron",
        "Get adequate rest and sleep",
        "Stay well-hydrated"
      ]
    }
  ];

  const warningSignsToWatch = [
    "Persistent dizziness or fainting",
    "Excessive bleeding from donation site",
    "Signs of infection (redness, swelling, warmth)",
    "Severe bruising or pain at donation site",
    "Fever or flu-like symptoms",
    "Unusual fatigue lasting more than 24 hours"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Donation Safety Guidelines</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety is our highest priority. Learn about our comprehensive safety measures 
            and guidelines to ensure a safe donation experience for everyone.
          </p>
        </div>

        {/* Safety Measures */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Safety Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyMeasures.map((measure, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      {measure.icon}
                    </div>
                    {measure.title}
                  </CardTitle>
                  <CardDescription>{measure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {measure.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Donation Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Safe Donation Process</CardTitle>
            <CardDescription>
              Step-by-step overview of what to expect during your donation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {donationProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <Badge variant="outline">{step.duration}</Badge>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* After-Care Instructions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Post-Donation Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {afterCareInstructions.map((care, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      {care.icon}
                    </div>
                    {care.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {care.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Warning Signs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
              When to Seek Medical Attention
            </CardTitle>
            <CardDescription>
              Contact your healthcare provider or our medical team if you experience any of these symptoms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warningSignsToWatch.map((sign, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-gray-800">{sign}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 font-medium">
                Emergency Contact: If you experience severe symptoms, call 911 immediately.
              </p>
              <p className="text-red-700 text-sm mt-1">
                For non-emergency concerns, contact our donor care line at (555) 123-4567.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Safety Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Safety Statistics</CardTitle>
            <CardDescription>
              Blood donation is one of the safest medical procedures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <p className="text-sm text-gray-600">Donation success rate without complications</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">&lt;1%</div>
                <p className="text-sm text-gray-600">Risk of serious adverse reactions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">0%</div>
                <p className="text-sm text-gray-600">Risk of contracting diseases from donation</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
                <p className="text-sm text-gray-600">Sterile, single-use equipment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 mt-1 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Safety is Our Priority</h3>
              <div className="text-blue-700 space-y-2">
                <p>• All blood collection follows strict FDA guidelines and regulations</p>
                <p>• Our facilities are regularly inspected and accredited</p>
                <p>• Staff undergo continuous training on safety protocols</p>
                <p>• We maintain detailed records and follow up on any adverse events</p>
                <p>• Your health information is kept strictly confidential</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}