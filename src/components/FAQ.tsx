import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQProps = {
  onRegisterClick: () => void;
};

export function FAQ({ onRegisterClick }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does FiberConnect Tanzania work?',
      answer:
        'FiberConnect Tanzania is a platform that helps you compare fiber internet providers in Tanzania. You can search for providers in your area, compare plans and prices, and request service directly through our platform. We handle the communication with providers to make the process easier for you.',
    },
    {
      question: 'Is FiberConnect free to use?',
      answer:
        'Yes, FiberConnect is completely free for users. We earn commissions from providers when you sign up through our platform, which allows us to offer this service at no cost to you.',
    },
    {
      question: 'Which fiber internet providers do you work with?',
      answer:
        'We work with all major fiber providers in Tanzania, including Zuku, TTCL, SimbaNet, YAS Fiber, Savannah, Liquid Telecom, and more. Our goal is to give you comprehensive options for your location.',
    },
    {
      question: 'How do I know if fiber internet is available in my area?',
      answer:
        "Simply enter your address or location in our search tool, and we'll show you all the fiber providers that service your area. If fiber isn't available yet, we can also show you alternative internet options.",
    },
    {
      question: 'How long does installation take after I request service?',
      answer:
        "Installation times vary by provider, but typically range from 3–14 business days. When you select a plan, we'll provide you with the estimated installation timeline for that specific provider.",
    },
    {
      question: "Can FiberConnect help me if I'm having issues with my current provider?",
      answer:
        'While our primary service is helping you find and subscribe to new internet service, we do offer support resources and can sometimes help mediate issues with providers we work with. Contact our support team for assistance.',
    },
  ];

  return (
    <section className="py-20 bg-gray-100" id="faq">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about FiberConnect Tanzania and fiber internet services.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b last:border-b-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 focus:outline-none hover:bg-gray-50 transition duration-200"
                >
                  <span className="text-left text-gray-900 font-medium text-lg">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-300" />
                  )}
                </button>

                <div
                  className={`px-6 pb-5 text-gray-600 text-base transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Still have questions? Contact our support team.</p>
          <button
            onClick={onRegisterClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition shadow-md"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
