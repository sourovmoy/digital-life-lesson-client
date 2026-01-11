import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowLeft, FaLock, FaDatabase, FaCookie, FaUserShield } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-6"
          >
            <FaArrowLeft className="text-sm" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
            >
              <FaLock className="text-2xl text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-base-content/60 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-base-200 rounded-2xl p-8 shadow-lg"
        >
          <div className="prose prose-lg max-w-none text-base-content">
            
            {/* Introduction */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaUserShield className="text-primary text-xl" />
                <h2 className="text-2xl font-bold text-base-content m-0">1. Introduction</h2>
              </div>
              <p className="text-base-content/80 leading-relaxed">
                Digital Life Lessons ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaDatabase className="text-primary text-xl" />
                <h2 className="text-2xl font-bold text-base-content m-0">2. Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-3">Personal Information</h3>
                  <p className="text-base-content/80 mb-2">We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>Register for an account</li>
                    <li>Create or share life lessons</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for support</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  <p className="text-base-content/80 mt-3">This information may include:</p>
                  <ul className="list-disc list-inside text-base-content/80 space-y-1 ml-4">
                    <li>Name and email address</li>
                    <li>Profile picture</li>
                    <li>Account preferences</li>
                    <li>Payment information (processed securely by third-party providers)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-3">Usage Information</h3>
                  <p className="text-base-content/80 mb-2">We automatically collect certain information when you use our services:</p>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>Device information (browser type, operating system)</li>
                    <li>IP address and location data</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website addresses</li>
                    <li>Search terms used to find our site</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-3">Third-Party Information</h3>
                  <p className="text-base-content/80">
                    If you choose to sign up using social media accounts (Google, Facebook, etc.), we may receive information from those platforms according to their privacy policies and your privacy settings.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">3. How We Use Your Information</h2>
              <p className="text-base-content/80 mb-4">We use the information we collect to:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-base-300/30 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Service Provision</h4>
                  <ul className="list-disc list-inside text-base-content/80 text-sm space-y-1">
                    <li>Create and manage your account</li>
                    <li>Provide our core services</li>
                    <li>Process payments and subscriptions</li>
                    <li>Send service-related communications</li>
                  </ul>
                </div>
                <div className="bg-base-300/30 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Improvement & Analytics</h4>
                  <ul className="list-disc list-inside text-base-content/80 text-sm space-y-1">
                    <li>Analyze usage patterns</li>
                    <li>Improve our services</li>
                    <li>Develop new features</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                </div>
                <div className="bg-base-300/30 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Communication</h4>
                  <ul className="list-disc list-inside text-base-content/80 text-sm space-y-1">
                    <li>Send newsletters (with consent)</li>
                    <li>Respond to inquiries</li>
                    <li>Provide customer support</li>
                    <li>Send important updates</li>
                  </ul>
                </div>
                <div className="bg-base-300/30 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Legal Compliance</h4>
                  <ul className="list-disc list-inside text-base-content/80 text-sm space-y-1">
                    <li>Comply with legal obligations</li>
                    <li>Enforce our terms of service</li>
                    <li>Protect rights and safety</li>
                    <li>Resolve disputes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">4. How We Share Your Information</h2>
              <p className="text-base-content/80 mb-4">We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-base-content mb-2">Service Providers</h4>
                  <p className="text-base-content/80 text-sm">
                    We may share information with trusted third-party service providers who help us operate our platform (hosting, payment processing, analytics, email services).
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold text-base-content mb-2">Legal Requirements</h4>
                  <p className="text-base-content/80 text-sm">
                    We may disclose information if required by law, court order, or to protect our rights, property, or safety.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-base-content mb-2">Business Transfers</h4>
                  <p className="text-base-content/80 text-sm">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </p>
                </div>
                <div className="border-l-4 border-neutral pl-4">
                  <h4 className="font-semibold text-base-content mb-2">With Your Consent</h4>
                  <p className="text-base-content/80 text-sm">
                    We may share information for any other purpose with your explicit consent.
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaCookie className="text-primary text-xl" />
                <h2 className="text-2xl font-bold text-base-content m-0">5. Cookies and Tracking Technologies</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-base-content/80 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device.
                </p>
                
                <div className="bg-base-300/30 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Types of Cookies We Use:</h4>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
                  </ul>
                </div>
                
                <p className="text-base-content/80">
                  You can control cookies through your browser settings. However, disabling certain cookies may affect site functionality.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">6. Data Security</h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Technical Measures</h4>
                  <ul className="list-disc list-inside text-base-content/80 text-sm space-y-1">
                    <li>SSL/TLS encryption</li>
                    <li>Secure data storage</li>
                    <li>Regular security updates</li>
                    <li>Access controls and monitoring</li>
                  </ul>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <h4 className="font-semibold text-base-content mb-2">Organizational Measures</h4>
                  <ul className="list-disc list-inside text-base-content/80 text-sm space-y-1">
                    <li>Employee training</li>
                    <li>Data access policies</li>
                    <li>Regular security audits</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-base-content/80 text-sm mt-4 bg-warning/10 p-3 rounded-lg">
                <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">7. Your Privacy Rights</h2>
              <p className="text-base-content/80 mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-base-300/20 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-base-content">Access and Portability</h4>
                    <p className="text-base-content/80 text-sm">Request a copy of your personal information and receive it in a portable format.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-base-300/20 rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-base-content">Correction</h4>
                    <p className="text-base-content/80 text-sm">Request correction of inaccurate or incomplete personal information.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-base-300/20 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-base-content">Deletion</h4>
                    <p className="text-base-content/80 text-sm">Request deletion of your personal information, subject to certain exceptions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-base-300/20 rounded-lg">
                  <div className="w-2 h-2 bg-neutral rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-base-content">Opt-out</h4>
                    <p className="text-base-content/80 text-sm">Opt-out of marketing communications and certain data processing activities.</p>
                  </div>
                </div>
              </div>
              
              <p className="text-base-content/80 mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">8. Data Retention</h2>
              <p className="text-base-content/80 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">9. Children's Privacy</h2>
              <p className="text-base-content/80 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">10. International Data Transfers</h2>
              <p className="text-base-content/80 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are conducted in accordance with applicable data protection laws and with appropriate safeguards in place.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-base-content/80 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. We encourage you to review this privacy policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">12. Contact Us</h2>
              <p className="text-base-content/80 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-base-300/50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">General Inquiries</h4>
                    <p className="text-base-content/80 text-sm">
                      <strong>Email:</strong> privacy@digitallifelessons.com<br />
                      <strong>Response Time:</strong> Within 48 hours
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base-content mb-2">Data Protection Officer</h4>
                    <p className="text-base-content/80 text-sm">
                      <strong>Email:</strong> dpo@digitallifelessons.com<br />
                      <strong>Address:</strong> Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-base-content/70 mb-4">
            Questions about your privacy or data?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-content px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold"
          >
            Contact Our Privacy Team
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;