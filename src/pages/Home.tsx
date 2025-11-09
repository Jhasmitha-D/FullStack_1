'use client';

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../components/ui/ProfileDropdown';
import { Search, MapPin, Download, Briefcase, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface Internship {
  id: string;
  company: string;
  position: string;
  location: string;
  isPaid: boolean;
  isRemote: boolean;
  logo: string;
  jobType: string[];
  industry: string;
  experienceLevel: string;
  postedDate: string;
  stipend: number;
  description: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  loginTime: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('Software Engineer');
  const [location, setLocation] = useState('Remote');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [filters, setFilters] = useState({
    jobTypes: [] as string[],
    industries: [] as string[],
    experienceLevels: [] as string[],
    postedDate: '',
    minStipend: 0,
    maxStipend: 10000,
  });

  const [stipendInputs, setStipendInputs] = useState({
    min: '0',
    max: '10000',
  });

  const [internships] = useState<Internship[]>([
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineer Intern',
      location: 'Remote',
      isPaid: true,
      isRemote: true,
      logo: 'https://pub-cdn.sider.ai/u/U07GH6KO45A/web-coder/68fce2e8584c7e7f6065f73a/resource/4777014e-c3ce-4f9a-846f-4a079875b14f.jpg',
      jobType: ['Internship'],
      industry: 'Technology',
      experienceLevel: 'Entry',
      postedDate: '2024-10-20',
      stipend: 8000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: '2',
      company: 'Meta',
      position: 'Software Engineer Intern',
      location: 'Remote',
      isPaid: true,
      isRemote: true,
      logo: 'https://pub-cdn.sider.ai/u/U07GH6KO45A/web-coder/68fce2e8584c7e7f6065f73a/resource/5d548313-af75-40f2-a5f9-a73d352c133a.jpg',
      jobType: ['Internship'],
      industry: 'Technology',
      experienceLevel: 'Entry',
      postedDate: '2024-10-22',
      stipend: 7500,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    {
      id: '3',
      company: 'Microsoft',
      position: 'Software Engineer Intern',
      location: 'Remote',
      isPaid: true,
      isRemote: true,
      logo: 'https://pub-cdn.sider.ai/u/U07GH6KO45A/web-coder/68fce2e8584c7e7f6065f73a/resource/8ff9344e-f912-4112-a5d9-93e242112940.jpg',
      jobType: ['Internship'],
      industry: 'Technology',
      experienceLevel: 'Entry',
      postedDate: '2024-10-18',
      stipend: 7000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.'
    },
    {
      id: '4',
      company: 'Amazon',
      position: 'Software Engineer Intern',
      location: 'Remote',
      isPaid: true,
      isRemote: true,
      logo: 'https://pub-cdn.sider.ai/u/U07GH6KO45A/web-coder/68fce2e8584c7e7f6065f73a/resource/67ec6a01-e7cf-4e62-a4e2-431a08d254c1.jpg',
      jobType: ['Internship', 'Student'],
      industry: 'Technology',
      experienceLevel: 'Entry',
      postedDate: '2024-10-15',
      stipend: 6500,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.'
    },
    {
      id: '5',
      company: 'Apple',
      position: 'Software Engineer Intern',
      location: 'Remote',
      isPaid: true,
      isRemote: true,
      logo: 'https://pub-cdn.sider.ai/u/U07GH6KO45A/web-coder/68fce2e8584c7e7f6065f73a/resource/77b24c4c-8bde-4c0d-b900-dd95668ca90e.jpg',
      jobType: ['Internship'],
      industry: 'Technology',
      experienceLevel: 'Entry',
      postedDate: '2024-10-25',
      stipend: 8500,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: '6',
      company: 'Netflix',
      position: 'Software Engineer Intern',
      location: 'Remote',
      isPaid: true,
      isRemote: true,
      logo: 'https://pub-cdn.sider.ai/u/U07GH6KO45A/web-coder/68fce2e8584c7e7f6065f73a/resource/ed0d507b-1f67-40a4-b2e3-f1e3cc9b1433.jpg',
      jobType: ['Internship'],
      industry: 'Entertainment',
      experienceLevel: 'Entry',
      postedDate: '2024-10-23',
      stipend: 9000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.'
    }
  ]);

  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);

  // Check authentication
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (err) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.reload();
  };

  // Apply stipend inputs to filters
  const applyStipendInputs = () => {
    const min = Math.max(0, parseInt(stipendInputs.min || '0', 10) || 0);
    const maxRaw = parseInt(stipendInputs.max || '10000', 10) || 10000;
    const max = Math.max(min, maxRaw);
    setFilters(prev => ({ ...prev, minStipend: min, maxStipend: max }));
    setStipendInputs(prev => ({ ...prev, min: min.toString(), max: max.toString() }));
  };

  // Update stipend input (only digits)
  const updateStipendInput = (field: 'min' | 'max', value: string) => {
    const sanitized = value.replace(/[^\d]/g, '');
    setStipendInputs(prev => ({ ...prev, [field]: sanitized }));
  };

  // Toggle filter
  const toggleFilter = (category: 'jobTypes' | 'industries' | 'experienceLevels' | 'postedDate', value: string) => {
    if (category === 'postedDate') {
      setFilters(prev => ({
        ...prev,
        postedDate: prev.postedDate === value ? '' : value,
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      }));
    }
  };

  // Perform search
  const performSearch = useCallback(() => {
    let results = internships.filter(internship =>
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) &&
      internship.location.toLowerCase().includes(location.toLowerCase())
    );

    if (filters.jobTypes.length > 0) {
      results = results.filter(i => filters.jobTypes.some(t => i.jobType.includes(t)));
    }
    if (filters.industries.length > 0) {
      results = results.filter(i => filters.industries.includes(i.industry));
    }
    if (filters.experienceLevels.length > 0) {
      results = results.filter(i => filters.experienceLevels.includes(i.experienceLevel));
    }
    if (filters.postedDate) {
      const now = Date.now();
      let cutoff = now;
      switch (filters.postedDate) {
        case '24hrs': cutoff -= 24 * 60 * 60 * 1000; break;
        case '3days': cutoff -= 3 * 24 * 60 * 60 * 1000; break;
        case '7days': cutoff -= 7 * 24 * 60 * 60 * 1000; break;
        case '30days': cutoff -= 30 * 24 * 60 * 60 * 1000; break;
        case 'gt30days': cutoff -= 30 * 24 * 60 * 60 * 1000; break;
      }
      results = results.filter(i =>
        filters.postedDate === 'gt30days'
          ? new Date(i.postedDate).getTime() < cutoff
          : new Date(i.postedDate).getTime() >= cutoff
      );
    }

    results = results.filter(i => i.stipend >= filters.minStipend && i.stipend <= filters.maxStipend);

    setFilteredInternships(results);
  }, [internships, searchTerm, location, filters]);

  // Re-run search when dependencies change
  useEffect(() => {
    if (searchPerformed) {
      performSearch();
    }
  }, [performSearch, searchPerformed]);

  const handleSearch = () => {
    applyStipendInputs();
    performSearch();
    setSearchPerformed(true);
  };

  const handleReset = () => {
    setSearchTerm('Software Engineer');
    setLocation('Remote');
    setFilters({
      jobTypes: [],
      industries: [],
      experienceLevels: [],
      postedDate: '',
      minStipend: 0,
      maxStipend: 10000,
    });
    setStipendInputs({ min: '0', max: '10000' });
    setFilteredInternships([]);
    setSearchPerformed(false);
  };

  const handleDownload = () => {
    const headers = ['Company', 'Position', 'Location', 'Stipend', 'Posted Date', 'Industry', 'Description'];
    const rows = filteredInternships.map(i => [
      i.company,
      i.position,
      i.location,
      i.stipend,
      i.postedDate,
      i.industry,
      `"${i.description.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'internships.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Internship Finder Tool
              </h1>
              <p className="text-gray-600">Discover your next career opportunity</p>
            </div>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <ProfileDropdown user={currentUser} onLogout={handleLogout} />
              ) : (
                <div className="flex gap-4">
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign In</Link>
                  <span className="text-gray-400">|</span>
                  <Link to="/signup" className="text-green-600 hover:text-green-800 font-medium">Create Account</Link>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Term</label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Remote"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                    START NEW SEARCH
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">LinkedIn Jobs:</span>{' '}
                <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://www.linkedin.com/jobs/
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {searchPerformed && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results ({filteredInternships.length})
                </h2>
                {filteredInternships.length > 0 && (
                  <Button onClick={handleDownload} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="shadow-lg sticky top-4">
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Job Type */}
                      <div>
                        <h3 className="font-medium mb-3">Job Type</h3>
                        {['Internship', 'New Grad', 'Student'].map(type => (
                          <Button
                            key={type}
                            variant="outline"
                            className={`w-full justify-start mb-2 ${filters.jobTypes.includes(type) ? 'bg-blue-600 text-white border-blue-600' : ''}`}
                            onClick={() => toggleFilter('jobTypes', type)}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>

                      {/* Industry */}
                      <div>
                        <h3 className="font-medium mb-3">Industry</h3>
                        {['Technology', 'Entertainment', 'Finance', 'Data Science'].map(ind => (
                          <Button
                            key={ind}
                            variant="outline"
                            className={`w-full justify-start mb-2 ${filters.industries.includes(ind) ? 'bg-blue-600 text-white border-blue-600' : ''}`}
                            onClick={() => toggleFilter('industries', ind)}
                          >
                            {ind}
                          </Button>
                        ))}
                      </div>

                      {/* Experience Level */}
                      <div>
                        <h3 className="font-medium mb-3">Experience Level</h3>
                        {['Entry', 'Intermediate', 'Senior'].map(level => (
                          <Button
                            key={level}
                            variant="outline"
                            className={`w-full justify-start mb-2 ${filters.experienceLevels.includes(level) ? 'bg-blue-600 text-white border-blue-600' : ''}`}
                            onClick={() => toggleFilter('experienceLevels', level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>

                      {/* Posted Date */}
                      <div>
                        <h3 className="font-medium mb-3">Posted Date</h3>
                        {[
                          { value: '24hrs', label: 'Last 24 Hours' },
                          { value: '3days', label: 'Last 3 Days' },
                          { value: '7days', label: 'Last 7 Days' },
                          { value: '30days', label: 'Last 30 Days' },
                          { value: 'gt30days', label: 'Older than 30 Days' },
                        ].map(opt => (
                          <Button
                            key={opt.value}
                            variant="outline"
                            className={`w-full justify-start mb-2 ${filters.postedDate === opt.value ? 'bg-blue-600 text-white border-blue-600' : ''}`}
                            onClick={() => toggleFilter('postedDate', opt.value)}
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </div>

                      {/* Stipend - SINGLE HEADING + TWO INPUTS */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Stipend</h3>
                        <div className="space-y-4">

                          {/* MIN STIPEND */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-16">Min:</span>
                            <Input
                              type="text"
                              inputMode="numeric"
                              value={stipendInputs.min}
                              onChange={(e) => updateStipendInput('min', e.target.value)}
                              onBlur={applyStipendInputs}
                              placeholder="0"
                              className="w-full max-w-xs"
                            />
                          </div>

                          {/* MAX STIPEND */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-16">Max:</span>
                            <Input
                              type="text"
                              inputMode="numeric"
                              value={stipendInputs.max}
                              onChange={(e) => updateStipendInput('max', e.target.value)}
                              onBlur={applyStipendInputs}
                              placeholder="10000"
                              className="w-full max-w-xs"
                            />
                          </div>

                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </div>

                {/* Results Grid */}
                <div className="lg:col-span-3">
                  {filteredInternships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredInternships.map(internship => (
                        <Card key={internship.id} className="shadow-lg hover:shadow-xl transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={internship.logo}
                                alt={internship.company}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <CardTitle className="text-lg">{internship.company}</CardTitle>
                                <p className="text-sm text-gray-600">{internship.position}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{internship.location}</span>
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${internship.isPaid ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {internship.isPaid ? 'Paid' : 'Unpaid'}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-3">
                              {internship.description}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>Posted: {new Date(internship.postedDate).toLocaleDateString()}</span>
                              <span>${internship.stipend}/month</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center">
                      <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Internships Found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or filters.
                      </p>
                      <Button onClick={handleReset} variant="outline" className="border-blue-600 text-blue-600">
                        Reset All Filters
                      </Button>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Initial State */}
          {!searchPerformed && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Find Internships?</h3>
                <p className="text-gray-600 mb-6">
                  Enter your preferences and click search to get started.
                </p>
                <Button onClick={handleSearch} className="bg-blue-600">
                  <Search className="w-4 h-4 mr-2" />
                  Start Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}