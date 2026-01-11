import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowLeft, FaShieldAlt, FaUsers, FaGavel } from "react-icons/fa";

const Terms = () => {
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
              <FaGavel className="text-2xl text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using Digital Life Lessons
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
                <FaShieldAlt className="text-primary text-xl" />
                <h2 className="text-2xl font-bold text-base-content m-0">1. Introduction</h2>
              </div>
              <p className="text-base-content/80 leading-relaxed">
                Welcome to Digital Life Lessons ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website and services located at digitallifelessons.com (the "Service") operated by Digital Life Lessons.
              </p>
              <p className="text-base-content/80 leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">2. Acceptance of Terms</h2>
              <p className="text-base-content/80 leading-relaxed">
                By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-primary text-xl" />
                <h2 className="text-2xl font-bold text-base-content m-0">3. User Accounts</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">Account Creation</h3>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for maintaining the security of your account credentials</li>
                    <li>You must be at least 13 years old to create an account</li>
                    <li>One person may not maintain more than one account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">Account Responsibilities</h3>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>You must notify us immediately of any unauthorized use of your account</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content and Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">4. Content and Conduct</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">User Content</h3>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>You retain ownership of content you create and share on our platform</li>
                    <li>By sharing content, you grant us a license to display and distribute it on our platform</li>
                    <li>You are responsible for ensuring your content doesn't violate any laws or third-party rights</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">Prohibited Content</h3>
                  <p className="text-base-content/80 mb-2">You may not post content that:</p>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>Is illegal, harmful, threatening, abusive, or discriminatory</li>
                    <li>Infringes on intellectual property rights</li>
                    <li>Contains spam, malware, or malicious code</li>
                    <li>Violates privacy or contains personal information of others without consent</li>
                    <li>Is sexually explicit or contains inappropriate content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Premium Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">5. Premium Services</h2>
              <div className="space-y-4">
                <p className="text-base-content/80 leading-relaxed">
                  We offer premium subscription services with additional features. Premium subscriptions are billed on a recurring basis and will automatically renew unless cancelled.
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2">Payment and Billing</h3>
                  <ul className="list-disc list-inside text-base-content/80 space-y-2">
                    <li>All fees are non-refundable unless required by law</li>
                    <li>We reserve the right to change pricing with 30 days notice</li>
                    <li>You can cancel your subscription at any time through your account settings</li>
                    <li>Cancelled subscriptions remain active until the end of the billing period</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">6. Intellectual Property</h2>
              <p className="text-base-content/80 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Digital Life Lessons and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">7. Termination</h2>
              <p className="text-base-content/80 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">8. Disclaimer</h2>
              <p className="text-base-content/80 leading-relaxed">
                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms relating to our Service.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">9. Limitation of Liability</h2>
              <p className="text-base-content/80 leading-relaxed">
                In no event shall Digital Life Lessons, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">10. Changes to Terms</h2>
              <p className="text-base-content/80 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">11. Contact Us</h2>
              <p className="text-base-content/80 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-base-300/50 rounded-lg p-4 mt-4">
                <p className="text-base-content/80">
                  <strong>Email:</strong> legal@digitallifelessons.com<br />
                  <strong>Address:</strong> Dhaka, Bangladesh
                </p>
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
            Have questions about our terms?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-content px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-semibold"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;