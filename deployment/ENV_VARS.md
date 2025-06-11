# Environment Variables Documentation

This document describes the environment variables used in the Uru ChatGPT Interface project.

## Frontend Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| NEXT_PUBLIC_API_URL | URL of the backend API | Yes | http://localhost:8001/api |

## Backend Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL connection string | Yes | postgresql+asyncpg://postgres:postgres@localhost/uru_chatbot |
| SECRET_KEY | Secret key for JWT token generation | Yes | development_secret_key |
| ALGORITHM | Algorithm for JWT token generation | No | HS256 |
| ACCESS_TOKEN_EXPIRE_MINUTES | JWT token expiration time in minutes | No | 30 |
| CORS_ORIGINS | List of allowed CORS origins | Yes | ["http://localhost:3001"] |

## Database Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| POSTGRES_USER | PostgreSQL username | Yes | postgres |
| POSTGRES_PASSWORD | PostgreSQL password | Yes | postgres |
| POSTGRES_DB | PostgreSQL database name | Yes | uru_chatbot |

## Deployment Environment Variables

These variables are used in the Elestio deployment configuration:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| INSTANCE | Instance name for subdomain | Yes | - |
| JWT_SECRET | Secret key for JWT token generation | Yes | - |
| DB_USER | Database username | Yes | postgres |
| DB_PASSWORD | Database password | Yes | - |
| DB_NAME | Database name | Yes | uru_chatbot |

## Security Notes

- The JWT_SECRET should be a strong, randomly generated string
- The DB_PASSWORD should be a strong, randomly generated password
- API keys for OpenAI are stored client-side only and never sent to the server
- All communication must be over HTTPS in production
