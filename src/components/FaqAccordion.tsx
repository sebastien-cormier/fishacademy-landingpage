'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="divide-y divide-dark-700 rounded-2xl border border-dark-700 bg-dark-800">
      {items.map((item, index) => (
        <div key={index}>
          <button
            type="button"
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-dark-700/50"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="pr-4 font-medium text-dark-100">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-dark-400 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-5 text-dark-300">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
