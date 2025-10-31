import mongoose from 'mongoose';
import { connectMongoDB } from '../db/mongodb';
import { SubscriptionPlan, ISubscriptionPlan } from '../../shared/schema';

const seedData = [
  // Basic Plan - Monthly
  {
    name: 'Basic',
    type: 'MONTHLY',
    price_usd: 29,
    price_idr: 435000,
    price_promo_usd: 19,
    price_promo_idr: 285000,
    features: {
      basic: {
        profile_reports: 5,
        hashtag_reports: 3,
        historical_data: '30 days',
        exports: ['PDF'],
        processing_benefits: 'Standard'
      },
      advanced: {
        competitor_analysis: false,
        trend_analysis: false,
        custom_insights: false
      },
      processing: {
        priority_support: false,
        dedicated_analyst: false,
        custom_reporting: false
      }
    },
    is_active: true
  },
  // Basic Plan - Yearly
  {
    name: 'Basic',
    type: 'YEARLY',
    price_usd: 290,
    price_idr: 4350000,
    price_promo_usd: 190,
    price_promo_idr: 2850000,
    features: {
      basic: {
        profile_reports: 5,
        hashtag_reports: 3,
        historical_data: '30 days',
        exports: ['PDF'],
        processing_benefits: 'Standard'
      },
      advanced: {
        competitor_analysis: false,
        trend_analysis: false,
        custom_insights: false
      },
      processing: {
        priority_support: false,
        dedicated_analyst: false,
        custom_reporting: false
      }
    },
    is_active: true
  },
  // Pro Plan - Monthly
  {
    name: 'Pro',
    type: 'MONTHLY',
    price_usd: 79,
    price_idr: 1185000,
    price_promo_usd: 59,
    price_promo_idr: 885000,
    features: {
      basic: {
        profile_reports: 20,
        hashtag_reports: 10,
        historical_data: '90 days',
        exports: ['PDF', 'Excel'],
        processing_benefits: 'Fast'
      },
      advanced: {
        competitor_analysis: true,
        trend_analysis: true,
        custom_insights: false
      },
      processing: {
        priority_support: false,
        dedicated_analyst: false,
        custom_reporting: false
      }
    },
    is_active: true
  },
  // Pro Plan - Yearly
  {
    name: 'Pro',
    type: 'YEARLY',
    price_usd: 790,
    price_idr: 11850000,
    price_promo_usd: 590,
    price_promo_idr: 8850000,
    features: {
      basic: {
        profile_reports: 20,
        hashtag_reports: 10,
        historical_data: '90 days',
        exports: ['PDF', 'Excel'],
        processing_benefits: 'Fast'
      },
      advanced: {
        competitor_analysis: true,
        trend_analysis: true,
        custom_insights: false
      },
      processing: {
        priority_support: false,
        dedicated_analyst: false,
        custom_reporting: false
      }
    },
    is_active: true
  },
  // Premium Plan - Monthly
  {
    name: 'Premium',
    type: 'MONTHLY',
    price_usd: 199,
    price_idr: 2985000,
    price_promo_usd: 149,
    price_promo_idr: 2235000,
    features: {
      basic: {
        profile_reports: 50,
        hashtag_reports: 25,
        historical_data: '180 days',
        exports: ['PDF', 'Excel', 'CSV'],
        processing_benefits: 'Very Fast'
      },
      advanced: {
        competitor_analysis: true,
        trend_analysis: true,
        custom_insights: true
      },
      processing: {
        priority_support: true,
        dedicated_analyst: false,
        custom_reporting: false
      }
    },
    is_active: true
  },
  // Premium Plan - Yearly
  {
    name: 'Premium',
    type: 'YEARLY',
    price_usd: 1990,
    price_idr: 29850000,
    price_promo_usd: 1490,
    price_promo_idr: 22350000,
    features: {
      basic: {
        profile_reports: 50,
        hashtag_reports: 25,
        historical_data: '180 days',
        exports: ['PDF', 'Excel', 'CSV'],
        processing_benefits: 'Very Fast'
      },
      advanced: {
        competitor_analysis: true,
        trend_analysis: true,
        custom_insights: true
      },
      processing: {
        priority_support: true,
        dedicated_analyst: false,
        custom_reporting: false
      }
    },
    is_active: true
  },
  // Enterprise Plan - Monthly
  {
    name: 'Enterprise',
    type: 'MONTHLY',
    price_usd: 499,
    price_idr: 7485000,
    price_promo_usd: 399,
    price_promo_idr: 5985000,
    features: {
      basic: {
        profile_reports: 'Unlimited',
        hashtag_reports: 'Unlimited',
        historical_data: '365 days',
        exports: ['PDF', 'Excel', 'CSV', 'API'],
        processing_benefits: 'Instant'
      },
      advanced: {
        competitor_analysis: true,
        trend_analysis: true,
        custom_insights: true
      },
      processing: {
        priority_support: true,
        dedicated_analyst: true,
        custom_reporting: true
      }
    },
    is_active: true
  },
  // Enterprise Plan - Yearly
  {
    name: 'Enterprise',
    type: 'YEARLY',
    price_usd: 4990,
    price_idr: 74850000,
    price_promo_usd: 3990,
    price_promo_idr: 59850000,
    features: {
      basic: {
        profile_reports: 'Unlimited',
        hashtag_reports: 'Unlimited',
        historical_data: '365 days',
        exports: ['PDF', 'Excel', 'CSV', 'API'],
        processing_benefits: 'Instant'
      },
      advanced: {
        competitor_analysis: true,
        trend_analysis: true,
        custom_insights: true
      },
      processing: {
        priority_support: true,
        dedicated_analyst: true,
        custom_reporting: true
      }
    },
    is_active: true
  }
];

async function seedSubscriptionPlans() {
  try {
    console.log('🌱 Starting subscription plans seed...');
    
    // Connect to MongoDB
    await connectMongoDB();
    
    // Clear existing data
    await SubscriptionPlan.deleteMany({});
    console.log('🗑️  Cleared existing subscription plans');
    
    // Insert new data
    const insertedPlans = await SubscriptionPlan.insertMany(seedData);
    console.log(`✅ Successfully seeded ${insertedPlans.length} subscription plans:`);
    
    insertedPlans.forEach((plan: any) => {
      console.log(`   - ${plan.name} (${plan.type}): $${plan.price_usd} / Rp${plan.price_idr}`);
    });
    
    console.log('🎉 Subscription plans seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding subscription plans:', error);
    throw error;
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

if (require.main === module) {
  seedSubscriptionPlans()
    .then(() => {
      console.log('Seed completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

export { seedSubscriptionPlans }; 