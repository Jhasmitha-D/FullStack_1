/**
 * Home page component for the Internship Finder Tool
 * Enhanced version with comprehensive filters matching the PDF design
 */
import { useState } from 'react';
import { Search, MapPin, Building2, Download, Briefcase, Filter } from 'lucide-react';
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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('Software Engineer');
  const [location, setLocation] = useState('Remote');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filters, setFilters] = useState({
    jobTypes: [] as string[],
    industries: [] as string[],
    experienceLevels: [] as string[],
    postedDate: '',
    minStipend: 0,
    maxStipend: 10000
  });

  const [internships, setInternships] = useState<Internship[]>([
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

  /**
   * Handle search submission with filters
   */
  const handleSearch = () => {
    setSearchPerformed(true);
    // Filter internships based on search term, location, and filters
    let results = internships.filter(internship => 
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) &&
      internship.location.toLowerCase().includes(location.toLowerCase())
    );

    // Apply filters
    if (filters.jobTypes.length > 0) {
      results = results.filter(internship => 
        filters.jobTypes.some(type => internship.jobType.includes(type))
      );
    }
    if (filters.industries.length > 0) {
      results = results.filter(internship => 
        filters.industries.includes(internship.industry)
      );
    }
    if (filters.experienceLevels.length > 0) {
      results = results.filter(internship => 
        filters.experienceLevels.includes(internship.experienceLevel)
      );
    }
    if (filters.postedDate) {
      const dateFilter = new Date();
      if (filters.postedDate === '7days') {
        dateFilter.setDate(dateFilter.getDate() - 7);
        results = results.filter(internship => 
          new Date(internship.postedDate) >= dateFilter
        );
      }
    }
    if (filters.minStipend > 0 || filters.maxStipend < 10000) {
      results = results.filter(internship => 
        internship.stipend >= filters.minStipend && internship.stipend <= filters.maxStipend
      );
    }

    setFilteredInternships(results);
  };

  /**
   * Handle data download
   */
  const handleDownload = () => {
    // In a real app, this would generate and download CSV
    console.log('Downloading data as CSV');
  };

  /**
   * Reset search and clear results
   */
  const handleReset = () => {
    setSearchPerformed(false);
    setSearchTerm('Software Engineer');
    setLocation('Remote');
    setFilters({
      jobTypes: [],
      industries: [],
      experienceLevels: [],
      postedDate: '',
      minStipend: 0,
      maxStipend: 10000
    });
    setFilteredInternships([]);
  };

  /**
   * Toggle filter selection
   */
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    if (category === 'jobTypes' || category === 'industries' || category === 'experienceLevels') {
      const currentFilters = filters[category] as string[];
      if (currentFilters.includes(value)) {
        setFilters(prev => ({
          ...prev,
          [category]: currentFilters.filter(item => item !== value)
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [category]: [...currentFilters, value]
        }));
      }
    } else if (category === 'postedDate') {
      setFilters(prev => ({
        ...prev,
        postedDate: prev.postedDate === value ? '' : value
      }));
    }
  };

  /**
   * Update stipend range
   */
  const updateStipendRange = (field: 'minStipend' | 'maxStipend', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    setFilters(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Internship Finder Tool
          </h1>
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Term
                </label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Software Engineer"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Remote"
                  className="w-full"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  START NEW SEARCH
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">LinkedIn Jobs:</span> https://www.linkedin.com/jobs/
            </div>
          </CardContent>
        </Card>

        {/* Results Section - Only shown after search */}
        {searchPerformed && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              {filteredInternships.length > 0 && (
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Data (.csv)
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg">
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Job Type Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
                      <div className="space-y-2">
                        {['Internship', 'New Grad', 'Student'].map(type => (
                          <Button
                            key={type}
                            variant="outline"
                            className={`w-full justify-start bg-transparent ${
                              filters.jobTypes.includes(type) 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleFilter('jobTypes', type)}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Industry Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Industry</h3>
                      <div className="space-y-2">
                        {['Data Science', 'Technology', 'Entertainment', 'Finance'].map(industry => (
                          <Button
                            key={industry}
                            variant="outline"
                            className={`w-full justify-start bg-transparent ${
                              filters.industries.includes(industry) 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleFilter('industries', industry)}
                          >
                            {industry}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Experience Level</h3>
                      <div className="space-y-2">
                        {['Entry', 'Intermediate', 'Senior'].map(level => (
                          <Button
                            key={level}
                            variant="outline"
                            className={`w-full justify-start bg-transparent ${
                              filters.experienceLevels.includes(level) 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleFilter('experienceLevels', level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Posted Date Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Posted Date</h3>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className={`w-full justify-start bg-transparent ${
                            filters.postedDate === '7days' 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleFilter('postedDate', '7days')}
                        >
                          Past 7 Days
                        </Button>
                      </div>
                    </div>

                    {/* Stipend Range Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Stipend Range</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 whitespace-nowrap">Min Stipend:</span>
                          <Input
                            type="number"
                            value={filters.minStipend}
                            onChange={(e) => updateStipendRange('minStipend', e.target.value)}
                            className="w-20"
                            placeholder="0"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 whitespace-nowrap">Max Stipend:</span>
                          <Input
                            type="number"
                            value={filters.maxStipend}
                            onChange={(e) => updateStipendRange('maxStipend', e.target.value)}
                            className="w-20"
                            placeholder="10000"
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
                      <Card key={internship.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              internship.isPaid 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
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
                  <Card className="shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Internships Found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or filters to find more opportunities.
                      </p>
                      <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        Reset Search
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Initial State - Before Search */}
        {!searchPerformed && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Find Your Next Opportunity?</h3>
              <p className="text-gray-600 mb-6">
                Enter your search criteria above and click "START NEW SEARCH" to discover internship opportunities that match your preferences.
              </p>
              <Button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Start Your Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}