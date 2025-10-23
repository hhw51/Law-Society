"use client"

import { motion } from "framer-motion"

interface GalleryEvent {
  id: string
  title: string
  date: string
  description: string
  image: string
  category: string
  details: string[]
  speakers?: string[]
}

const galleryEvents: GalleryEvent[] = [
  {
    id: "1",
    title: "Talk on Problem Solving and Decision Making",
    date: "23 November 2023",
    category: "Talk",
    image: "/problem-solving-decision-making.jpg",
    description: "Dr Sohail Saqlain shared insights on complex problem-solving and decision-making strategies.",
    details: [
      "Understanding problem identification",
      "Phases of problem solving",
      "Factors influencing decision making",
      "Presentation of book 'Nargas Aabi'",
    ],
    speakers: ["Dr. Sohail Saqlain"],
  },
  {
    id: "2",
    title: "Climate Crisis Talk",
    date: "27 May 2022",
    category: "Talk",
    image: "/climate-crisis-environment.jpg",
    description:
      "Environmental lawyer Ahmed Rafay Alam discussed the urgent climate crisis and its impact on human dignity.",
    details: [
      "Climate crisis vs climate change",
      "Greenhouse gas emissions",
      "Global temperature rise impacts",
      "UNFCCC and Kyoto Protocol",
      "Environmental dignity rights",
    ],
    speakers: ["Mr. Ahmed Rafay Alam"],
  },
  {
    id: "3",
    title: "Transgender Persons & Their Dignity Rights",
    date: "7 March 2022",
    category: "Panel Discussion",
    image: "/transgender-rights-dignity.jpg",
    description: "A comprehensive panel discussion on the rights and dignity of transgender persons in Pakistan.",
    details: [
      "Social issues and discrimination",
      "Educational and employment challenges",
      "Legal protection and rights",
      "2018 Transgender Person Act",
      "Medical assistance and support",
    ],
    speakers: ["Agha Taimoor", "Mahnoor Chaudhry", "Aeysha Imran Murtaza", "Mehlab Jameel", "Zainab Umair (MPA)"],
  },
  {
    id: "4",
    title: "Margalla Forest Fires: World Environment Day",
    date: "5 June 2022",
    category: "Student Initiative",
    image: "/forest-fires-environment.jpg",
    description: "Students shared their views and opinions on the Margalla Forest Fires incident.",
    details: [
      "Student perspectives on environmental issues",
      "Video, audio, and written submissions",
      "Multilingual participation",
      "Community awareness",
    ],
  },
  {
    id: "5",
    title: "Poster Competition on Public Executions",
    date: "November - December 2020",
    category: "Competition",
    image: "/poster-competition-art.jpg",
    description: "A poster competition encouraging students to express views on public executions.",
    details: [
      "Winner: Laiba Irshad - 'Hang Bell Chimes Not People'",
      "Runner-up: Fahim Akhtar - 'Injustice'",
      "Runner-up: Ali Hamza - 'That Option Is Locked'",
      "Displayed in Philosophers' Gallery",
    ],
  },
  {
    id: "6",
    title: "Stereotypes Quiz Competition",
    date: "July 2021",
    category: "Competition",
    image: "/quiz-competition-learning.jpg",
    description: "A quiz competition to enhance understanding of stereotypes, prejudice, and discrimination.",
    details: [
      "Based on 'The Psychology of Stereotypes' video",
      "Winner: Hanzla Mir (95/100)",
      "Focus on patience and respect for diverse perspectives",
      "Educational and engaging format",
    ],
  },
]

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Gallery
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Interviews, talks, and events from PCLDRC
          </motion.p>
        </div>
      </section>

      {/* Gallery Events */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-8">
          {galleryEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Image */}
                <div className="md:col-span-1 h-64 md:h-auto overflow-hidden bg-neutral-light">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {event.category}
                      </span>
                      <span className="text-sm text-neutral-dark">{event.date}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-primary mb-3">{event.title}</h3>

                    <p className="text-foreground mb-4 leading-relaxed">{event.description}</p>

                    {/* Details */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-neutral-dark mb-2">Highlights:</h4>
                      <ul className="space-y-1">
                        {event.details.map((detail, i) => (
                          <li key={i} className="text-sm text-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Speakers */}
                    {event.speakers && event.speakers.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-neutral-dark mb-2">
                          {event.speakers.length === 1 ? "Speaker" : "Speakers"}:
                        </h4>
                        <p className="text-sm text-foreground">{event.speakers.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
