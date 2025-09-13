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
