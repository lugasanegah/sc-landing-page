# Environment Setup Guide

## Overview

This project uses environment variables for configuration. All sensitive data like database credentials, API keys, and secrets are stored in environment variables instead of being hardcoded in the source code.

## Quick Start

1. **Copy the example environment file:**
   ```bash
   cp env.example .env
   ```

2. **Edit the `.env` file with your actual values:**
   ```bash
   nano .env
   ```

3. **For development, you can use the provided development file:**
   ```bash
   cp env.development .env
   ```

## Environment Variables

### Required Variables

#### Database Configuration
- `MONGODB_URI`: MongoDB connection string for user management and admin features
- `DATABASE_URL`: PostgreSQL/Neon database URL for demo requests and blog posts

#### JWT Configuration
- `JWT_SECRET`: Secret key for JWT token signing (change in production!)

#### AWS S3 Configuration (for file uploads)
- `AWS_ACCESS_KEY_ID`: AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key
- `AWS_S3_REGION`: AWS S3 region (default: ap-southeast-1)
- `AWS_S3_BUCKET_NAME`: AWS S3 bucket name

### Optional Variables

#### Server Configuration
- `PORT`: Server port (default: 5000)
- `HOST`: Server host (default: 0.0.0.0)

#### Session Configuration
- `SESSION_SECRET`: Secret for session management

#### CORS Configuration
- `CORS_ORIGIN`: Allowed origins (comma-separated)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS`: Rate limit window in milliseconds (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window (default: 100)

#### Logging
- `LOG_LEVEL`: Log level (default: info)

#### Development
- `SKIP_DB_CONNECTION`: Skip database connection in development (default: false)
- `DEBUG`: Enable debug mode (default: false)

#### Admin Credentials (for initial setup)
- `ADMIN_USERNAME`: Admin username (default: admin)
- `ADMIN_EMAIL`: Admin email (default: admin@socialcrab.id)
- `ADMIN_PASSWORD`: Admin password (default: admin123)
- `ADMIN_ROLE`: Admin role (default: super_admin)

## Development vs Production

### Development Mode
- Database connections are optional
- AWS S3 validation is skipped
- Uses development-friendly defaults
- Debug mode enabled

### Production Mode
- All required environment variables must be set
- Database connections are mandatory
- AWS S3 credentials are validated
- Strict error handling

## Running the Application

### Development
```bash
npm run dev
```
This will automatically load environment variables from `env.development` if `.env` doesn't exist.

### Production
```bash
npm run build
npm run start
```
Make sure to set up a proper `.env` file with all required variables.

## Security Best Practices

1. **Never commit `.env` files to version control**
2. **Use strong, unique secrets for JWT_SECRET**
3. **Rotate AWS credentials regularly**
4. **Use environment-specific configurations**
5. **Validate all environment variables in production**

## Troubleshooting

### Common Issues

1. **"MONGODB_URI must be set"**
   - Set the `MONGODB_URI` environment variable
   - Or use development mode which skips database connection

2. **"AWS credentials must be set"**
   - Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
   - Or use development mode which skips AWS validation

3. **"JWT_SECRET must be set"**
   - Set the `JWT_SECRET` environment variable

### Development Mode
If you're having issues with missing credentials in development, the application is designed to work without them. Make sure you're running in development mode:

```bash
NODE_ENV=development npm run dev
```

## File Structure

- `env.example`: Template with all available environment variables
- `env.development`: Development configuration with safe defaults
- `.env`: Your actual environment file (not in version control)
- `.gitignore`: Ensures `.env` files are not committed

## Environment Variable Sources

The application loads environment variables in this order:
1. System environment variables
2. `.env` file (if exists)
3. `env.development` file (for development mode)
4. Default values (where applicable) 