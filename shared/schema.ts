import mongoose, { Schema, Document } from 'mongoose';

// User interface
export interface IUser extends Document {
  username: string;
  password: string;
}

// Demo Request interface
export interface IDemoRequest extends Document {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  companySize: string;
  industry: string;
  currentTools?: string;
  challenges: string;
  goals: string;
  preferredDemoTime: string;
  additionalNotes?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Subscription Plan interface
export interface ISubscriptionPlan extends Document {
  name: string; // Basic, Pro, Premium, Enterprise
  type: 'MONTHLY' | 'YEARLY';
  price_usd: number;
  price_idr: number;
  price_promo_usd?: number;
  price_promo_idr?: number;
  xendit_plan_id?: string; // ID dari Xendit
  features: Record<string, any>; // JSON object untuk fitur-fitur
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// User Subscription interface
export interface IUserSubscription extends Document {
  user_id: mongoose.Types.ObjectId;
  plan_id: mongoose.Types.ObjectId;
  xendit_subscription_id?: string;
  status: string; // active, cancelled, expired
  start_date: Date;
  end_date?: Date;
  created_at: Date;
  updated_at: Date;
}

// User Schema
export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

// Demo Request Schema
export const DemoRequestSchema = new Schema<IDemoRequest>({
  fullName: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, maxlength: 255 },
  company: { type: String, required: true, maxlength: 255 },
  jobTitle: { type: String, required: true, maxlength: 255 },
  country: { type: String, required: true, maxlength: 100 },
  companySize: { type: String, required: true, maxlength: 50 },
  industry: { type: String, required: true, maxlength: 100 },
  currentTools: { type: String, maxlength: 500 },
  challenges: { type: String, required: true },
  goals: { type: String, required: true },
  preferredDemoTime: { type: String, required: true, maxlength: 100 },
  additionalNotes: String,
  status: { type: String, default: 'new', maxlength: 50 }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Subscription Plan Schema
export const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>({
  name: { type: String, required: true, maxlength: 100 },
  type: { type: String, required: true, enum: ['MONTHLY', 'YEARLY'], maxlength: 20 },
  price_usd: { type: Number, required: true, min: 0 },
  price_idr: { type: Number, required: true, min: 0 },
  price_promo_usd: { type: Number, min: 0 },
  price_promo_idr: { type: Number, min: 0 },
  xendit_plan_id: { type: String, maxlength: 100 },
  features: { type: Schema.Types.Mixed, required: true },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// User Subscription Schema
export const UserSubscriptionSchema = new Schema<IUserSubscription>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
  xendit_subscription_id: { type: String, maxlength: 100 },
  status: { type: String, default: 'active', maxlength: 50 },
  start_date: { type: Date, required: true },
  end_date: Date
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Create models
export const User = mongoose.model<IUser>('User', UserSchema);
export const DemoRequest = mongoose.model<IDemoRequest>('DemoRequest', DemoRequestSchema);
export const SubscriptionPlan = mongoose.model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);
export const UserSubscription = mongoose.model<IUserSubscription>('UserSubscription', UserSubscriptionSchema);

// Export types for use in other files
export type User = IUser;
export type DemoRequest = IDemoRequest;
export type SubscriptionPlan = ISubscriptionPlan;
export type UserSubscription = IUserSubscription;
export type InsertUser = Omit<IUser, keyof Document>;
export type InsertDemoRequest = Omit<IDemoRequest, keyof Document>;
export type InsertSubscriptionPlan = Omit<ISubscriptionPlan, keyof Document>;
export type InsertUserSubscription = Omit<IUserSubscription, keyof Document>;
