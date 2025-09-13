#!/bin/bash

# Simple deployment script for IP-only access
# Replace YOUR_SERVER_IP with your actual server IP

echo "🚀 Starting simple deployment..."

# Update system
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# Install required packages
echo "🔧 Installing packages..."
sudo apt install -y python3 python3-pip python3-venv nodejs npm nginx git

# Server IP
SERVER_IP="13.49.178.174"

# Create application directory
echo "📁 Setting up application..."
sudo mkdir -p /var/www/saizgar-consultancy
sudo chown -R $USER:$USER /var/www/saizgar-consultancy
cd /var/www/saizgar-consultancy

# Clone repository
echo "📥 Cloning repository..."
if [ -d ".git" ]; then
    git pull origin main
else
    git clone https://github.com/Wajahat-Infinity/saizgar_consultancy.git .
fi

# Using SQLite - no database setup needed
echo "🗄️ Using SQLite database (no setup required)..."

# Backend setup
echo "🐍 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# No environment file needed - using default SQLite settings

# Run migrations
python manage.py migrate
python manage.py collectstatic --noinput

# Frontend setup
echo "⚛️ Setting up frontend..."
cd ../frontend
npm install

# Create frontend environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://$SERVER_IP:8000
NEXT_PUBLIC_SITE_URL=http://$SERVER_IP:3000
EOF

# Build frontend
npm run build

# Setup Nginx
echo "🌐 Setting up Nginx..."
sudo tee /etc/nginx/sites-available/saizgar-consultancy << EOF
server {
    listen 80;
    server_name $SERVER_IP;

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
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Install PM2 for process management
echo "🔄 Setting up PM2..."
sudo npm install -g pm2

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'saizgar-backend',
      cwd: '/var/www/saizgar-consultancy/backend',
      script: 'venv/bin/gunicorn',
      args: 'config.wsgi:application --bind 127.0.0.1:8000',
      env: {
        DJANGO_SETTINGS_MODULE: 'config.settings'
      }
    },
    {
      name: 'saizgar-frontend',
      cwd: '/var/www/saizgar-consultancy/frontend',
      script: 'npm',
      args: 'start'
    }
  ]
};
EOF

# Start services
echo "🚀 Starting services..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Deployment completed!"
echo "🌐 Your application is available at: http://$SERVER_IP"
echo "📊 Check status: pm2 status"
echo "📝 View logs: pm2 logs"
