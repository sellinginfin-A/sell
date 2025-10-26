// FILE: src/app/components/home/FAQ.js
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "How does the purchase process work?",
    answer: "Simply choose your desired service and click 'Get Started'. You can purchase immediately without creating an account first. After payment, we'll help you set up your account and you can set your password on first login."
  },
  {
    id: 2,
    question: "Do I need to create an account before purchasing?",
    answer: "No! You can buy first and create your account after payment. This makes the process faster and smoother for you. We'll automatically create your account after purchase and send you login details."
  },
  {
    id: 3,
    question: "What happens after I make a purchase?",
    answer: "After successful payment, you'll receive an email with your account details and instructions. You can then set your password and access all your purchased content and services."
  },
  {
    id: 4,
    question: "How quickly can I access my purchased content?",
    answer: "Access is typically granted within minutes of successful payment. You'll receive an email with login instructions and can immediately start using your purchased services."
  },
  {
    id: 5,
    question: "What if I need help after purchasing?",
    answer: "We provide full support after purchase. You can contact us through your dashboard or via email, and we'll assist you with any questions or technical issues."
  },
  {
    id: 6,
    question: "Are the payments secure?",
    answer: "Yes! We use Stripe for secure payment processing. Your payment information is encrypted and never stored on our servers. All transactions are fully secure and protected."
  }
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-[#0f1729] text-white">
      <div className="content-container container-padding">
        <div className="text-center mb-12">
          <h2 className="text-section font-heading mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-body text-white/70 max-w-2xl mx-auto">
            Everything you need to know about our purchase process and services
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/5 overflow-hidden transition-all duration-200 hover:shadow-lg border border-white/10 hover:border-yellow-400/30"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <h3 className="font-semibold text-lg text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-white/60 transition-transform duration-200 ${
                    openItem === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openItem === faq.id
                    ? 'pb-4 opacity-100'
                    : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                <div className="border-t border-white/20 pt-4">
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/70 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:admin@infinitypotential.org"
            className="btn-primary text-button inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
