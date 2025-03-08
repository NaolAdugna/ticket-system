import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="py-12 bg-gray-50" id="aboutus">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Title and Description */}
          <motion.div
            className="space-y-6"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              About Us
            </h2>
            <p className="text-lg text-gray-600">
            At TicketFlow, we are committed to transforming the way businesses handle ticket management. Our innovative platform is designed to simplify issue tracking, improve team collaboration, and enhance customer experiences. With a user-friendly interface and powerful automation tools, we help businesses of all sizes manage support requests efficiently.
            </p>
            <p className="text-lg text-gray-600">
            Our mission is to empower organizations with a seamless, scalable, and smart solution for handling inquiries, so they can focus on what matters most—delivering exceptional service.
            </p>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            className="relative w-full h-96 md:h-auto"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/about-us-image.png" // Replace with your image path
              alt="About Us"
              width={400}
              height={500}
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;