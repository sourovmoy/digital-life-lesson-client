import { FaHeart, FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa";
import Container from "../../components/Shared/Container";

const About = () => {
  const teamMembers = [
    {
      name: "Sourov Dash",
      role: "Founder & CEO",
      image: "https://i.ibb.co/xqB3P6fG/149400531-2863964833880191-365399902058522801-n-removebg-preview.png",
      bio: "Passionate about personal growth and community building. 10+ years in education technology."
    },
    {
      name: "Michael Chen",
      role: "Head of Community",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Expert in community management and user experience. Believes in the power of shared wisdom."
    },
    {
      name: "Emily Rodriguez",
      role: "Content Curator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Ensures quality and authenticity of shared lessons. Background in psychology and counseling."
    }
  ];

  const values = [
    {
      icon: <FaHeart className="text-4xl text-error" />,
      title: "Authenticity",
      description: "We believe in genuine, real-life experiences that can truly help others learn and grow."
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Community",
      description: "Building a supportive environment where everyone feels safe to share and learn."
    },
    {
      icon: <FaLightbulb className="text-4xl text-secondary" />,
      title: "Growth",
      description: "Fostering continuous learning and personal development through shared wisdom."
    },
    {
      icon: <FaGlobe className="text-4xl text-success" />,
      title: "Impact",
      description: "Creating positive change in people's lives through meaningful connections and insights."
    }
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6">
              About Digital Life Lessons
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
              We're on a mission to create the world's largest repository of authentic life lessons, 
              where real experiences become powerful learning opportunities for everyone.
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-base-content/80 leading-relaxed">
                <p>
                  Digital Life Lessons was born from a simple observation: the most valuable lessons 
                  in life often come from real experiences, not textbooks. We realized that everyone 
                  has wisdom to share, and everyone has something to learn.
                </p>
                <p>
                  Founded in 2024, our platform has grown into a thriving community of learners, 
                  teachers, professionals, and life enthusiasts who believe in the power of shared 
                  experiences. We've facilitated thousands of meaningful connections and helped 
                  people navigate life's challenges through collective wisdom.
                </p>
                <p>
                  Today, we continue to evolve, always keeping our core mission at heart: making 
                  life lessons accessible, authentic, and actionable for everyone.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-content p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm">Lessons Shared</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-base-200">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Our Values
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the community we're building together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-base-100 rounded-xl shadow-lg border border-base-300">
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-3">
                  {value.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Passionate individuals dedicated to creating meaningful connections through shared wisdom.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-6 bg-base-100 rounded-xl shadow-lg border border-base-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary/20"
                />
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-base-content/70 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <Container>
          <div className="text-center text-primary-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Mission
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Be part of a community that believes in the power of shared experiences and collective growth.
            </p>
            <button className="bg-primary-content text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-content/90 transition-colors">
              Get Started Today
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;