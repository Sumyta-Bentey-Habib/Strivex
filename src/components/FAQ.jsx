"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Strivex?",
    answer:
      "Strivex is an annual sports event that brings together athletes and sports enthusiasts to compete, collaborate, and celebrate fitness, teamwork, and passion for sports.",
  },
  {
    question: "Who can participate?",
    answer:
      "Strivex is open to students, professionals, and sports enthusiasts of all levels. Participants can register online through our official website.",
  },
  {
    question: "What sports are included?",
    answer:
      "The event features a variety of sports including football, basketball, athletics, cricket, badminton, and e-sports. Each year, new categories may be added.",
  },
  {
    question: "How do I register?",
    answer:
      "Visit our registration page and fill out the form. Early registration is recommended as slots are limited.",
  },
  {
    question: "Where is Strivex held?",
    answer:
      "Strivex is hosted at [Your Venue/City]. Venue details and maps are provided on our official website before the event.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6" id="faq">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-700">
        Strivex Q&A
      </h2>
      <div className="max-w-4xl mx-auto space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-6 cursor-pointer border-l-4 border-indigo-500 transition hover:shadow-2xl"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-indigo-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-indigo-500" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
