"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-5xl font-bold mb-6">About PCL Dignity Rights Center</h1>
          <p className="text-lg text-neutral-dark leading-relaxed">
            PCL Dignity Rights Center is a project of Pakistan College of Law under the guidance of Dignity Rights International. 
            It was initiated in 2019 with the aim to disseminate information about Article 14 of the Constitution of Pakistan (1973). 
            The Center is dedicated to advancing the understanding and protection of human dignity in Pakistan.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#1e7b5c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                Our mission is to advance the understanding and protection of human dignity in Pakistan by engaging in 
                research, advocacy, and education. We strive to influence policy and legal frameworks that uphold the dignity of all individuals, 
                fostering a society that recognizes dignity as a fundamental human right.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold mb-4">Our Vision</h2>
              <p className="leading-relaxed">
                We envision a Pakistan where every individual’s dignity is respected, protected, and upheld by law and society. 
                Through academic research, policy influence, and grassroots advocacy, we aim to create lasting social and legal change 
                that ensures dignity remains at the heart of human rights discourse.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities / Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-3xl font-bold mb-12 text-center">Our Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Research & Publications",
              description:
                "We produce research papers and reports that explore dignity rights in the context of Pakistan’s legal and constitutional framework.",
            },
            {
              title: "Media & Advocacy",
              description:
                "Through practicums, guest lectures, short presentations, and small moots, students gain valuable experience in human rights law and advocacy.",
            },
            {
              title: "Awareness & Outreach",
              description:
                "We engage in grassroots advocacy and maintain a newsfeed through our social platforms to raise awareness about dignity rights.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-8 border-l-4 border-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-neutral-dark">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
