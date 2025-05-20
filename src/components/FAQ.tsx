import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [{
    question: 'How does FiberConnect Tanzania work?',
    answer: 'FiberConnect Tanzania is a platform that helps you compare fiber internet providers in Tanzania. You can search for providers in your area, compare plans and prices, and request service directly through our platform. We handle the communication with providers to make the process easier for you.'
  }, {
    question: 'Is FiberConnect free to use?',
    answer: 'Yes, FiberConnect is completely free for users. We earn commissions from providers when you sign up through our platform, which allows us to offer this service at no cost to you.'
  }, {
    question: 'Which fiber internet providers do you work with?',
    answer: 'We work with all major fiber providers in Tanzania, including Zuku, TTCL, SimbaNet, YAS Fiber, Savannah, Liquid Telecom, and more. Our goal is to give you comprehensive options for your location.'
  }, {
    question: 'How do I know if fiber internet is available in my area?',
    answer: "Simply enter your address or location in our search tool, and we'll show you all the fiber providers that service your area. If fiber isn't available yet, we can also show you alternative internet options."
  }, {
    question: 'How long does installation take after I request service?',
    answer: "Installation times vary by provider, but typically range from 3-14 business days. When you select a plan, we'll provide you with the estimated installation timeline for that specific provider."
  }, {
    question: "Can FiberConnect help me if I'm having issues with my current provider?",
    answer: 'While our primary service is helping you find and subscribe to new internet service, we do offer support resources and can sometimes help mediate issues with providers we work with. Contact our support team for assistance.'
  }];
  return <section className="py-16 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about FiberConnect Tanzania and
            fiber internet services.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {faqs.map((faq, index) => <div key={index} className="p-6">
              <button onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                {openIndex === index ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </button>
              {openIndex === index && <div className="mt-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>}
            </div>)}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Contact our support team.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Contact Support
          </button>
        </div>
      </div>
    </section>;
}