# 🚀 Server Deployment Guide

This guide will help you deploy your Saizgar Consultancy application to a production server.

## 📋 Prerequisites

- Ubuntu 20.04+ server
- Domain name pointing to your server
- SSH access to your server
- Git repository access

## 🔧 Server Setup

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Required Packages
```bash
sudo apt install -y python3 python3-pip python3-venv nodejs npm nginx postgresql postgresql-contrib git
```

### 3. Setup PostgreSQL Database
```bash
sudo -u postgres psql
CREATE DATABASE consultency_db;
CREATE USER consultency_user WITH PASSWORD 'consultency_password';
GRANT ALL PRIVILEGES ON DATABASE consultency_db TO consultency_user;
\q
```

## 📁 Application Deployment

### 1. Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/your-username/saizgar-consultancy.git
sudo chown -R $USER:$USER saizgar-consultancy
cd saizgar-consultancy
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create production environment file
cp env.example .env
# Edit .env with your production values

# Run migrations
python manage.py migrate
python manage.py collectstatic --noinput
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create production environment file
cp env.example .env.local
# Edit .env.local with your production values

# Build the application
npm run build
```

## 🔧 Environment Configuration

### Backend (.env)
```env
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,your-server-ip
DATABASE_URL=postgresql://consultency_user:consultency_password@localhost:5432/consultency_db
CORS_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🌐 Nginx Configuration

### 1. Create Nginx Site Configuration
```bash
sudo nano /etc/nginx/sites-available/saizgar-consultancy
```

### 2. Add Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /static/ {
        alias /var/www/saizgar-consultancy/backend/staticfiles/;
    }

    # Media files
    location /media/ {
        alias /var/www/saizgar-consultancy/backend/media/;
    }
}
```

### 3. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/saizgar-consultancy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔄 Process Management

### 1. Backend Service (Gunicorn)
```bash
# Install Gunicorn
pip install gunicorn

# Run backend
cd /var/www/saizgar-consultancy/backend
source venv/bin/activate
gunicorn config.wsgi:application --bind 127.0.0.1:8000 --daemon
```

### 2. Frontend Service (PM2)
```bash
# Install PM2
npm install -g pm2

# Run frontend
cd /var/www/saizgar-consultancy/frontend
pm2 start npm --name "saizgar-frontend" -- start
pm2 save
pm2 startup
```

## 🔒 SSL Certificate (Let's Encrypt)

### 1. Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 📊 Monitoring & Maintenance

### 1. Check Services
```bash
# Check Nginx
sudo systemctl status nginx

# Check PM2 processes
pm2 status

# Check logs
pm2 logs saizgar-frontend
tail -f /var/log/nginx/error.log
```

### 2. Update Application
```bash
cd /var/www/saizgar-consultancy
git pull origin main

# Backend update
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Frontend update
cd ../frontend
npm install
npm run build
pm2 restart saizgar-frontend
```

## 🐳 Docker Deployment (Alternative)

### 1. Using Docker Compose
```bash
# Copy environment files
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env.local

# Edit environment files with production values

# Start services
docker-compose up -d
```

### 2. Using Dockerfile
```bash
# Build and run
docker build -t saizgar-consultancy .
docker run -p 8000:8000 -p 3000:3000 saizgar-consultancy
```

## 🔧 Troubleshooting

### Common Issues:

1. **Permission Errors**: Ensure proper file ownership
   ```bash
   sudo chown -R www-data:www-data /var/www/saizgar-consultancy
   ```

2. **Database Connection**: Check PostgreSQL service
   ```bash
   sudo systemctl status postgresql
   ```

3. **Port Conflicts**: Check if ports are in use
   ```bash
   sudo netstat -tlnp | grep :8000
   sudo netstat -tlnp | grep :3000
   ```

4. **Nginx Errors**: Check configuration
   ```bash
   sudo nginx -t
   sudo tail -f /var/log/nginx/error.log
   ```

## 📝 Notes

- Replace `your-domain.com` with your actual domain
- Replace `your-server-ip` with your server's IP address
- Update database credentials in production
- Use strong passwords and secret keys
- Enable firewall and security measures
- Regular backups of database and media files

## 🆘 Support

If you encounter issues:
1. Check logs for error messages
2. Verify all environment variables
3. Ensure all services are running
4. Check network connectivity
5. Verify file permissions
