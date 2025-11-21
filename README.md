# Home IT Geek Website - Static Version

A static HTML/CSS/JavaScript version of the Home IT Geek website, containerized with Docker for deployment on AWS EC2 with ALB.

## Features

- Pure HTML, CSS, and JavaScript (no frameworks)
- Single-page application with client-side routing
- Responsive design for mobile and desktop
- Contact form with Formspree integration
- Docker containerized with nginx
- Health check endpoint for ALB
- Optimized for production deployment

## Local Development

1. Open `index.html` in a web browser, or
2. Use a local server: `python -m http.server 8000`

## Docker Deployment

### Build and run locally:
```bash
docker build -t home-it-website .
docker run -p 80:80 home-it-website
```

### Using docker-compose:
```bash
docker-compose up -d
```

## AWS EC2 Deployment

1. **Launch EC2 instance** with Docker installed
2. **Copy files** to EC2 instance
3. **Build and run** the container:
   ```bash
   docker build -t home-it-website .
   docker run -d -p 80:80 --restart unless-stopped home-it-website
   ```

## ALB Configuration

The nginx configuration includes a `/health` endpoint for ALB health checks:
- **Health Check Path**: `/health`
- **Health Check Port**: 80
- **Expected Response**: 200 OK

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── nginx.conf          # Nginx configuration
├── Dockerfile          # Docker build instructions
├── docker-compose.yml  # Local development
├── *.png, *.jpg        # Images from original site
└── favicon.ico         # Site favicon
```

## Form Submission

The contact form uses Formspree (https://formspree.io/f/mnnlqaay) for email delivery. Update the endpoint in `script.js` if needed.