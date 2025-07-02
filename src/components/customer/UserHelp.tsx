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
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Help Center</h1>
        <p className="mt-2 text-gray-600 text-lg">
          Find answers to common questions and get the most from your fiber service.
        </p>
      </header>

      {/* Search */}
      <div className="bg-white p-5 rounded-2xl shadow-lg relative max-w-2xl mx-auto">
        <Search
          size={22}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search for help, FAQs, guides..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          aria-label="Search FAQs"
        />
      </div>

      {/* FAQ Categories */}
      {!searchQuery && (
        <nav
          aria-label="FAQ Categories"
          className="flex space-x-4 overflow-x-auto px-1 max-w-2xl mx-auto snap-x snap-mandatory scrollbar-hide"
        >
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`snap-center flex items-center gap-2 px-5 py-3 rounded-full
                text-sm font-semibold transition
                ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </nav>
      )}

      {/* FAQ List */}
      <section className="max-w-2xl mx-auto space-y-5">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(({ id, question, answer }) => {
            const isOpen = expandedQuestions[id];
            return (
              <article
                key={id}
                className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden
                  transition-shadow hover:shadow-md"
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => toggleQuestion(id)}
                  className="flex justify-between items-center w-full p-5 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <h3 className="text-lg font-medium text-gray-900 text-left">{question}</h3>
                  {isOpen ? (
                    <ChevronUp size={24} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-500" />
                  )}
                </button>
                <div
                  className={`px-5 pb-5 text-gray-700 text-base transition-max-height duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {isOpen && <p>{answer}</p>}
                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-16 max-w-sm mx-auto">
            <HelpCircle size={56} className="mx-auto text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              Try adjusting your search or browse through the categories.
            </p>
          </div>
        )}
      </section>

      {/* Contact Support */}
      <section className="max-w-2xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-blue-800">Still Need Help?</h2>
            <p className="text-blue-700 mt-1">
              Our support team is ready to assist you with any questions or issues.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = '/user/support')}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md
              transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserHelp;
