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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Hospital,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import {
  BLOOD_GROUP_LABELS,
  URGENCY_LABELS,
  URGENCY_COLORS,
  type BloodGroup,
  type UrgencyLevel,
} from "@/lib/types";

export default function RequestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    city: "",
    state: "",
    bloodGroup: "" as BloodGroup,
    urgency: "" as UrgencyLevel,
    unitsNeeded: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    additionalInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          unitsNeeded: parseInt(formData.unitsNeeded),
        }),
      });

      if (response.ok) {
        toast.success(
          "Blood request submitted successfully! We will notify available donors."
        );
        setFormData({
          patientName: "",
          hospitalName: "",
          city: "",
          state: "",
          bloodGroup: "" as BloodGroup,
          urgency: "" as UrgencyLevel,
          unitsNeeded: "",
          contactName: "",
          contactPhone: "",
          contactEmail: "",
          additionalInfo: "",
        });
      } else {
        const error = await response.json();
        toast.error(
          error.message || "Failed to submit request. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Blood
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Submit an urgent blood request and we'll notify available donors in
            your area immediately.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-semibold text-red-800 mb-1">
                Emergency Protocol
              </h3>
              <p className="text-sm text-red-700">
                For life-threatening emergencies, please call 911 immediately.
                This platform complements but does not replace emergency medical
                services.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blood Request Form</CardTitle>
            <CardDescription>
              Please provide detailed information to help us find suitable
              donors quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient & Hospital Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Hospital className="h-5 w-5 mr-2 text-red-600" />
                    Patient & Hospital Details
                  </h3>

                  <div>
                    <Label htmlFor="patientName">Patient Name *</Label>
                    <Input
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) =>
                        handleInputChange("patientName", e.target.value)
                      }
                      required
                      placeholder="Enter patient's full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hospitalName">Hospital Name *</Label>
                    <Input
                      id="hospitalName"
                      value={formData.hospitalName}
                      onChange={(e) =>
                        handleInputChange("hospitalName", e.target.value)
                      }
                      required
                      placeholder="Enter hospital name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        required
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group Required *</Label>
                      <Select
                        value={formData.bloodGroup}
                        onValueChange={(value: BloodGroup) =>
                          handleInputChange("bloodGroup", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(BLOOD_GROUP_LABELS).map(
                            ([key, label]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="unitsNeeded">Units Needed *</Label>
                      <Input
                        id="unitsNeeded"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.unitsNeeded}
                        onChange={(e) =>
                          handleInputChange("unitsNeeded", e.target.value)
                        }
                        required
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(value: UrgencyLevel) =>
                        handleInputChange("urgency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(URGENCY_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  URGENCY_COLORS[key as UrgencyLevel]
                                }`}
                              ></div>
                              {label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-red-600" />
                    Contact Information
                  </h3>

                  <div>
                    <Label htmlFor="contactName">Contact Person Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                      required
                      placeholder="Name of person to contact"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        handleInputChange("contactPhone", e.target.value)
                      }
                      required
                      placeholder="Phone number for immediate contact"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      required
                      placeholder="Email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">
                      Additional Information
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        handleInputChange("additionalInfo", e.target.value)
                      }
                      placeholder="Any additional details that might help donors..."
                      rows={4}
                    />
                  </div>

                  {/* Request Summary */}
                  {formData.bloodGroup && formData.urgency && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Request Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Blood Group:</span>
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-600"
                          >
                            {BLOOD_GROUP_LABELS[formData.bloodGroup]}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Urgency:</span>
                          <Badge
                            className={`text-white ${
                              formData.urgency === "CRITICAL"
                                ? "bg-red-500"
                                : formData.urgency === "HIGH"
                                ? "bg-orange-500"
                                : formData.urgency === "MEDIUM"
                                ? "bg-yellow-500"
                                : formData.urgency === "LOW"
                                ? "bg-green-500"
                                : ""
                            }`}
                          >
                            {URGENCY_LABELS[formData.urgency]}
                          </Badge>

                          {/* <span>{formData.urgency}</span> */}
                        </div>
                        {formData.unitsNeeded && (
                          <div className="flex justify-between">
                            <span>Units Needed:</span>
                            <span className="font-medium">
                              {formData.unitsNeeded}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting Request..." : "Submit Blood Request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-red-600" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Request Processing</h4>
                <p className="text-sm text-gray-600">
                  Your request is immediately processed and verified.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Donor Notification</h4>
                <p className="text-sm text-gray-600">
                  Compatible donors in your area are notified immediately.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Direct Contact</h4>
                <p className="text-sm text-gray-600">
                  Donors will contact you directly using the information
                  provided.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
