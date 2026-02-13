'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is paracord?',
    answer: 'Paracord, also known as 550 cord, is a lightweight nylon rope originally used in parachute suspension lines. It has a breaking strength of 550 pounds and is known for its durability, flexibility, and resistance to mildew and UV damage. It\'s the same material trusted by the military for decades.',
  },
  {
    question: 'How long does it take to receive my order?',
    answer: 'All of our products are handmade to order. Please allow 5-7 business days for your order to be crafted, plus 3-5 business days for shipping via USPS Ground Advantage. During busy seasons, processing may take a bit longer.',
  },
  {
    question: 'What are the primary and secondary colors?',
    answer: 'The primary color runs down the center of the paracord braid and is the most visible. The secondary color runs along the sides and inside of the braid, creating a two-tone effect. You can choose the same color for both if you prefer a solid look.',
  },
  {
    question: 'Can I request a custom color not listed?',
    answer: 'Yes! We have access to many paracord colors. If you don\'t see the color you want, select "Custom" from the dropdown and enter your desired color. You can also message us directly to confirm availability before ordering.',
  },
  {
    question: 'Can I get a custom length?',
    answer: 'Absolutely! Our products come in standard lengths, but we can customize the length to fit your specific vehicle or needs. Just leave a note with your order or contact us before purchasing to discuss your requirements.',
  },
  {
    question: 'Will these fit my vehicle?',
    answer: 'Most of our grab handles are designed to be universal and fit a wide variety of trucks, Jeeps, and SUVs. Headrest handles attach to standard headrest posts, and roof rack handles work with Prinsu Roof Rack Channel or similar. If you\'re unsure about fitment, send us a message with your vehicle details and we\'ll help you out.',
  },
  {
    question: 'How strong are the handles?',
    answer: 'Our handles are made from 550 paracord with a breaking strength of 550 pounds per strand. Combined with our braiding technique, they can safely support significant weight. They\'re designed to help with vehicle entry/exit and accessing roof-mounted gear.',
  },
  {
    question: 'Are the handles weather resistant?',
    answer: 'Yes! Paracord is naturally resistant to mildew, rot, and UV damage. Our handles are built to withstand all weather conditions - rain, sun, snow, and extreme temperatures. They\'re made for the off-road lifestyle.',
  },
  {
    question: 'Do you offer refunds or returns?',
    answer: 'We offer a 30-day return policy for unused items in original condition. Since all products are custom-made to your specifications, we cannot accept returns on custom orders unless there is a defect. If you receive a defective item, contact us immediately and we\'ll make it right.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within the United States. If you\'re located internationally and interested in our products, please contact us and we\'ll do our best to accommodate your request.',
  },
  {
    question: 'How do I care for my paracord products?',
    answer: 'Paracord is low-maintenance! If your handles get dirty, simply wipe them down with a damp cloth or rinse with water. Allow them to air dry. Avoid harsh chemicals or bleach. With proper care, your paracord accessories will last for years.',
  },
  {
    question: 'Are you really veteran owned?',
    answer: 'Yes! Off Road Paracord is 100% veteran owned and operated. Every product is handcrafted by Jason, a military veteran, right here in Las Vegas, Nevada. When you buy from us, you\'re supporting a veteran-owned small business.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-offwhite tracking-widest mb-4">FAQ</h1>
      <div className="w-16 h-1 bg-paracord mb-4 rounded" />
      <p className="text-sand mb-10">Frequently asked questions about our products and services.</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-forest-light border border-sage rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-forest transition-colors"
            >
              <span className="text-offwhite font-semibold pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-paracord flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-sand leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-forest-light p-6 rounded-xl border border-sage text-center">
        <h2 className="text-offwhite font-bold text-lg mb-2">Still have questions?</h2>
        <p className="text-sand mb-4">
          We&apos;re here to help! Reach out and we&apos;ll get back to you as soon as possible.
        </p>
        <a
          href="mailto:contactoffroadparacord@gmail.com"
          className="inline-block bg-paracord hover:bg-paracord-light text-offwhite font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
