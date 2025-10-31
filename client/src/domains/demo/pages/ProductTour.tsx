import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/domains/shared/components/ui/card";
import { Button } from "@/domains/shared/components/ui/button";
import { Badge } from "@/domains/shared/components/ui/badge";
import { useToast } from "@/domains/shared/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/domains/shared/components/ui/form";
import { Input } from "@/domains/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/domains/shared/components/ui/select";
import { TickCircle } from "iconsax-react";

const demoRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company / Project name must be at least 2 characters"),
  goals: z.string().min(5, "Please describe your goals (minimum 5 characters)"),
  preferredDemoTime: z.string().optional(),
});

type DemoRequestForm = z.infer<typeof demoRequestSchema>;

export default function ProductTour() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoRequestForm>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      goals: "",
      preferredDemoTime: "",
    },
  });

  const demoTimes = [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 8:00 PM)",
    "I'm flexible with timing",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-prelinecowhite flex items-center justify-center py-20 px-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <TickCircle size={32} className="text-green-600" />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl md:text-[28px] font-bold text-prelinecomirage font-manrope">
                Session Request Submitted Successfully!
              </h1>
              <p className="text-lg text-prelinecopale-sky font-inter">
                Thank you for your interest in SocialCrab. Our team will contact you within 24 hours to schedule your live product tour.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-prelinecoathens-gray rounded-lg">
              <h3 className="font-semibold text-prelinecomirage font-inter">What happens next?</h3>
              <ul className="text-sm text-prelinecopale-sky font-inter space-y-1">
                <li>• Our team will email you within 24 hours</li>
                <li>• We’ll schedule a 30-minute walkthrough</li>
                <li>• You’ll see SocialCrab in action with your use case</li>
                <li>• Get answers to all your questions</li>
              </ul>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-prelinecoblue-ribbon hover:bg-prelinecoblue-ribbon/90 text-prelinecowhite"
            >
              Back to Homepage
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prelinecowhite">
      {/* Hero Section */}
      <div className="flex flex-col items-center w-full py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-prelinecoathens-gray to-prelinecowhite">
        <div className="flex flex-col max-w-4xl mx-auto items-center gap-8 text-center">
          <Badge variant="outline" className="text-prelinecoblue-ribbon border-prelinecoblue-ribbon">
            Product Tour
          </Badge>
          <h1 className="text-4xl md:text-[48px] font-bold text-prelinecomirage leading-tight font-manrope">
            From Data to Decision — Live
          </h1>
          <p className="text-lg md:text-[18px] font-normal text-prelinecopale-sky leading-relaxed font-inter max-w-3xl">
            Join a 30-minute session where we demonstrate how SocialCrab transforms raw social data into actionable insights for your brand or community.
          </p>
        </div>
      </div>

      {/* Demo Form */}
      <div className="flex flex-col max-w-4xl mx-auto items-start gap-12 py-20 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 w-full">
          {/* Form */}
          <div className="flex-1">
            <Card className="p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-prelinecomirage font-manrope">
                    Book Your Session
                  </h2>
                  <p className="text-prelinecopale-sky font-inter">
                    Fill out the form and we’ll get back to you within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company / Project Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goals *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="What do you hope to achieve?" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredDemoTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Session Time (optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {demoTimes.map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-prelinecoblue-ribbon hover:bg-prelinecoblue-ribbon/90 text-prelinecowhite"
                    >
                      Book a Session
                    </Button>
                  </form>
                </Form>
              </div>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="w-full lg:w-80">
            <div className="flex flex-col gap-6">
              <Card className="p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-prelinecomirage font-manrope">
                    What to Expect
                  </h3>
                  <ul className="space-y-3 text-sm text-prelinecopale-sky font-inter">
                    <li>• A 30-minute walkthrough of SocialCrab</li>
                    <li>• See your use case in action</li>
                    <li>• Q&A with our team</li>
                    <li>• No sales pressure — just insights</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-prelinecomirage font-manrope">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm text-prelinecopale-sky font-inter">
                    <div>
                      <strong className="text-prelinecomirage">Email:</strong><br />
                      contact@socialcrab.id
                    </div>
                    <div>
                      <strong className="text-prelinecomirage">Response Time:</strong><br />
                      Within 24 hours
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
