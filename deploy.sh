#!/bin/bash

# Deployment script for production server

echo "🚀 Starting deployment process..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "🔧 Installing required packages..."
sudo apt install -y python3 python3-pip python3-venv nodejs npm nginx postgresql postgresql-contrib

# Create application directory
echo "📁 Setting up application directory..."
sudo mkdir -p /var/www/saizgar-consultancy
sudo chown -R $USER:$USER /var/www/saizgar-consultancy

# Navigate to application directory
cd /var/www/saizgar-consultancy

# Clone or update repository
echo "📥 Cloning/updating repository..."
if [ -d ".git" ]; then
    git pull origin main
else
    git clone https://github.com/your-username/saizgar-consultancy.git .
fi

# Backend setup
echo "🐍 Setting up Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create production environment file
echo "⚙️ Creating production environment file..."
cat > .env << EOF
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
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
EOF

# Run database migrations
echo "🗄️ Running database migrations..."
python manage.py migrate
python manage.py collectstatic --noinput

# Frontend setup
echo "⚛️ Setting up Next.js frontend..."
cd ../frontend
npm install
npm run build

# Create production environment file for frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EOF

# Setup systemd services
echo "🔧 Setting up systemd services..."

# Backend service
sudo tee /etc/systemd/system/saizgar-backend.service > /dev/null << EOF
[Unit]
Description=Saizgar Consultancy Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/saizgar-consultancy/backend
Environment=PATH=/var/www/saizgar-consultancy/backend/venv/bin
ExecStart=/var/www/saizgar-consultancy/backend/venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Frontend service
sudo tee /etc/systemd/system/saizgar-frontend.service > /dev/null << EOF
[Unit]
Description=Saizgar Consultancy Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/saizgar-consultancy/frontend
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Setup Nginx
echo "🌐 Setting up Nginx..."
sudo tee /etc/nginx/sites-available/saizgar-consultancy << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
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
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/saizgar-consultancy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Start services
echo "🚀 Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable saizgar-backend saizgar-frontend
sudo systemctl start saizgar-backend saizgar-frontend

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at: http://your-domain.com"
echo "📊 Check service status with: sudo systemctl status saizgar-backend saizgar-frontend"
