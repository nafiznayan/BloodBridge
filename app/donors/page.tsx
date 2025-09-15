'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Mail, Calendar, Filter, Users } from 'lucide-react';
import { BLOOD_GROUP_LABELS, type BloodGroup, type Donor } from '@/lib/types';
import { format } from 'date-fns';

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    bloodGroup: '' as BloodGroup | '',
    city: '',
    state: '',
    available: 'all',
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [donors, filters]);

  const fetchDonors = async () => {
    try {
      const response = await fetch('/api/donors');
      if (response.ok) {
        const data = await response.json();
        setDonors(data);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = donors;

    if (filters.bloodGroup) {
      filtered = filtered.filter(donor => donor.bloodGroup === filters.bloodGroup);
    }

    if (filters.city) {
      filtered = filtered.filter(donor => 
        donor.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.state) {
      filtered = filtered.filter(donor => 
        donor.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.available !== 'all') {
      filtered = filtered.filter(donor => 
        filters.available === 'true' ? donor.available : !donor.available
      );
    }

    setFilteredDonors(filtered);
  };

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      bloodGroup: '',
      city: '',
      state: '',
      available: 'all',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading donors...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Blood Donors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search our network of verified blood donors. Contact them directly for urgent blood needs.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-red-600" />
              Search Filters
            </CardTitle>
            <CardDescription>
              Use filters to find donors that match your specific requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select 
                  value={filters.bloodGroup} 
                 onValueChange={(value: BloodGroup | 'all') => handleFilterChange('bloodGroup', value === 'all' ? '' : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All blood groups" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All blood groups</SelectItem>
                    {Object.entries(BLOOD_GROUP_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Enter city name"
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={filters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  placeholder="Enter state name"
                />
              </div>

              <div>
                <Label htmlFor="available">Availability</Label>
                <Select 
                  value={filters.available} 
                  onValueChange={(value) => handleFilterChange('available', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All donors</SelectItem>
                    <SelectItem value="true">Available only</SelectItem>
                    <SelectItem value="false">Unavailable only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {filteredDonors.length} donors found
              </div>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Donors Grid */}
        {filteredDonors.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No donors found</h3>
              <p className="text-gray-600">
                Try adjusting your search filters or check back later for new donors.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{donor.name}</CardTitle>
                    <Badge 
                      variant={donor.available ? "default" : "secondary"}
                      className={donor.available ? "bg-green-100 text-green-800" : ""}
                    >
                      {donor.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      {BLOOD_GROUP_LABELS[donor.bloodGroup]}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Age: {donor.age}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-red-600" />
                    <span>{donor.city}, {donor.state}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-red-600" />
                    <span>{donor.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-red-600" />
                    <span className="truncate">{donor.email}</span>
                  </div>

                  {donor.lastDonationDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-red-600" />
                      <span>Last donated: {format(new Date(donor.lastDonationDate), 'MMM dd, yyyy')}</span>
                    </div>
                  )}

                  <div className="pt-3 space-y-2">
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700" 
                      onClick={() => window.open(`tel:${donor.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Donor
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open(`mailto:${donor.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}