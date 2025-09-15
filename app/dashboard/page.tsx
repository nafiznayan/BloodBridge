"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  Save,
  Plus,
  History,
  Activity,
  LogOut,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  BLOOD_GROUP_LABELS,
  type BloodGroup,
  type Donor,
  type DonationHistory,
} from "@/lib/types";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const router = useRouter();
  const {
    donor: authDonor,
    isLoading: authLoading,
    logout: authLogout,
    updateDonor,
  } = useAuth();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingDonation, setIsAddingDonation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    bloodGroup: "" as BloodGroup,
    city: "",
    state: "",
    age: "",
    weight: "",
    available: true,
    medicalConditions: "",
  });

  const [donationForm, setDonationForm] = useState({
    donationDate: "",
    location: "",
    bloodBank: "",
    unitsGiven: "1",
    notes: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !authDonor) {
      router.push("/login");
      return;
    }

    if (authDonor) {
      setDonor(authDonor);
      setEditForm({
        name: authDonor.name,
        phone: authDonor.phone,
        bloodGroup: authDonor.bloodGroup,
        city: authDonor.city,
        state: authDonor.state,
        age: authDonor.age.toString(),
        weight: authDonor.weight.toString(),
        available: authDonor.available,
        medicalConditions: authDonor.medicalConditions || "",
      });
      fetchDonationHistory();
      setIsLoading(false);
    }
  }, [authDonor, authLoading, router]);

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDonor(data);
        updateDonor(data); // Update auth context
        setEditForm({
          name: data.name,
          phone: data.phone,
          bloodGroup: data.bloodGroup,
          city: data.city,
          state: data.state,
          age: data.age.toString(),
          weight: data.weight.toString(),
          available: data.available,
          medicalConditions: data.medicalConditions || "",
        });
      } else if (response.status === 401) {
        authLogout();
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  }, [updateDonor, authLogout, router]);

  const fetchDonationHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/donation-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDonationHistory(data);
      }
    } catch (error) {
      console.error("Error fetching donation history:", error);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editForm,
          age: parseInt(editForm.age),
          weight: parseInt(editForm.weight),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDonor(data.donor);
        updateDonor(data.donor); // Update auth context
        setIsEditing(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDonation = async () => {
    setIsAddingDonation(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/donation-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...donationForm,
          unitsGiven: parseInt(donationForm.unitsGiven),
        }),
      });

      if (response.ok) {
        toast.success("Donation history added successfully");
        setDonationForm({
          donationDate: "",
          location: "",
          bloodBank: "",
          unitsGiven: "1",
          notes: "",
        });
        fetchDonationHistory();
        await fetchProfile(); // Refresh to update last donation date
      } else {
        toast.error("Failed to add donation history");
      }
    } catch (error) {
      toast.error("An error occurred while adding donation");
    } finally {
      setIsAddingDonation(false);
    }
  };

  const handleLogout = () => {
    authLogout();
    router.push("/");
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Account deleted successfully");
        authLogout();
        router.push("/");
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error) {
      toast.error("An error occurred while deleting account");
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!authDonor || !donor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {donor.name}!
            </h1>
            <p className="text-gray-600">
              Manage your donor profile and donation history
            </p>
          </div>
          <div className="flex space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete your account? This action
                    cannot be undone. All your profile information and donation
                    history will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Management</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Blood Group
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {BLOOD_GROUP_LABELS[donor.bloodGroup]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Status
                      </p>
                      <Badge
                        variant={donor.available ? "default" : "secondary"}
                        className={
                          donor.available ? "bg-green-100 text-green-800" : ""
                        }
                      >
                        {donor.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Last Donation
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {donor.lastDonationDate
                          ? format(
                              new Date(donor.lastDonationDate),
                              "MMM dd, yyyy"
                            )
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-red-600" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      {isEditing
                        ? "Update your personal information"
                        : "Your current profile details"}
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={
                      isEditing ? handleSaveProfile : () => setIsEditing(true)
                    }
                    disabled={isSaving}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{donor.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <p className="mt-1 text-sm text-gray-900">{donor.email}</p>
                    <p className="text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {donor.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    {isEditing ? (
                      <Select
                        value={editForm.bloodGroup}
                        onValueChange={(value: BloodGroup) =>
                          setEditForm((prev) => ({
                            ...prev,
                            bloodGroup: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {BLOOD_GROUP_LABELS[donor.bloodGroup]}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={editForm.city}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{donor.city}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    {isEditing ? (
                      <Input
                        id="state"
                        value={editForm.state}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {donor.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="age">Age</Label>
                    {isEditing ? (
                      <Input
                        id="age"
                        type="number"
                        value={editForm.age}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {donor.age} years
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    {isEditing ? (
                      <Input
                        id="weight"
                        type="number"
                        value={editForm.weight}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            weight: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {donor.weight} kg
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="available">Availability Status</Label>
                    {isEditing ? (
                      <div className="flex items-center space-x-2 mt-2">
                        <Switch
                          id="available"
                          checked={editForm.available}
                          onCheckedChange={(checked) =>
                            setEditForm((prev) => ({
                              ...prev,
                              available: checked,
                            }))
                          }
                        />
                        <Label htmlFor="available" className="text-sm">
                          {editForm.available
                            ? "Available for donation"
                            : "Not available for donation"}
                        </Label>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <Badge
                          variant={donor.available ? "default" : "secondary"}
                          className={
                            donor.available ? "bg-green-100 text-green-800" : ""
                          }
                        >
                          {donor.available
                            ? "Available for donation"
                            : "Not available for donation"}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="medicalConditions">
                      Medical Conditions
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="medicalConditions"
                        value={editForm.medicalConditions}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            medicalConditions: e.target.value,
                          }))
                        }
                        placeholder="Any medical conditions or medications..."
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">
                        {donor.medicalConditions || "None specified"}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Add New Donation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-red-600" />
                  Add Donation Record
                </CardTitle>
                <CardDescription>
                  Record a new blood donation to keep your history up to date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="donationDate">Donation Date</Label>
                    <Input
                      id="donationDate"
                      type="date"
                      value={donationForm.donationDate}
                      onChange={(e) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          donationDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={donationForm.location}
                      onChange={(e) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="Hospital or blood bank name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bloodBank">Blood Bank (Optional)</Label>
                    <Input
                      id="bloodBank"
                      value={donationForm.bloodBank}
                      onChange={(e) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          bloodBank: e.target.value,
                        }))
                      }
                      placeholder="Blood bank organization"
                    />
                  </div>

                  <div>
                    <Label htmlFor="unitsGiven">Units Given</Label>
                    <Select
                      value={donationForm.unitsGiven}
                      onValueChange={(value) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          unitsGiven: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Unit</SelectItem>
                        <SelectItem value="2">2 Units</SelectItem>
                        <SelectItem value="3">3 Units</SelectItem>
                        <SelectItem value="4">4 Units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={donationForm.notes}
                      onChange={(e) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Any additional notes about the donation..."
                      rows={2}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={handleAddDonation}
                    disabled={
                      isAddingDonation ||
                      !donationForm.donationDate ||
                      !donationForm.location
                    }
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {isAddingDonation ? "Adding..." : "Add Donation Record"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2 text-red-600" />
                  Donation History
                </CardTitle>
                <CardDescription>
                  Your complete blood donation history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {donationHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No donation history
                    </h3>
                    <p className="text-gray-600">
                      Add your first donation record to start tracking your
                      contribution history.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {donationHistory.map((donation) => (
                      <div
                        key={donation.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge
                                variant="outline"
                                className="text-red-600 border-red-600"
                              >
                                {donation.unitsGiven} Unit
                                {donation.unitsGiven > 1 ? "s" : ""}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {format(
                                  new Date(donation.donationDate),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {donation.location}
                            </div>
                            {donation.bloodBank && (
                              <div className="text-sm text-gray-600 mb-1">
                                Blood Bank: {donation.bloodBank}
                              </div>
                            )}
                            {donation.notes && (
                              <div className="text-sm text-gray-600">
                                Notes: {donation.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
