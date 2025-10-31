import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
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
import { Textarea } from "@/domains/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/domains/shared/components/ui/select";
import { apiRequest } from "@/domains/shared/lib/queryClient";
import { TickCircle } from "iconsax-react";

const demoRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  country: z.string().min(1, "Please select your country"),
  companySize: z.string().min(1, "Please select your company size"),
  industry: z.string().min(1, "Please select your industry"),
  currentTools: z.string().optional(),
  challenges: z.string().min(10, "Please describe your challenges (minimum 10 characters)"),
  goals: z.string().min(10, "Please describe your goals (minimum 10 characters)"),
  preferredDemoTime: z.string().min(1, "Please select your preferred demo time"),
  additionalNotes: z.string().optional(),
});

type DemoRequestForm = z.infer<typeof demoRequestSchema>;

export default function GetDemoPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoRequestForm>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      jobTitle: "",
      country: "",
      companySize: "",
      industry: "",
      currentTools: "",
      challenges: "",
      goals: "",
      preferredDemoTime: "",
      additionalNotes: "",
    },
  });

  // const submitDemo = useMutation({
  //   mutationFn: async (data: DemoRequestForm) => {
  //     return await apiRequest("/api/demo-requests", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });
  //   },
  //   onSuccess: () => {
  //     setIsSubmitted(true);
  //     toast({
  //       title: "Demo Request Submitted!",
  //       description: "We'll contact you within 24 hours to schedule your personalized demo.",
  //     });
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: "Submission Failed",
  //       description: "Please try again or contact support if the issue persists.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // const onSubmit = (data: DemoRequestForm) => {
  //   submitDemo.mutate(data);
  // };

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Australia",
    "Singapore", "Japan", "South Korea", "Indonesia", "Malaysia", "Thailand",
    "Philippines", "Vietnam", "India", "Brazil", "Mexico", "Argentina",
    "Netherlands", "Sweden", "Norway", "Denmark", "Switzerland", "Italy",
    "Spain", "Portugal", "Belgium", "Austria", "Poland", "Czech Republic"
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees", 
    "51-200 employees",
    "201-1000 employees",
    "1000+ employees"
  ];

  const industries = [
    "E-commerce & Retail",
    "Technology & Software",
    "Marketing & Advertising",
    "Media & Entertainment",
    "Healthcare & Pharma",
    "Financial Services",
    "Education",
    "Non-profit",
    "Government",
    "Consulting",
    "Real Estate",
    "Travel & Hospitality",
    "Food & Beverage",
    "Fashion & Beauty",
    "Sports & Fitness",
    "Other"
  ];

  const demoTimes = [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)", 
    "Evening (5:00 PM - 8:00 PM)",
    "I'm flexible with timing"
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
                Demo Request Submitted Successfully!
              </h1>
              <p className="text-lg text-prelinecopale-sky font-inter">
                Thank you for your interest in SocialCrab. Our team will review your request and contact you within 24 hours to schedule your personalized demo.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-prelinecoathens-gray rounded-lg">
              <h3 className="font-semibold text-prelinecomirage font-inter">What happens next?</h3>
              <ul className="text-sm text-prelinecopale-sky font-inter space-y-1">
                <li>• Our demo specialist will email you within 24 hours</li>
                <li>• We'll schedule a 30-minute personalized demo</li>
                <li>• You'll see SocialCrab in action with your use case</li>
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
            Schedule Demo
          </Badge>
          <h1 className="text-4xl md:text-[48px] font-bold text-prelinecomirage leading-tight font-manrope">
            See SocialCrab in Action
          </h1>
          <p className="text-lg md:text-[18px] font-normal text-prelinecopale-sky leading-relaxed font-inter max-w-3xl">
            Book a personalized 30-minute demo and discover how SocialCrab can transform your social media analytics. Our experts will show you the platform using your specific use case.
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
                    Request Your Demo
                  </h2>
                  <p className="text-prelinecopale-sky font-inter">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> */}
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-prelinecomirage font-inter">Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} className="font-inter" />
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
                            <FormLabel className="text-prelinecomirage font-inter">Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} className="font-inter" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-prelinecomirage font-inter">Company Name *</FormLabel>
                            <FormControl>
                              <Input {...field} className="font-inter" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-prelinecomirage font-inter">Job Title *</FormLabel>
                            <FormControl>
                              <Input {...field} className="font-inter" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-prelinecomirage font-inter">Country *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="font-inter">
                                  <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem key={country} value={country}>{country}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-prelinecomirage font-inter">Company Size *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="font-inter">
                                  <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {companySizes.map((size) => (
                                  <SelectItem key={size} value={size}>{size}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-prelinecomirage font-inter">Industry *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="font-inter">
                                <SelectValue placeholder="Select your industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentTools"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-prelinecomirage font-inter">Current Analytics Tools</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Google Analytics, Hootsuite, Sprout Social" className="font-inter" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="challenges"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-prelinecomirage font-inter">Current Challenges *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="What are your biggest social media analytics challenges?"
                              className="font-inter min-h-[100px]"
                            />
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
                          <FormLabel className="text-prelinecomirage font-inter">Goals & Objectives *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="What do you hope to achieve with better social media analytics?"
                              className="font-inter min-h-[100px]"
                            />
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
                          <FormLabel className="text-prelinecomirage font-inter">Preferred Demo Time *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="font-inter">
                                <SelectValue placeholder="When works best for you?" />
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

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-prelinecomirage font-inter">Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Any specific features you'd like to see or questions you have?"
                              className="font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-prelinecoblue-ribbon hover:bg-prelinecoblue-ribbon/90 text-prelinecowhite"
                      // disabled={submitDemo.isPending}
                    >
                      {/* {submitDemo.isPending ? "Submitting..." : "Request Demo"} */}
                      "Request Demo"
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
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-prelinecoblue-ribbon rounded-full mt-2" />
                      30-minute personalized demonstration
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-prelinecoblue-ribbon rounded-full mt-2" />
                      See your specific use case in action
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-prelinecoblue-ribbon rounded-full mt-2" />
                      Q&A session with our experts
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-prelinecoblue-ribbon rounded-full mt-2" />
                      Custom pricing discussion
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-prelinecoblue-ribbon rounded-full mt-2" />
                      No sales pressure guarantee
                    </li>
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
                      demo@socialcrab.id
                    </div>
                    <div>
                      <strong className="text-prelinecomirage">Phone:</strong><br />
                      +1 (555) 123-4567
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