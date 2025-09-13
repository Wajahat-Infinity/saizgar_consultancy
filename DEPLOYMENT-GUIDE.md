# 🚀 Complete Deployment Guide for Saizgar Consultancy

**Server IP**: `13.49.178.174`  
**Final URL**: `http://13.49.178.174`

## 📋 Quick Start (One Command)

```bash
# 1. Upload files to your server
# 2. Run this command:
chmod +x deploy-simple.sh && ./deploy-simple.sh
```

That's it! Your application will be available at `http://13.49.178.174`

## 🔧 What the Script Does

1. **Updates system** and installs required packages
2. **Sets up Python** virtual environment
3. **Installs Node.js** and npm
4. **Configures Nginx** reverse proxy
5. **Builds frontend** and backend
6. **Starts services** with PM2
7. **Creates SQLite database** automatically

## 📦 Required Packages

- Python 3 + pip + venv
- Node.js + npm
- Nginx
- Git
- PM2 (installed by script)

## 🌐 After Deployment

Your application will be available at:
- **Main Site**: `http://13.49.178.174`
- **API**: `http://13.49.178.174/api/`
- **Admin**: `http://13.49.178.174/admin/`

## 🔄 Management Commands

### Check Status
```bash
pm2 status
```

### View Logs
```bash
pm2 logs
pm2 logs saizgar-backend
pm2 logs saizgar-frontend
```

### Restart Services
```bash
pm2 restart all
pm2 restart saizgar-backend
pm2 restart saizgar-frontend
```

### Stop Services
```bash
pm2 stop all
```

### Start Services
```bash
pm2 start all
```

## 📝 Update Your Application

```bash
cd /var/www/saizgar-consultancy

# Pull latest changes
git pull origin main

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Update frontend
cd ../frontend
npm install
npm run build

# Restart services
pm2 restart all
```

## 🗄️ Database

- **Type**: SQLite
- **File**: `/var/www/saizgar-consultancy/backend/db.sqlite3`
- **Admin**: `http://13.49.178.174/admin/`
- **Migrations**: Run automatically on deployment

## 📁 File Structure

```
/var/www/saizgar-consultancy/
├── backend/
│   ├── venv/                 # Python virtual environment
│   ├── db.sqlite3           # SQLite database
│   ├── staticfiles/         # Static files
│   └── media/               # Media files
├── frontend/
│   ├── .next/               # Built Next.js app
│   └── node_modules/        # Node.js dependencies
└── ecosystem.config.js      # PM2 configuration
```

## 🔒 Security Notes

- **Firewall**: Ensure ports 80 and 443 are open
- **SSH**: Use key-based authentication
- **Updates**: Keep system updated
- **Backups**: Regular database backups recommended

## 🆘 Troubleshooting

### Check if services are running
```bash
pm2 status
sudo systemctl status nginx
```

### Check logs for errors
```bash
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

### Check if ports are listening
```bash
sudo netstat -tlnp | grep :8000  # Backend
sudo netstat -tlnp | grep :3000  # Frontend
sudo netstat -tlnp | grep :80    # Nginx
```

### Test database
```bash
cd /var/www/saizgar-consultancy/backend
source venv/bin/activate
python manage.py dbshell
```

### Restart everything
```bash
pm2 restart all
sudo systemctl restart nginx
```

## 🔧 Manual Setup (If Script Fails)

### 1. Install Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-pip python3-venv nodejs npm nginx git
```

### 2. Setup Application
```bash
cd /var/www
sudo git clone https://github.com/your-username/saizgar-consultancy.git
sudo chown -R $USER:$USER saizgar-consultancy
cd saizgar-consultancy
```

### 3. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run build
```

### 5. Setup Nginx
```bash
sudo tee /etc/nginx/sites-available/saizgar-consultancy << 'EOF'
server {
    listen 80;
    server_name 13.49.178.174;

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

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/saizgar-consultancy/backend/staticfiles/;
    }

    location /media/ {
        alias /var/www/saizgar-consultancy/backend/media/;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/saizgar-consultancy /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Install PM2 and Start Services
```bash
sudo npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📊 Monitoring

### Check Application Status
```bash
# All services
pm2 status

# Individual services
pm2 status saizgar-backend
pm2 status saizgar-frontend

# System resources
pm2 monit
```

### View Real-time Logs
```bash
# All logs
pm2 logs

# Specific service logs
pm2 logs saizgar-backend --lines 50
pm2 logs saizgar-frontend --lines 50

# Follow logs in real-time
pm2 logs --follow
```

## 🔄 Backup & Restore

### Backup Database
```bash
cp /var/www/saizgar-consultancy/backend/db.sqlite3 /backup/db-$(date +%Y%m%d).sqlite3
```

### Backup Media Files
```bash
tar -czf /backup/media-$(date +%Y%m%d).tar.gz /var/www/saizgar-consultancy/backend/media/
```

### Restore Database
```bash
cp /backup/db-20240101.sqlite3 /var/www/saizgar-consultancy/backend/db.sqlite3
pm2 restart saizgar-backend
```

## 🎯 Success Checklist

- [ ] Script runs without errors
- [ ] `pm2 status` shows both services running
- [ ] `http://13.49.178.174` loads the frontend
- [ ] `http://13.49.178.174/api/` shows API endpoints
- [ ] `http://13.49.178.174/admin/` loads Django admin
- [ ] Static files load correctly
- [ ] Database migrations completed
- [ ] No errors in logs

## 📞 Support

If you encounter issues:
1. Check the logs: `pm2 logs`
2. Verify services are running: `pm2 status`
3. Check Nginx: `sudo systemctl status nginx`
4. Test database: `python manage.py dbshell`
5. Restart services: `pm2 restart all`

---

**🎉 Your application will be live at: http://13.49.178.174**
