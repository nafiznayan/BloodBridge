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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Clock,
  Heart,
  Shield,
  Users,
  AlertTriangle,
} from "lucide-react";

export default function FAQPage() {
  const faqCategories = [
    {
      icon: <Heart className="h-5 w-5 text-red-600" />,
      title: "General Donation Questions",
      questions: [
        {
          question: "How often can I donate blood?",
          answer:
            "You can donate whole blood every 56 days (8 weeks). Platelet donors can donate every 7 days, up to 24 times per year. Plasma donors can donate twice per week with at least 48 hours between donations.",
        },
        {
          question: "How much blood is taken during donation?",
          answer:
            "A standard whole blood donation is about 1 pint (approximately 470ml). This represents less than 10% of your total blood volume and is quickly replenished by your body.",
        },
        {
          question: "How long does the donation process take?",
          answer:
            "The entire process takes about 45-60 minutes. The actual blood collection takes only 8-12 minutes. Most time is spent on registration, health screening, and recovery.",
        },
        {
          question: "Does donating blood hurt?",
          answer:
            "You'll feel a brief pinch when the needle is inserted, similar to getting a vaccination. Most donors report minimal discomfort during the actual donation process.",
        },
        {
          question: "What should I do before donating blood?",
          answer:
            "Get a good night's sleep, eat a healthy meal 3 hours before donation, drink plenty of water, and bring a valid photo ID. Avoid alcohol 24 hours before donation.",
        },
      ],
    },
    {
      icon: <Shield className="h-5 w-5 text-green-600" />,
      title: "Safety & Health Concerns",
      questions: [
        {
          question: "Is it safe to donate blood?",
          answer:
            "Yes, blood donation is very safe. All equipment is sterile and used only once. There is no risk of contracting any disease from donating blood. Trained medical professionals oversee the entire process.",
        },
        {
          question: "Can I get sick from donating blood?",
          answer:
            "Serious adverse reactions are extremely rare (less than 1%). Some donors may experience mild side effects like dizziness or fatigue, which typically resolve quickly with rest and fluids.",
        },
        {
          question: "Will donating blood weaken my immune system?",
          answer:
            "No, donating blood does not weaken your immune system. Your body quickly replaces the donated blood, and your immune function remains normal.",
        },
        {
          question: "Can I donate if I'm taking medications?",
          answer:
            "It depends on the medication. Many common medications don't prevent donation, but some do require deferral periods. Always inform staff about any medications you're taking.",
        },
        {
          question: "What happens if I feel faint during donation?",
          answer:
            "Our trained staff will immediately stop the donation, have you lie down, and provide care until you feel better. This is a normal reaction that happens to some donors.",
        },
      ],
    },
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      title: "Eligibility & Requirements",
      questions: [
        {
          question: "Who can donate blood?",
          answer:
            "Generally, healthy individuals aged 18-65, weighing at least 50kg, with adequate hemoglobin levels can donate. Specific eligibility criteria may vary by location and medical history.",
        },
        {
          question: "Can I donate if I have tattoos or piercings?",
          answer:
            "You must wait 3 months after getting a tattoo or piercing before donating blood. This waiting period helps ensure safety for both donor and recipient.",
        },
        {
          question: "Can I donate if I've traveled recently?",
          answer:
            "Travel to certain countries may require a deferral period ranging from 1-12 months, depending on the destination and risk of infectious diseases. Check with donation staff about your specific travel history.",
        },
        {
          question: "Can pregnant or breastfeeding women donate?",
          answer:
            "No, pregnant women cannot donate blood. Breastfeeding mothers must wait at least 6 weeks after delivery and until they're no longer breastfeeding to donate.",
        },
        {
          question: "Is there an upper age limit for donation?",
          answer:
            "Regular donors can continue donating until age 65. First-time donors are typically accepted until age 60, though this may vary by location and individual health assessment.",
        },
      ],
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      title: "After Donation",
      questions: [
        {
          question: "What should I do after donating blood?",
          answer:
            "Rest for 10-15 minutes, drink plenty of fluids, eat a healthy snack, keep your bandage on for 4 hours, and avoid heavy lifting with your donation arm for the rest of the day.",
        },
        {
          question: "When will my blood be replenished?",
          answer:
            "Your blood volume returns to normal within 24-48 hours. Red blood cells are fully replenished in 4-6 weeks, which is why there's a 56-day waiting period between donations.",
        },
        {
          question: "Can I exercise after donating blood?",
          answer:
            "Avoid strenuous exercise for 24 hours after donation. Light activities like walking are fine, but avoid heavy lifting, running, or intense workouts.",
        },
        {
          question: "What if I have bruising at the donation site?",
          answer:
            "Minor bruising is normal and usually resolves within a few days. Apply ice for the first 24 hours, then warm compresses. Contact us if bruising is severe or doesn't improve.",
        },
        {
          question: "How will I know if my blood was used?",
          answer:
            "While we can't tell you exactly where your blood went due to privacy reasons, you can be assured that all donated blood is tested and used to help patients in need.",
        },
      ],
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
      title: "Special Circumstances",
      questions: [
        {
          question: "Can I donate if I have diabetes?",
          answer:
            "People with well-controlled diabetes can often donate blood. However, you cannot donate if you've ever used insulin derived from cattle (bovine insulin) or if your diabetes is poorly controlled.",
        },
        {
          question: "Can I donate if I have high blood pressure?",
          answer:
            "You can donate if your blood pressure is well-controlled with medication and within acceptable limits at the time of donation (typically below 180/100 mmHg).",
        },
        {
          question: "What if I'm afraid of needles?",
          answer:
            "Let our staff know about your fear. They're experienced in helping nervous donors and can use techniques to make the process more comfortable. Many people with needle phobia successfully donate blood.",
        },
        {
          question: "Can I donate during my menstrual period?",
          answer:
            "Yes, you can donate during menstruation as long as you feel well and your hemoglobin levels are adequate. Some women prefer to wait until after their period when iron levels may be higher.",
        },
        {
          question: "What happens if my blood tests show something abnormal?",
          answer:
            "We'll contact you confidentially if any tests show abnormal results. This doesn't necessarily mean you have a health problem, but we'll recommend you follow up with your healthcare provider.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about blood donation. If you don't
            find what you're looking for, please contact our support team.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
                <CardDescription>
                  Common questions and answers about{" "}
                  {category.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Still Have Questions?</CardTitle>
            <CardDescription className="text-center">
              Our support team is here to help you with any additional questions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get personalized answers to your questions
                </p>
                <p className="text-blue-600 font-medium">
                  bloodbridge654@gmail.com
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Speak with our donor care team
                </p>
                <p className="text-green-600 font-medium">+880 1860155123</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Hours</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Saturday - Thursday
                </p>
                <p className="text-purple-600 font-medium">8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
