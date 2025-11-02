"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-5xl font-bold mb-6">About Our Society</h1>
          <p className="text-lg text-neutral-dark leading-relaxed">
            Founded in 1995, our Law Society has been a beacon of legal excellence and professional integrity. We are
            committed to advancing the legal profession and serving our community with distinction.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-neutral-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-neutral-dark leading-relaxed">
                To provide exceptional legal services while upholding the highest standards of professional ethics and
                integrity. We strive to be the trusted advisor for our clients and a leader in the legal community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-neutral-dark leading-relaxed">
                To be recognized as a premier legal institution that combines traditional values with innovative
                solutions, delivering outstanding results for our clients and contributing positively to society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PCL Dignity Rights Center */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-bold mb-6 text-center">PCL Dignity Rights Center</h2>
          <p className="text-neutral-dark leading-relaxed mb-4">
            The <strong>PCL Dignity Rights Center</strong> is a project of Pakistan College of Law, established in 2019
            under the guidance of <strong>Dignity Rights International</strong>. It is dedicated to advancing the
            understanding and protection of human dignity in Pakistan, with a particular focus on{" "}
            <strong>Article 14 of the Constitution of Pakistan (1973)</strong>.
          </p>
          <p className="text-neutral-dark leading-relaxed mb-4">
            The project emphasizes <strong>research, advocacy, and education</strong> related to dignity rights, seeking
            to influence policy and strengthen legal frameworks that uphold the dignity of all individuals. Through
            participation in this initiative, students gain valuable experience in human rights law, public interest
            litigation, and grassroots advocacy.
          </p>
          <p className="text-neutral-dark leading-relaxed">
            The Center achieves its mission through a variety of activities including{" "}
            <strong>research papers, practicums, guest lectures, short presentations, small moots,</strong> and ongoing
            updates shared through our <strong>social media newsfeed</strong>.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Integrity", description: "Unwavering commitment to ethical practice" },
            { title: "Excellence", description: "Pursuit of the highest standards in all we do" },
            { title: "Advocacy", description: "Dedicated representation of our clients' interests" },
          ].map((value, i) => (
            <motion.div
              key={i}
              className="p-8 border-l-4 border-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-neutral-dark">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
