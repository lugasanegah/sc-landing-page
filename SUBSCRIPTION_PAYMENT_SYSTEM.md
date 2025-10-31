# 🚀 Subscription Payment System with Xendit Integration

## 📋 Overview

Sistem payment subscription untuk Socialcrab yang terintegrasi dengan Xendit untuk mengelola pricing plan berdasarkan spreadsheet yang ada. Sistem ini memungkinkan admin untuk mengelola subscription plans dengan fitur CRUD lengkap.

## 🏗️ Architecture

### Backend Structure
```
server/
├── services/
│   ├── xendit.service.ts          # Xendit API integration
│   └── subscriptionPlan.service.ts # Business logic for plans
├── controllers/
│   └── subscriptionPlanController.ts # HTTP request handlers
├── routes/
│   └── admin/
│       └── subscriptionPlanRoutes.ts # API endpoints
└── scripts/
    └── seedSubscriptionPlans.ts   # Initial data seeding
```

### Frontend Structure
```
client/src/domains/admin/
├── pages/
│   └── SubscriptionPlanManagementPage.tsx # Main admin page
└── components/
    ├── SubscriptionPlanForm.tsx   # Create/Edit form
    ├── SubscriptionPlanTable.tsx  # Table view
    ├── SubscriptionPlanCard.tsx   # Card view
    └── FeatureEditor.tsx          # Feature management
```

### Database Schema
```sql
-- Subscription Plans
CREATE TABLE subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- MONTHLY, YEARLY
  price_usd DECIMAL(10,2) NOT NULL,
  price_idr DECIMAL(15,2) NOT NULL,
  price_promo_usd DECIMAL(10,2),
  price_promo_idr DECIMAL(15,2),
  xendit_plan_id VARCHAR(100),
  features JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Subscriptions
CREATE TABLE user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  plan_id INTEGER REFERENCES subscription_plans(id),
  xendit_subscription_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Setup & Installation

### 1. Environment Variables
Tambahkan ke file `.env`:
```bash
# Xendit Configuration
XENDIT_API_KEY=your-xendit-api-key-here
XENDIT_BASE_URL=https://api.xendit.co
XENDIT_WEBHOOK_SECRET=your-webhook-secret-here
```

### 2. Install Dependencies
```bash
npm install preline axios
```

### 3. Database Migration
```bash
npm run db:push
```

### 4. Seed Initial Data
```bash
# Run the seed script
npx tsx server/scripts/seedSubscriptionPlans.ts
```

## 📊 Pricing Plans

Berdasarkan spreadsheet yang ada, sistem mendukung:

| Plan | Monthly (USD) | Yearly (USD) | Features |
|------|---------------|--------------|----------|
| **Basic** | Free | Free | 1 Profile Report, PDF Export |
| **Pro** | $37.95 | $30.36 | 5 Profile Reports, 3 Hashtag Reports |
| **Premium** | $79.55 | $63.64 | 7 Profile Reports, 5 Hashtag Reports, Excel Export |
| **Enterprise** | $129.35 | $103.48 | 10 Profile Reports, 8 Hashtag Reports, Priority Support |

## 🎯 Features

### Admin Management
- ✅ **Create Plans**: Buat subscription plan baru dengan form yang lengkap
- ✅ **Edit Plans**: Update existing plans dengan validasi
- ✅ **Delete Plans**: Deactivate plans (soft delete)
- ✅ **Duplicate Plans**: Duplicate existing plans untuk modifikasi
- ✅ **Feature Management**: Atur fitur-fitur per plan dengan interface yang user-friendly
- ✅ **Pricing Management**: Set harga USD & IDR, termasuk promo pricing
- ✅ **Status Management**: Active/Inactive plan status

### Xendit Integration
- ✅ **Auto-sync**: Otomatis sync dengan Xendit API
- ✅ **Plan Creation**: Create subscription plans di Xendit
- ✅ **Plan Updates**: Update plans di Xendit saat ada perubahan
- ✅ **Plan Deactivation**: Deactivate plans di Xendit
- ✅ **Error Handling**: Comprehensive error handling & logging

### UI/UX Features
- ✅ **Preline Components**: Modern UI menggunakan Preline design system
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Table & Card Views**: Toggle antara table dan card view
- ✅ **Advanced Filtering**: Filter by plan type dan status
- ✅ **Real-time Updates**: Auto-refresh setelah CRUD operations
- ✅ **Form Validation**: Client-side validation dengan error messages

## 🚀 API Endpoints

### Admin Routes
```
POST   /api/admin/subscription-plans/plans          # Create plan
GET    /api/admin/subscription-plans/plans          # Get all plans
GET    /api/admin/subscription-plans/plans/active   # Get active plans
GET    /api/admin/subscription-plans/plans/type/:type # Get plans by type
GET    /api/admin/subscription-plans/plans/:id      # Get plan by ID
PUT    /api/admin/subscription-plans/plans/:id      # Update plan
DELETE /api/admin/subscription-plans/plans/:id      # Deactivate plan
POST   /api/admin/subscription-plans/plans/:id/duplicate # Duplicate plan
```

### Request/Response Examples

#### Create Plan
```json
POST /api/admin/subscription-plans/plans
{
  "name": "Pro Plan",
  "type": "MONTHLY",
  "price_usd": 37.95,
  "price_idr": 573045,
  "price_promo_usd": 32.26,
  "price_promo_idr": 487088,
  "features": {
    "profile_reports": 5,
    "hashtag_reports": 3,
    "historical_data_profile": "500 Posts",
    "exports": ["PDF"],
    "processing_benefits": "Standard"
  }
}
```

#### Response
```json
{
  "success": true,
  "message": "Subscription plan created successfully",
  "data": {
    "id": 1,
    "name": "Pro Plan",
    "type": "MONTHLY",
    "price_usd": "37.95",
    "price_idr": "573045",
    "xendit_plan_id": "plan_123456",
    "features": { ... },
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## 🎨 UI Components

### SubscriptionPlanForm
- **Form Fields**: Name, Type, Pricing (USD/IDR), Promo Pricing, Features
- **Validation**: Required fields, price validation, feature validation
- **Feature Editor**: Tabbed interface untuk Basic, Advanced, dan Processing features
- **Responsive**: Mobile-friendly form layout

### FeatureEditor
- **Tabbed Interface**: 
  - Basic Features: Profile reports, hashtag reports, historical data
  - Advanced Features: Export formats, plan description
  - Processing: Processing benefits, additional features
- **Dynamic Features**: Add/remove export formats, toggle feature availability

### SubscriptionPlanTable
- **Data Display**: Plan details, pricing, features, status, dates
- **Actions**: Edit, duplicate, delete buttons
- **Status Badges**: Active/Inactive, Monthly/Yearly indicators
- **Responsive**: Horizontal scroll untuk mobile

### SubscriptionPlanCard
- **Card Layout**: Visual representation dengan pricing prominence
- **Feature Summary**: Key features dengan icons dan descriptions
- **Action Buttons**: Quick access to edit, duplicate, delete
- **Status Indicators**: Visual status dengan color coding

## 🔐 Security & Validation

### Input Validation
- **Required Fields**: Name, type, pricing
- **Price Validation**: Positive numbers, valid currency formats
- **Feature Validation**: Valid feature combinations
- **Type Validation**: MONTHLY/YEARLY only

### Xendit Integration Security
- **API Key Management**: Secure storage di environment variables
- **Basic Auth**: Base64 encoded API key authentication
- **HTTPS Only**: All API calls over secure connections
- **Error Handling**: Secure error messages tanpa exposing sensitive data

## 📱 Usage Guide

### 1. Access Admin Panel
```
Navigate to: /admin/subscription-plans
```

### 2. Create New Plan
1. Click "Create New Plan" button
2. Fill in basic information (name, type, pricing)
3. Configure features using the Feature Editor
4. Set promo pricing (optional)
5. Click "Create Plan"

### 3. Edit Existing Plan
1. Click edit button on any plan
2. Modify fields as needed
3. Update features if required
4. Click "Update Plan"

### 4. Duplicate Plan
1. Click duplicate button on any plan
2. Enter new plan name
3. Click "Duplicate"
4. Edit the duplicated plan as needed

### 5. Deactivate Plan
1. Click delete button on any plan
2. Confirm deactivation
3. Plan status changes to inactive

## 🧪 Testing

### Manual Testing
1. **Create Plan**: Test form validation dan submission
2. **Edit Plan**: Test update functionality
3. **Duplicate Plan**: Test duplication dengan nama baru
4. **Delete Plan**: Test deactivation
5. **Feature Editor**: Test semua tab dan feature toggles

### API Testing
```bash
# Test create plan
curl -X POST http://localhost:5000/api/admin/subscription-plans/plans \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Plan","type":"MONTHLY","price_usd":10,"price_idr":150000}'

# Test get all plans
curl http://localhost:5000/api/admin/subscription-plans/plans
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Xendit API Errors
- **Check API Key**: Verify XENDIT_API_KEY is set correctly
- **Check Base URL**: Ensure XENDIT_BASE_URL is correct
- **Check Permissions**: Verify API key has subscription plan permissions

#### 2. Database Errors
- **Check Connection**: Verify DATABASE_URL is correct
- **Run Migrations**: Execute `npm run db:push`
- **Check Schema**: Verify database schema matches code

#### 3. Frontend Issues
- **Check Console**: Look for JavaScript errors
- **Check Network**: Verify API calls are successful
- **Check Routes**: Ensure routing is configured correctly

### Debug Mode
Enable debug logging:
```bash
DEBUG=true npm run dev
```

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] **Webhook Integration**: Handle Xendit payment notifications
- [ ] **User Subscription Management**: Manage user subscriptions
- [ ] **Payment Processing**: Handle actual payments
- [ ] **Analytics Dashboard**: Subscription metrics dan insights

### Phase 3 Features
- [ ] **Multi-currency Support**: Support for more currencies
- [ ] **Advanced Billing**: Proration, upgrades, downgrades
- [ ] **Integration APIs**: Webhook endpoints untuk external systems
- [ ] **Audit Logging**: Track semua changes dan actions

## 📚 Resources

### Documentation
- [Xendit API Documentation](https://docs.xendit.co/apidocs)
- [Preline UI Components](https://preline.co/docs/index.html)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

### Support
- **Xendit Support**: [support@xendit.co](mailto:support@xendit.co)
- **Technical Issues**: Check GitHub issues atau create new one
- **Feature Requests**: Submit via GitHub discussions

---

**🎉 Congratulations!** You now have a fully functional subscription payment system integrated with Xendit. The system provides a comprehensive admin interface for managing subscription plans with modern UI/UX using Preline components. 