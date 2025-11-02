"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl font-bold mb-6">
            PCL Dignity Rights Center
          </h1>
          <p className="text-lg text-neutral-dark leading-relaxed mb-4">
            The <strong>PCL Dignity Rights Center</strong> is a project of
            <strong> Pakistan College of Law</strong> under the guidance of{" "}
            <strong>Dignity Rights International</strong>. It was initiated in
            2019 with the aim of disseminating information about{" "}
            <strong>Article 14 of the Constitution of Pakistan (1973)</strong>.
            The Center is dedicated to advancing the understanding and
            protection of human dignity in Pakistan.
          </p>
          <p className="text-lg text-neutral-dark leading-relaxed mb-4">
            This project focuses on <strong>research, advocacy, and education</strong> related to dignity rights, working
            to influence policy and legal frameworks that uphold the dignity of
            all individuals. Students involved in this initiative gain
            hands-on experience in <strong>human rights law, public interest litigation,</strong> and{" "}
            <strong>grassroots advocacy</strong>.
          </p>
          <p className="text-lg text-neutral-dark leading-relaxed">
            The Center achieves its mission through{" "}
            <strong>research papers, practicums, guest lectures, short presentations, small moots,</strong> and a
            consistent <strong>newsfeed on social media</strong> that promotes awareness of dignity rights issues.
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
                To provide exceptional legal services while upholding the
                highest standards of professional ethics and integrity. We
                strive to be the trusted advisor for our clients and a leader in
                the legal community.
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
                To be recognized as a premier legal institution that combines
                traditional values with innovative solutions, delivering
                outstanding results for our clients and contributing positively
                to society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-3xl font-bold mb-12 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Integrity",
              description: "Unwavering commitment to ethical practice",
            },
            {
              title: "Excellence",
              description: "Pursuit of the highest standards in all we do",
            },
            {
              title: "Advocacy",
              description:
                "Dedicated representation of our clients' interests",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              className="p-8 border-l-4 border-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-2xl font-bold mb-3">
                {value.title}
              </h3>
              <p className="text-neutral-dark">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
