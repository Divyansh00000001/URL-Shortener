# URL Shortener

A full-stack URL Shortener application built with React.js (Vite) and Django REST Framework that enables users to create, manage, and track shortened URLs. The platform supports custom aliases, QR code generation, click analytics, and expiry-based link management while leveraging Redis caching for high-performance URL redirection.

## Features

* Create shortened URLs from long links
* Custom alias support for branded URLs
* Automatic URL redirection
* Expiry-based link management
* Click analytics and visit tracking
* QR code generation for every shortened URL
* Copy-to-clipboard functionality
* High-performance URL lookups using Redis caching
* RESTful API architecture
* Dockerized deployment with Docker Compose

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML/CSS

### Backend

* Django
* Django REST Framework

### Database & Caching

* PostgreSQL
* Redis

### DevOps

* Docker
* Docker Compose

## Architecture

```text
Frontend (React + Vite)
          │
          ▼
Django REST API
          │
 ┌────────┴────────┐
 ▼                 ▼
PostgreSQL       Redis
(Storage)       (Caching)
```

## Key Highlights

* Implemented custom URL aliases and expiry-based link management.
* Built analytics functionality to track click counts and link usage.
* Integrated QR code generation and copy-to-clipboard features for enhanced user experience.
* Used Redis caching to significantly reduce URL lookup latency and improve redirect performance.
* Designed scalable RESTful APIs using Django REST Framework and PostgreSQL.
* Containerized the complete application stack using Docker and Docker Compose for consistent deployment across environments.

## Getting Started

### Prerequisites

* Docker
* Docker Compose

### Run with Docker

```bash
git clone https://github.com/Divyansh00000001/URL-Shortener.git
cd URL-Shortener

docker-compose up --build
```

The application will be available after the containers start successfully.

## Future Enhancements

* User authentication and authorization
* Custom domains for shortened URLs
* Advanced analytics dashboard
* Rate limiting and abuse prevention
* Password-protected links
* Link expiration notifications

## Author

Divyansh Chauhan
