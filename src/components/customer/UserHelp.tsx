import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  FileText,
  Video
} from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: <HelpCircle size={20} />,
    questions: [
      {
        id: 'what-is-fiber',
        question: 'What is fiber internet?',
        answer:
          'Fiber internet is a high-speed internet connection that uses fiber-optic cables to transmit data. These cables use light signals to transfer data, making them much faster and more reliable than traditional copper cables used in DSL or cable internet.'
      },
      {
        id: 'why-fiber',
        question: 'Why should I choose fiber over other internet types?',
        answer:
          'Fiber offers significantly faster speeds, more reliable connection, lower latency, and symmetric upload and download speeds. This makes it ideal for streaming, gaming, video conferencing, and homes with multiple connected devices.'
      },
      {
        id: 'fiber-availability',
        question: 'How do I know if fiber is available in my area?',
        answer:
          "You can check fiber availability in your area by using our Coverage Check tool. Simply enter your location details, and we'll show you which providers offer service in your area."
      },
      {
        id: 'fiber-speed',
        question: 'How fast is fiber internet?',
        answer:
          'Fiber internet in Tanzania typically offers speeds ranging from 10 Mbps to 1 Gbps (1000 Mbps), depending on the provider and package you choose.'
      }
    ]
  },
  {
    id: 'installation',
    name: 'Installation',
    icon: <FileText size={20} />,
    questions: [
      {
        id: 'installation-process',
        question: 'What is the installation process like?',
        answer:
          'The installation process typically involves a technician visiting your home to run fiber cable from the nearest connection point to your premises. They will then set up the necessary equipment including an ONT and a router.'
      },
      {
        id: 'installation-cost',
        question: 'Is there a cost for installation?',
        answer:
          'Installation fees vary by provider. Some offer free installation with a contract commitment, others charge a one-time fee ranging from 50,000 to 150,000 TZS.'
      },
      {
        id: 'installation-requirements',
        question: 'What do I need to prepare for installation?',
        answer:
          'Ensure someone 18 or older is home, clear access to where equipment will go, and choose where your router should be placed.'
      },
      {
        id: 'installation-time',
        question: 'How long will I have to wait for installation?',
        answer:
          'Installations are typically scheduled within 5–10 business days. Expedited installation may be available for an extra fee.'
      }
    ]
  },
  {
    id: 'billing',
    name: 'Billing & Plans',
    icon: <BookOpen size={20} />,
    questions: [
      {
        id: 'payment-methods',
        question: 'What payment methods are accepted?',
        answer:
          'Most providers accept mobile money (M-Pesa, Tigo Pesa, Airtel Money), bank transfers, cards, and some have physical payment centers.'
      },
      {
        id: 'plan-change',
        question: 'Can I change my plan later?',
        answer:
          'Yes, most providers allow plan changes. Upgrades may be instant, while downgrades may take effect at the next billing cycle.'
      },
      {
        id: 'contract-length',
        question: 'Are there long-term contracts?',
        answer:
          'Contract terms vary. Some offer month-to-month, others 12–24 months. Longer terms may include discounts or free installation.'
      },
      {
        id: 'billing-cycle',
        question: 'When will I be billed?',
        answer:
          'Billing is usually monthly, either based on your installation date or on a fixed monthly date. Prepaid and postpaid options exist.'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Support',
    icon: <Video size={20} />,
    questions: [
      {
        id: 'internet-slow',
        question: 'Why is my internet slow?',
        answer:
          'Possible causes include too many devices, Wi-Fi interference, or congestion. Restart your router, use Ethernet, or contact support.'
      },
      {
        id: 'connection-drops',
        question: 'Why does my connection keep dropping?',
        answer:
          'Frequent drops may indicate equipment issues, interference, or outages. Restart devices, check cables, and call support if needed.'
      },
      {
        id: 'router-setup',
        question: 'How do I set up or reset my router?',
        answer:
          'Press and hold the reset button for 10–15 seconds. Connect to the default network, then access the router via 192.168.1.1.'
      },
      {
        id: 'speed-test',
        question: 'How can I test my internet speed?',
        answer:
          'Use speedtest.net or fast.com. For accurate results, connect directly via Ethernet and close other devices/apps.'
      }
    ]
  }
];




  

export const UserHelp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const filteredQuestions = searchQuery
    ? faqCategories.flatMap(category =>
        category.questions.filter(
          q =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : faqCategories.find(c => c.id === activeCategory)?.questions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Help Center</h1>
        <p className="text-gray-600 mt-1">
          Find answers to common questions and get the most from your fiber service.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for help, FAQs, guides..."
          />
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        {!searchQuery && (
          <div className="flex overflow-x-auto space-x-2 pb-2 mb-4">
            {faqCategories.map(category => (
              <button
                key={category.id}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(item => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <div
                  className="p-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                  onClick={() => toggleQuestion(item.id)}
                >
                  <h3 className="font-medium">{item.question}</h3>
                  {expandedQuestions[item.id] ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
                {expandedQuestions[item.id] && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <HelpCircle size={48} className="mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or browse through the categories.</p>
            </div>
          )}
        </div>
      </div>

     

      

      {/* Still Need Help? */}
      <div className="bg-blue-50 p-6 rounded-lg shadow border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-blue-800">Still Need Help?</h2>
            <p className="text-blue-600 mt-1">
              Our support team is ready to assist you with any questions or issues.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => (window.location.href = '/user/support')}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHelp;
