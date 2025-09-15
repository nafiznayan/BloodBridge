'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Heart, Scale, Calendar, Activity } from 'lucide-react';

export default function EligibilityPage() {
  const eligibleCriteria = [
    {
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      title: "Age Requirements",
      description: "Between 18-65 years old",
      details: "First-time donors must be between 18-60 years old. Regular donors can donate until age 65."
    },
    {
      icon: <Scale className="h-5 w-5 text-green-600" />,
      title: "Weight Requirements",
      description: "Minimum 50 kg (110 lbs)",
      details: "Must weigh at least 50 kg to ensure safe donation without adverse effects."
    },
    {
      icon: <Activity className="h-5 w-5 text-green-600" />,
      title: "Health Status",
      description: "Good general health",
      details: "Must be in good health on the day of donation with no cold, flu, or other illness symptoms."
    },
    {
      icon: <Heart className="h-5 w-5 text-green-600" />,
      title: "Hemoglobin Levels",
      description: "Adequate iron levels",
      details: "Minimum hemoglobin: 12.5 g/dL for women, 13.0 g/dL for men."
    }
  ];

  const ineligibleConditions = [
    "Currently pregnant or breastfeeding",
    "Had a tattoo or piercing in the last 3 months",
    "Recent travel to malaria-endemic areas",
    "History of hepatitis B or C",
    "HIV positive status",
    "Current use of certain medications",
    "Recent surgery or dental work",
    "History of heart disease or stroke",
    "Active cancer treatment",
    "Intravenous drug use"
  ];

  const temporaryDeferrals = [
    {
      condition: "Cold or Flu",
      period: "Wait until fully recovered"
    },
    {
      condition: "Antibiotics",
      period: "Wait 24-48 hours after last dose"
    },
    {
      condition: "Vaccination",
      period: "Wait 1-4 weeks depending on vaccine type"
    },
    {
      condition: "Dental Work",
      period: "Wait 24 hours for cleaning, 1 week for extractions"
    },
    {
      condition: "Travel",
      period: "Varies by destination (1-12 months)"
    },
    {
      condition: "Blood Donation",
      period: "Wait 56 days between whole blood donations"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Donation Eligibility</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about the requirements and guidelines to become a blood donor. 
            Your safety and the safety of blood recipients is our top priority.
          </p>
        </div>

        {/* Basic Eligibility Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
              Basic Eligibility Requirements
            </CardTitle>
            <CardDescription>
              You must meet all of these basic criteria to be eligible for blood donation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibleCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    {criteria.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{criteria.title}</h3>
                    <p className="text-green-700 font-medium mb-2">{criteria.description}</p>
                    <p className="text-sm text-gray-600">{criteria.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permanent Ineligibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <XCircle className="h-6 w-6 mr-3 text-red-600" />
              Permanent Ineligibility Conditions
            </CardTitle>
            <CardDescription>
              These conditions permanently disqualify individuals from donating blood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ineligibleConditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span className="text-gray-800">{condition}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Temporary Deferrals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />
              Temporary Deferral Periods
            </CardTitle>
            <CardDescription>
              These conditions require waiting periods before you can donate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {temporaryDeferrals.map((deferral, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-gray-900">{deferral.condition}</span>
                  </div>
                  <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                    {deferral.period}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pre-Donation Checklist */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Pre-Donation Checklist</CardTitle>
            <CardDescription>
              Follow these guidelines before your donation appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Do These Things
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Get a good night's sleep (7-8 hours)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Eat a healthy meal 3 hours before donation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Drink plenty of water (16 oz extra)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Bring valid photo ID</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Wear comfortable clothing with sleeves that roll up</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <XCircle className="h-5 w-5 mr-2 text-red-600" />
                  Avoid These Things
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Don't donate on an empty stomach</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Avoid alcohol 24 hours before donation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Don't smoke 2 hours before donation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Avoid fatty foods before donation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-sm">Don't take aspirin 48 hours before platelet donation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-blue-600 mt-1 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notice</h3>
              <div className="text-blue-700 space-y-2">
                <p>• Final eligibility is determined by medical professionals at the time of donation</p>
                <p>• All donors undergo a brief health screening and mini-physical before donation</p>
                <p>• If you have questions about your eligibility, consult with healthcare providers</p>
                <p>• Eligibility criteria may vary by location and blood collection organization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}