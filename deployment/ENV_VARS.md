# Environment Variables

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

## Deployment Notes

The application is configured for direct container access:
- Frontend is accessible on port 3001
- Backend API is accessible on port 8001
- Database is internal to the Docker network

For production deployment on Elestio:
- Frontend URL: https://dynamosoftware.chat-dev.uruenterprises.com
- Backend URL: https://api.dynamosoftware.chat-dev.uruenterprises.com

## Security Notes

- The JWT_SECRET should be a strong, randomly generated string
- The DB_PASSWORD should be a strong, randomly generated password
- API keys for OpenAI are stored client-side only and never sent to the server
- All communication must be over HTTPS in production
