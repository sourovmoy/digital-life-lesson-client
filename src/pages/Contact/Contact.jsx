import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl text-primary" />,
      title: "Email Us",
      content: "support@digitallifelessons.com",
      description: "Send us an email anytime"
    },
    {
      icon: <FaPhone className="text-2xl text-primary" />,
      title: "Call Us",
      content: "01742818496",
      description: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-primary" />,
      title: "Visit Us",
      content: "123 Learning Street, Education City, EC 12345",
      description: "Our headquarters"
    },
    {
      icon: <FaClock className="text-2xl text-primary" />,
      title: "Business Hours",
      content: "Monday - Friday: 9AM - 6PM EST",
      description: "Weekend support via email"
    }
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 leading-relaxed">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you. 
              Our team is here to help and support your learning journey.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 bg-base-200 rounded-xl border border-base-300 hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-base-content mb-2">
                  {info.title}
                </h3>
                <p className="text-base-content font-medium mb-1">
                  {info.content}
                </p>
                <p className="text-sm text-base-content/70">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-base-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-base-content mb-6">
                Send us a Message
              </h2>
              <p className="text-base-content/70 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. 
                We typically respond within 24 hours.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-base-content mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-base-content mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-base-content mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-base-content mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base-content resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-content py-3 px-6 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-content border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map/Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-base-content mb-6">
                Visit Our Office
              </h2>
              <p className="text-base-content/70 mb-8">
                We're located in the heart of Education City. Feel free to drop by during 
                business hours or schedule a meeting in advance.
              </p>
              
              {/* Placeholder for map */}
              <div className="bg-base-300 rounded-lg h-64 flex items-center justify-center mb-6">
                <div className="text-center text-base-content/60">
                  <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Learning Street, Education City</p>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="bg-base-100 p-6 rounded-lg border border-base-300">
                <h3 className="text-xl font-semibold text-base-content mb-4">
                  Quick Response Guarantee
                </h3>
                <ul className="space-y-2 text-base-content/80">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Email responses within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Phone support during business hours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    Emergency support for premium users
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;