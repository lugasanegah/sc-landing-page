import React from "react";
import { Badge } from "@/domains/shared/components/ui/badge";

export const TosSection = (): JSX.Element => {
  return (
    <section
      id="tos"
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
            Terms of Service
          </h2>
          <p className="text-lg text-prelinecopale-sky max-w-2xl mx-auto mb-8">
            Understanding Your Rights and Responsibilities
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-700 leading-relaxed">
          <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Socialcrab (“we,” “us,” “our”). These Terms of Service
            (“Terms”) govern your access to and use of our website (
            <a
              href="https://socialcrab.id"
              className="text-blue-600 underline"
            >
              https://socialcrab.id
            </a>
            ) and related services (the “Services”). By using our Services, you
            agree to these Terms. If you do not agree, please stop using the
            Services.
          </p>
          <p className="mb-4">
            We may update these Terms from time to time. Changes will be posted
            on this page with a revised date. Continued use of the Services
            means you accept the updated Terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. Eligibility</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>You must be at least 18 years old to use Socialcrab.</li>
            <li>
              Accounts must be registered by humans only (no bots or automated
              signups).
            </li>
            <li>
              By using our Services, you confirm that all information you
              provide is accurate and truthful.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            3. Account Registration & Security
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>
              You must create an account to access certain features. One account
              may subscribe to only one plan at a time.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              login credentials and all activities under your account.
            </li>
            <li>
              Notify us immediately at{" "}
              <a
                href="mailto:contact@socialcrab.id"
                className="text-blue-600"
              >
                contact@socialcrab.id
              </a>{" "}
              of any unauthorized access or security breach.
            </li>
            <li>You agree to log out at the end of each session.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Acceptable Use</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Do not use the Services for unlawful purposes.</li>
            <li>
              Do not track or analyze hashtags/accounts deemed harmful, abusive,
              obscene, or objectionable.
            </li>
            <li>
              Do not interfere with or disrupt the Services (including
              transmitting viruses or malicious code).
            </li>
            <li>
              Do not copy, resell, or exploit the Services without our written
              consent.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            5. Subscriptions, Fees & Payments
          </h2>
          <p className="mb-4">
            Some features require a paid subscription. A valid payment method is
            required (Visa, Mastercard, AmEx, or other supported methods). By
            subscribing, you authorize Socialcrab (or our payment processors) to
            charge your selected payment method for the chosen plan and future
            renewals. Subscriptions renew automatically (monthly or yearly)
            unless cancelled at least 3 working days before the next billing
            cycle.
          </p>
          <p className="mb-4">
            All fees are final, non-refundable, and non-prorated. This includes
            subscription cancellations, downgrades, unused tokens, or partial
            billing periods. Pricing and features are listed on{" "}
            <a
              href="https://socialcrab.id/pricing"
              className="text-blue-600 underline"
            >
              https://socialcrab.id/pricing
            </a>
            . We may revise pricing with 30 days’ notice.
          </p>
          <p className="mb-4">
            <strong>Taxes:</strong> Fees are exclusive of applicable taxes
            (VAT/GST). Each party is responsible for taxes imposed on them by
            authorities.
          </p>
          <p className="mb-4">
            <strong>Web3 Payments:</strong> Payments via cryptocurrency wallets
            or $SCRB token are irreversible. Token values may fluctuate, and
            transactions are processed on third-party blockchain networks beyond
            our control. Refunds are not available for crypto transactions.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            6. Data & Account Levels
          </h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Your data remains accessible while your subscription is active.</li>
            <li>
              If you cancel or your plan expires, your data may be deleted
              within 30 days.
            </li>
            <li>
              Upgrading starts a new billing cycle. The previous plan is
              non-refundable.
            </li>
            <li>
              Downgrading is effective only at the end of your billing cycle.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            7. Service Availability & Downtime
          </h2>
          <p className="mb-4">
            We strive to maintain reliable and continuous service. However,
            downtime may occur due to maintenance, upgrades, or third-party
            platform changes.
          </p>
          <p className="mb-4">
            <strong>Service Commitment:</strong> We make commercially reasonable
            efforts to ensure availability.
          </p>
          <p className="mb-4">
            <strong>Downtime Definition:</strong> Complete inability to generate
            reports, excluding scheduled maintenance or interruptions beyond our
            control.
          </p>
          <p className="mb-4">
            <strong>Compensation:</strong> If unavailable for 5+ consecutive
            days, you may request replacement tokens as credits (not cash). Send
            requests within 14 days of outage to{" "}
            <a
              href="mailto:contact@socialcrab.id"
              className="text-blue-600"
            >
              contact@socialcrab.id
            </a>
            .
          </p>
          <p className="mb-4">
            <strong>Exclusions:</strong> Issues caused by third-party platforms,
            internet issues, misuse, or force majeure do not qualify.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            8. Upgrades & Downgrades
          </h2>
          <p className="mb-4">
            Upgrades can be made anytime. A new billing cycle begins immediately
            under the upgraded plan. Remaining time/credits are forfeited.
          </p>
          <p className="mb-4">
            Downgrades (monthly): Only at cycle end. You must cancel then
            re-subscribe. Unused credits are forfeited.
          </p>
          <p className="mb-4">
            Downgrades (annual): Commitment is 12 months. Effective only at
            cycle end. Early cancellation does not entitle a refund.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            9. Cancellation & Termination
          </h2>
          <p className="mb-4">
            Cancel via account settings at least 3 working days before billing.
            We may suspend/terminate accounts for violations. Upon termination,
            access ends and data may be deleted. Payments are non-refundable.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            10. Intellectual Property
          </h2>
          <p className="mb-4">
            The Socialcrab name, logo, and trademarks are owned by us. You may
            not use our marks or copy parts of the Services without consent. All
            goodwill benefits us exclusively.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            11. Disclaimer of Warranties
          </h2>
          <p className="mb-4">
            The Services are provided “as is” and “as available.” We disclaim
            all warranties, including merchantability, fitness, and
            non-infringement. We do not guarantee uninterrupted service.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            12. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the fullest extent permitted by law: Socialcrab is not liable for
            indirect or consequential damages. Our maximum liability is the
            greater of USD $100 or the amount you paid in the last 30 days.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            13. Governing Law & Dispute Resolution
          </h2>
          <p className="mb-4">
            These Terms are governed by Indonesian law. Disputes will be
            resolved through arbitration at BANI in South Jakarta. Claims must
            be made individually, not as class actions.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">
            14. General Conditions
          </h2>
          <p className="mb-4">
            Failure to enforce any provision does not waive our rights. If part
            of these Terms is unenforceable, the rest remains in effect. We are
            not responsible for delays outside our control. These Terms, with
            our Privacy Policy, form the full agreement.
          </p>

          <p className="mt-6">
            📧 Questions? Contact us at{" "}
            <a
              href="mailto:contact@socialcrab.id"
              className="text-blue-600"
            >
              contact@socialcrab.id
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
