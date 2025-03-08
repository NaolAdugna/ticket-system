import { motion } from 'framer-motion';

const features = [
  {
    title: 'Easy Ticket Creation',
    description: 'Create and manage tickets effortlessly with our intuitive interface.',
    icon: '🎫', // Replace with an actual icon or image
  },
  {
    title: 'Real-Time Updates',
    description: 'Get real-time updates on ticket status and progress.',
    icon: '🔄', // Replace with an actual icon or image
  },
  {
    title: 'Automated Workflows',
    description: 'Automate repetitive tasks and streamline your workflow.',
    icon: '🤖', // Replace with an actual icon or image
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain insights with detailed analytics and reporting.',
    icon: '📊', // Replace with an actual icon or image
  },
  {
    title: 'Team Collaboration',
    description: 'Collaborate seamlessly with your team on ticket resolution.',
    icon: '👥', // Replace with an actual icon or image
  },
  {
    title: 'Customizable Notifications',
    description: 'Set up personalized notifications to stay informed.',
    icon: '🔔', // Replace with an actual icon or image
  },
];

const FeatureCard = ({ title, description, icon }) => {
  return (
    <motion.div
      className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-12 bg-gray-100" id="features">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-900 mb-12"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;