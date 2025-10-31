interface AnswerBlock {
  type: "text" | "list"
  content: string | string[]
}

interface questionList {
  question: string
  answer: AnswerBlock[]
}

interface faqDataInt {
  tab: string
  id: number
  question: questionList[]
}



import { motion, AnimatePresence } from "framer-motion";

import { useState, useEffect } from "react";

export default function FaqAccordion() {

  const faqData: faqDataInt[] = [
    // 1. Getting Started
    {
      id: 1,
      tab: "Getting Started",
      question: [
        {
          question: "What is Socialcrab?",
          answer: [
            {
              type: "text",
              content:
                "Socialcrab is a social media analytics platform that currently supports Instagram reports, with TikTok and X (Twitter) analytics coming soon. You can generate in-depth reports on any public account or hashtag without connecting or logging in with your own social accounts.",
            },
            {
              type: "text",
              content:
                "This makes Socialcrab safer than traditional tools; no risk of compromising your accounts or triggering suspension. From Data to Decision in One Click.",
            },
          ],
        },
        {
          question: "Do you offer free trials?",
          answer: [
            { type: "text", content: "We don’t offer traditional free trials. Instead:" },
            {
              type: "list",
              content: [
                "Every new user gets 1 free token to try a report.",
                "You can also view sample reports anytime to see how Socialcrab helps you go from raw data to clear decisions in a single click.",
              ],
            },
          ],
        },
        {
          question: "How many accounts or hashtags can I analyze?",
          answer: [
            { type: "text", content: "Each report consumes 1 token. Your subscription plan includes a monthly quota." },
          ],
        },
        {
          question: "How long does it take to generate a report?",
          answer: [
            { type: "text", content: "Reports are generated on demand. Depending on how many posts are processed, it usually takes 2–8 hours. You don’t need to keep the tab open. We’ll notify you once it’s ready." },
          ],
        },
      ],
    },

    // 2. Features & Data
    {
      id: 2,
      tab: "Features & Data",
      question: [
        {
          question: "What’s the difference vs. Instagram/TikTok/X native insights?",
          answer: [
            { type: "text", content: "Native analytics only show data for your own account. Socialcrab goes further by analyzing any public account or hashtag, so you can:" },
            {
              type: "list",
              content: [
                "Track competitors",
                "Discover influencers",
                "Benchmark campaigns",
                "Evaluate content",
                "Run market research",
              ],
            },
            { type: "text", content: "Instagram reports are live today, with TikTok & X support launching soon." },
          ],
        },
        {
          question: "Why should I use Socialcrab instead of other tools?",
          answer: [
            {
              type: "list",
              content: [
                "No need to connect your accounts → no suspension risk",
                "Analyze competitors & communities freely",
                "More data points per report than most competitors",
                "Automated reporting eliminates manual research work",
                "Minimizes human error with structured, consistent data",
              ],
            },
            { type: "text", content: "With Socialcrab, you move From Data to Decision in One Click." },
          ],
        },
        {
          question: "How far back can I analyze posts?",
          answer: [
            {
              type: "list",
              content: [
                "Accounts: Up to 1,500 most recent posts",
                "Hashtags: Up to 3,000 most recent posts",
              ],
            },
          ],
        },
        {
          question: "Why do post counts sometimes differ from what I see on Instagram, TikTok, or X?",
          answer: [
            {
              type: "list",
              content: [
                "Private or age-restricted accounts",
                "Deleted or archived posts",
                "Sponsored hashtags (e.g., TikTok sometimes randomizes)",
                "Platform restrictions or filters",
              ],
            },
          ],
        },
        {
          question: "Are reports updated over time?",
          answer: [
            { type: "text", content: "Yes. Reports reflect data at the time they were generated, but you can use the Update Report feature anytime to refresh them with the latest data. No need to start over." },
          ],
        },
        {
          question: "Can I export data to Excel/PDF?",
          answer: [
            { type: "text", content: "Yes. Reports can be exported to Excel and PDF, making it easy to share insights with your team or clients." },
          ],
        },
        {
          question: "Does Socialcrab work in my country?",
          answer: [
            { type: "text", content: "Yes. Socialcrab works globally with publicly available data. Some features (like hashtag depth) may vary depending on platform rules in certain regions." },
          ],
        },
        {
          question: "Can Socialcrab help me increase followers?",
          answer: [
            { type: "text", content: "Socialcrab doesn’t sell followers or guarantee growth. Instead, it provides data-driven insights on what drives engagement, such as top-performing posts, captions, and hashtags in your niche. By applying these insights, you can adapt strategies that attract authentic followers over time." },
          ],
        },
      ],
    },

    // 3. Tokens & Plans
    {
      id: 3,
      tab: "Tokens & Plans",
      question: [
        {
          question: "How do tokens work?",
          answer: [{ type: "text", content: "One token = one report (account or hashtag). Your subscription includes tokens each billing cycle, and you can top up if needed." }],
        },
        {
          question: "Can I buy more tokens?",
          answer: [{ type: "text", content: "Yes. You can top up anytime by contacting our Client Success team.* *Terms and conditions apply." }],
        },
        {
          question: "What happens if I cancel my subscription?",
          answer: [{ type: "text", content: "Your subscription is commitment-free. If you cancel, it won’t renew on the next cycle. Any reports you’ve already generated remain accessible until your current plan ends." }],
        },
        {
          question: "What payment methods are available?",
          answer: [
            { type: "text", content: "We accept Visa, Mastercard, and American Express. Please make sure your card supports international recurring payments." },
            { type: "text", content: "👉 Web3 support coming soon: Pay using crypto wallets and the $SCRB token. Another way to turn Data into Decisions in One Click." },
          ],
        },
      ],
    },

    // 4. Tech & Privacy
    {
      id: 4,
      tab: "Tech & Privacy",
      question: [
        {
          question: "Is Socialcrab affected by Instagram, TikTok, or X API changes?",
          answer: [{ type: "text", content: "No. We don’t rely solely on APIs. Our system uses proprietary methods built on publicly available data, so even if APIs change, your analytics keep running." }],
        },
        {
          question: "How does Socialcrab handle privacy & GDPR?",
          answer: [{ type: "text", content: "We only analyze publicly available data. We don’t collect, store, or process private or sensitive information. This approach fully aligns with GDPR principles." }],
        },
        {
          question: "Do you support bulk uploads or API integration?",
          answer: [
            { type: "list", content: ["Bulk uploads: Not yet.", "API access: Currently in development. Contact us if you’d like early access or a partnership."] },
          ],
        },
      ],
    },

    // 5. Partnerships & Web3
    {
      id: 5,
      tab: "Partnerships & Web3",
      question: [
        {
          question: "Does Socialcrab support journalists, researchers, or media publishers?",
          answer: [{ type: "text", content: "Yes. We can generate custom insights tailored for campaigns, media coverage, or academic research. Contact our team to collaborate." }],
        },
        {
          question: "What’s Socialcrab’s connection to Web3?",
          answer: [
            { type: "text", content: "Socialcrab bridges Web2 social media analytics with Web3 ecosystems." },
            {
              type: "list",
              content: [
                "Our $SCRB token powers credits and buybacks.",
                "We help Web3 projects prove real traction vs. hype by measuring community activity and KOL impact.",
                "Our platform supports brands, agencies, and DAOs that need transparent, verifiable social proof for campaigns.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: 6,
      tab: "",
      question: [
        {
          question: "What information does Socialcrab collect?",
          answer: [
            { type: "text", content: "At Socialcrab (\"we,\" \"our,\" \"us\"), your privacy matters. This Privacy Policy explains what data we collect, how we use it, and how we keep it safe. By using Socialcrab, you agree to this Policy." },
            { type: "text", content: "We collect the following types of information:" },
            {
              type: "list",
              content: [
                "Account Information: Name, email, and password when you sign up.",
                "Public Data: Socialcrab only analyzes publicly available social media data (Instagram, TikTok, X). We do not collect or store private or sensitive data.",
                "Technical Information: IP address, browser type, device, and usage data (e.g., which reports you run). Cookies to remember preferences and improve performance (you can disable cookies in your browser).",
                "Payment Information: We do not store your full credit card details. Payments are processed securely by trusted third-party providers (e.g., Stripe, Xendit). We may keep limited billing metadata (billing name, address, last 4 digits of card) for invoices and support."
              ]
            }
          ]
        },
        {
          question: "How does Socialcrab use my information?",
          answer: [
            {
              type: "list",
              content: [
                "To provide and operate Socialcrab services.",
                "To process subscriptions and payments.",
                "To communicate with you about updates, support, or new features.",
                "To improve performance and user experience.",
                "To comply with legal and security obligations."
              ]
            }
          ]
        },
        {
          question: "Does Socialcrab share my information with third parties?",
          answer: [
            { type: "text", content: "We do not sell your personal data. We only share information with:" },
            {
              type: "list",
              content: [
                "Service providers (payment processors, hosting, analytics).",
                "Legal authorities if required by law or to protect rights, safety, or property."
              ]
            }
          ]
        },
        {
          question: "How long does Socialcrab keep my data?",
          answer: [
            { type: "text", content: "Account data is kept as long as your subscription is active. If you cancel, we may retain limited info for legal/tax compliance. Reports and public data you generate may remain accessible while your account is active." }
          ]
        },
        {
          question: "What are my privacy rights?",
          answer: [
            { type: "text", content: "Depending on your location (e.g., GDPR, CCPA), you may have rights to:" },
            {
              type: "list",
              content: [
                "Access, update, or delete your personal data.",
                "Opt out of marketing communications.",
                "Request data export or removal."
              ]
            },
            { type: "text", content: "To exercise your rights, email us at privacy@socialcrab.id." }
          ]
        },
        {
          question: "How does Socialcrab protect my data?",
          answer: [
            { type: "text", content: "We use encryption, secure servers, and limited staff access. No online system is 100% secure — you use Socialcrab at your own risk." }
          ]
        },
        {
          question: "Is my data transferred internationally?",
          answer: [
            { type: "text", content: "Your data may be stored or processed outside your country. By using Socialcrab, you consent to these transfers." }
          ]
        },
        {
          question: "Does Socialcrab collect data from children?",
          answer: [
            { type: "text", content: "Socialcrab is not directed to anyone under 18. We do not knowingly collect data from minors. If discovered, such data will be deleted." }
          ]
        },
        {
          question: "Can this Privacy Policy change?",
          answer: [
            { type: "text", content: "We may update this Policy. Updates will be posted here with a new \"last updated\" date. Continued use of Socialcrab means you accept the revised Policy." }
          ]
        },
        {
          question: "How can I contact Socialcrab about privacy?",
          answer: [
            { type: "text", content: "📧 contact@socialcrab.id" },
            { type: "text", content: "📍 Socialcrab HQ, Indonesia" }
          ]
        }
      ]
    },
    {
      id: 7,
      tab: "",
      question: [
        {
          question: "What are Socialcrab's Terms of Service?",
          answer: [
            { type: "text", content: "Welcome to Socialcrab (\"we,\" \"us,\" \"our\"). These Terms of Service (\"Terms\") govern your access to and use of our website (https://socialcrab.id) and related services (the \"Services\"). By using our Services, you agree to these Terms. If you do not agree, please stop using the Services." },
            { type: "text", content: "We may update these Terms from time to time. Changes will be posted on this page with a revised date. Continued use of the Services means you accept the updated Terms." }
          ]
        },
        {
          question: "Who can use Socialcrab?",
          answer: [
            {
              type: "list",
              content: [
                "You must be at least 18 years old to use Socialcrab.",
                "Accounts must be registered by humans only (no bots or automated signups).",
                "By using our Services, you confirm that all information you provide is accurate and truthful."
              ]
            }
          ]
        },
        {
          question: "How do I keep my account secure?",
          answer: [
            { type: "text", content: "You must create an account to access certain features. One account may subscribe to only one plan at a time." },
            {
              type: "list",
              content: [
                "You are responsible for maintaining the confidentiality of your login credentials and all activities under your account.",
                "Notify us immediately at contact@socialcrab.id of any unauthorized access or security breach.",
                "You agree to log out at the end of each session."
              ]
            }
          ]
        },
        {
          question: "What are the rules for using Socialcrab?",
          answer: [
            {
              type: "list",
              content: [
                "Do not use the Services for unlawful purposes.",
                "Do not track or analyze hashtags/accounts deemed harmful, abusive, obscene, or objectionable.",
                "Do not interfere with or disrupt the Services (including transmitting viruses or malicious code).",
                "Do not copy, resell, or exploit the Services without our written consent."
              ]
            }
          ]
        },
        {
          question: "How do subscriptions and payments work?",
          answer: [
            { type: "text", content: "Some features require a paid subscription. A valid payment method is required (Visa, Mastercard, AmEx, or other supported methods). By subscribing, you authorize Socialcrab (or our payment processors) to charge your selected payment method for the chosen plan and future renewals. Subscriptions renew automatically (monthly or yearly) unless cancelled at least 3 working days before the next billing cycle." },
            { type: "text", content: "All fees are final, non-refundable, and non-prorated. This includes subscription cancellations, downgrades, unused tokens, or partial billing periods. Pricing and features are listed on https://socialcrab.id/pricing. We may revise pricing with 30 days' notice." }
          ]
        },
        {
          question: "Are there any additional fees or taxes?",
          answer: [
            { type: "text", content: "Fees are exclusive of applicable taxes (VAT/GST). Each party is responsible for taxes imposed on them by authorities." }
          ]
        },
        {
          question: "Can I pay with cryptocurrency?",
          answer: [
            { type: "text", content: "Payments via cryptocurrency wallets or $SCRB token are irreversible. Token values may fluctuate, and transactions are processed on third-party blockchain networks beyond our control. Refunds are not available for crypto transactions." }
          ]
        },
        {
          question: "What happens to my data if I cancel?",
          answer: [
            {
              type: "list",
              content: [
                "Your data remains accessible while your subscription is active.",
                "If you cancel or your plan expires, your data may be deleted within 30 days.",
                "Upgrading starts a new billing cycle. The previous plan is non-refundable.",
                "Downgrading is effective only at the end of your billing cycle."
              ]
            }
          ]
        },
        {
          question: "What if Socialcrab has downtime?",
          answer: [
            { type: "text", content: "We strive to maintain reliable and continuous service. However, downtime may occur due to maintenance, upgrades, or third-party platform changes." },
            { type: "text", content: "Service Commitment: We make commercially reasonable efforts to ensure availability." },
            { type: "text", content: "Downtime Definition: Complete inability to generate reports, excluding scheduled maintenance or interruptions beyond our control." },
            { type: "text", content: "Compensation: If unavailable for 5+ consecutive days, you may request replacement tokens as credits (not cash). Send requests within 14 days of outage to contact@socialcrab.id." },
            { type: "text", content: "Exclusions: Issues caused by third-party platforms, internet issues, misuse, or force majeure do not qualify." }
          ]
        },
        {
          question: "How do plan upgrades and downgrades work?",
          answer: [
            { type: "text", content: "Upgrades can be made anytime. A new billing cycle begins immediately under the upgraded plan. Remaining time/credits are forfeited." },
            { type: "text", content: "Downgrades (monthly): Only at cycle end. You must cancel then re-subscribe. Unused credits are forfeited." },
            { type: "text", content: "Downgrades (annual): Commitment is 12 months. Effective only at cycle end. Early cancellation does not entitle a refund." }
          ]
        },
        {
          question: "How do I cancel my subscription?",
          answer: [
            { type: "text", content: "Cancel via account settings at least 3 working days before billing. We may suspend/terminate accounts for violations. Upon termination, access ends and data may be deleted. Payments are non-refundable." }
          ]
        },
        {
          question: "Who owns Socialcrab's intellectual property?",
          answer: [
            { type: "text", content: "The Socialcrab name, logo, and trademarks are owned by us. You may not use our marks or copy parts of the Services without consent. All goodwill benefits us exclusively." }
          ]
        },
        {
          question: "What warranties does Socialcrab provide?",
          answer: [
            { type: "text", content: "The Services are provided \"as is\" and \"as available.\" We disclaim all warranties, including merchantability, fitness, and non-infringement. We do not guarantee uninterrupted service." }
          ]
        },
        {
          question: "What is Socialcrab's liability limit?",
          answer: [
            { type: "text", content: "To the fullest extent permitted by law: Socialcrab is not liable for indirect or consequential damages. Our maximum liability is the greater of USD $100 or the amount you paid in the last 30 days." }
          ]
        },
        {
          question: "How are disputes resolved?",
          answer: [
            { type: "text", content: "These Terms are governed by Indonesian law. Disputes will be resolved through arbitration at BANI in South Jakarta. Claims must be made individually, not as class actions." }
          ]
        },
        {
          question: "What other general conditions apply?",
          answer: [
            { type: "text", content: "Failure to enforce any provision does not waive our rights. If part of these Terms is unenforceable, the rest remains in effect. We are not responsible for delays outside our control. These Terms, with our Privacy Policy, form the full agreement." },
            { type: "text", content: "📧 Questions? Contact us at contact@socialcrab.id" }
          ]
        }
      ]
    }
  ];

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    setOpenIndex(0);
  };

  const toggleAccordion = (idx: number) => {
    setOpenIndex(idx);
  };

  const params = new URLSearchParams(window.location.search)

  useEffect(() => {



    if (params.get("pages") === "privacy_policy") {
      setCurrentTab(5)
    } else if (params.get("pages") === "tos") {
      setCurrentTab(6)
    } else {
      setCurrentTab(0)
    }

  }, [params.get("pages")])

  return (
    <div className="font-manrope">

      <div className="grid grid-cols-1 md:grid-cols-8 h-auto md:h-[500px]">

        {/* Mobile: dropdown */}
        <div className="md:hidden mb-4">
          <button>FAQ</button>
          <select
            value={currentTab}
            onChange={(e) => handleTabChange(Number(e.target.value))}
            className="w-full border rounded-lg p-2 text-neutral-700 focus:ring-2 focus:ring-blue-500"
          >

            {faqData.map((label: faqDataInt, index: number) => (
              <option key={label.id} value={index}>
                {label.tab}
              </option>
            ))}
          </select>
        </div>

        {/* Tablet/Desktop: vertical tabs with animated indicator */}
        <div className="hidden md:flex relative flex-col justify-start w-[220px] lg:w-[252px] h-full md:col-span-2">
          <motion.div
            layout
            initial={false}
            animate={{ y: currentTab * 58 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 w-[4px] h-[58px] bg-blue-600 rounded-l-lg mt-16"
            style={{ opacity: currentTab > 4 ? 0 : 100 }}
          />
          <button className={`mr-auto font-bold py-6 ${currentTab < 5 ? "text-blue-600" : ""}`} onClick={() => handleTabChange(0)}>FAQ</button>
          {faqData.map((label: faqDataInt, index: number) => (
            <button
              key={"button_no" + index}
              onClick={() => handleTabChange(index)}
              className={`relative w-full h-[58px] px-4 py-3 text-left transition-colors ${index === currentTab
                  ? "text-blue-600 font-semibold"
                  : "text-neutral-600 hover:text-blue-500"
                } ${label.tab ? "" : "hidden"}`}
            >
              {label.tab}
            </button>
          ))}
          <button className={`mr-auto font-bold py-6 ${currentTab === 5 ? "text-blue-600" : ""}`} onClick={() => handleTabChange(5)} >Privacy Policy</button>
          <button className={`mr-auto font-bold py-6 ${currentTab === 6 ? "text-blue-600" : ""}`} onClick={() => handleTabChange(6)}>Term of Service</button>
        </div>


        {/* Questions */}
        <div className="col-span-6 w-full h-full overflow-y-auto p-2 md:p-4 lg:p-6">
          <h1 className="text-xl md:text-2xl font-medium mb-4">
            {faqData[currentTab].tab}
          </h1>

          <div className="border rounded-xl">
            {faqData[currentTab].question.map((faq: questionList, idx: number) => (
              <div key={"faq_" + idx} className="border-b">
                <button
                  className="w-full flex items-center text-left font-semibold p-3"
                  onClick={() => toggleAccordion(idx)}
                >
                  {/* Icon first */}
                  <motion.span
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mr-3 text-xl font-bold ${openIndex === idx ? "text-blue-600" : ""
                      }`}
                  >
                    {openIndex === idx ? "-" : "+"}
                  </motion.span>
                  <span
                    className={`${openIndex === idx ? "text-blue-600" : ""}`}
                  >
                    {faq.question}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-6 text-sm text-neutral-600 space-y-2">
                        {faq.answer.map((block, i) =>
                          block.type === "text" ? (
                            <p key={i}>{block.content}</p>
                          ) : (
                            <ul key={i} className="list-disc pl-6 space-y-1">
                              {(block.content as string[]).map((item, j) => (
                                <li key={j}>{item}</li>
                              ))}
                            </ul>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
