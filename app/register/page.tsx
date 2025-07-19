'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Heart, User, Mail, Phone, MapPin, Weight, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { BLOOD_GROUP_LABELS, type BloodGroup } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const { donor } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: '' as BloodGroup,
    city: '',
    state: '',
    age: '',
    weight: '',
    lastDonationDate: '',
    medicalConditions: '',
    available: true,
    terms: false,
  });

  // Redirect if already logged in
  useEffect(() => {
    if (donor) {
      router.push('/dashboard');
    }
  }, [donor, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          weight: parseInt(formData.weight),
          lastDonationDate: formData.lastDonationDate ? new Date(formData.lastDonationDate) : null,
        }),
      });

      if (response.ok) {
        toast.success('Registration successful! Welcome to BloodBridge.');
        router.push('/donors');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Don't render if already logged in
  if (donor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white fill-current" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Blood Donor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of life-savers. Your registration helps us connect you with 
            those in urgent need of blood donations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Donor Registration</CardTitle>
            <CardDescription>
              Please fill out all required information to register as a blood donor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="h-5 w-5 mr-2 text-red-600" />
                    Personal Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      placeholder="Create a secure password"
                      minLength={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="18"
                        max="65"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        required
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        min="50"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        required
                        placeholder="Weight"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical & Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-red-600" />
                    Location & Medical Details
                  </h3>

                  <div>
                    <Label htmlFor="bloodGroup">Blood Group *</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value: BloodGroup) => handleInputChange('bloodGroup', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(BLOOD_GROUP_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lastDonationDate">Last Donation Date (Optional)</Label>
                    <Input
                      id="lastDonationDate"
                      type="date"
                      value={formData.lastDonationDate}
                      onChange={(e) => handleInputChange('lastDonationDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="medicalConditions">Medical Conditions (Optional)</Label>
                    <Textarea
                      id="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                      placeholder="Any medical conditions or medications..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => handleInputChange('available', checked)}
                  />
                  <Label htmlFor="available" className="text-sm">
                    I am currently available to donate blood
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => handleInputChange('terms', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and consent to sharing my contact 
                    information with those in need of blood donations *
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register as Donor'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}