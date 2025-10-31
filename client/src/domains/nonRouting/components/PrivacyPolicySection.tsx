import React from "react";
import { Badge } from "@/domains/shared/components/ui/badge";

export const PrivacyPolicySection = (): JSX.Element => {
  return (
    <section
      id="privacy-policy"
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="text-prelinecoblue-ribbon border-prelinecoblue-ribbon"
          >
            Utilities
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-prelinecomirage mb-4 mt-5">
            Privacy Policy
          </h2>
          <p className="text-lg text-prelinecopale-sky max-w-2xl mx-auto mb-8">
            Transparency on How We Handle Your Information
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-700 leading-relaxed">
          <p className="mb-6">
            At Socialcrab (“we,” “our,” “us”), your privacy matters. This Privacy Policy explains what data we collect, how we use it, and how we keep it safe. By using Socialcrab, you agree to this Policy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
          <p className="mb-2 font-medium">a. Account Information</p>
          <p className="mb-4">Name, email, and password when you sign up.</p>

          <p className="mb-2 font-medium">b. Public Data</p>
          <p className="mb-4">
            Socialcrab only analyzes publicly available social media data (Instagram, TikTok, X).
            <br />
            We do not collect or store private or sensitive data.
          </p>

          <p className="mb-2 font-medium">c. Technical Information</p>
          <p className="mb-4">
            IP address, browser type, device, and usage data (e.g., which reports you run).
            <br />
            Cookies to remember preferences and improve performance (you can disable cookies in your browser).
          </p>

          <p className="mb-2 font-medium">d. Payment Information</p>
          <p className="mb-4">
            We do not store your full credit card details.
            <br />
            Payments are processed securely by trusted third-party providers (e.g., Stripe, Xendit).
            <br />
            We may keep limited billing metadata (billing name, address, last 4 digits of card) for invoices and support.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Information</h2>
          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>To provide and operate Socialcrab services.</li>
            <li>To process subscriptions and payments.</li>
            <li>To communicate with you about updates, support, or new features.</li>
            <li>To improve performance and user experience.</li>
            <li>To comply with legal and security obligations.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. How We Share Information</h2>
          <p className="mb-4">We do not sell your personal data. We only share information with:</p>
          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Service providers (payment processors, hosting, analytics).</li>
            <li>Legal authorities if required by law or to protect rights, safety, or property.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Retention</h2>
          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Account data is kept as long as your subscription is active.</li>
            <li>If you cancel, we may retain limited info for legal/tax compliance.</li>
            <li>Reports and public data you generate may remain accessible while your account is active.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Your Rights</h2>
          <p className="mb-4">Depending on your location (e.g., GDPR, CCPA), you may have rights to:</p>
          <ul className="list-disc ml-6 mb-4 space-y-1">
            <li>Access, update, or delete your personal data.</li>
            <li>Opt out of marketing communications.</li>
            <li>Request data export or removal.</li>
          </ul>
          <p className="mb-4">
            To exercise your rights, email us at{" "}
            <span className="font-medium">privacy@socialcrab.id</span>.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Data Security</h2>
          <p className="mb-4">
            We use encryption, secure servers, and limited staff access.
            <br />
            No online system is 100% secure — you use Socialcrab at your own risk.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. International Data Transfers</h2>
          <p className="mb-4">
            Your data may be stored or processed outside your country. By using Socialcrab, you consent to these transfers.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Children’s Privacy</h2>
          <p className="mb-4">
            Socialcrab is not directed to anyone under 18. We do not knowingly collect data from minors. If discovered, such data will be deleted.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">9. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Policy. Updates will be posted here with a new “last updated” date. Continued use of Socialcrab means you accept the revised Policy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact Us</h2>
          <p className="mb-2">📧 contact@socialcrab.id</p>
          <p>📍 Socialcrab HQ, Indonesia</p>
        </div>
      </div>
    </section>
  );
};
