# Consultency - Dynamic Engineering Consultancy Platform

A full-stack web application built with Next.js frontend and Django REST API backend, designed to provide a completely dynamic engineering consultancy website with admin panel management.

## 🚀 Features

### Frontend (Next.js 14)
- **Dynamic Content Management**: All content managed through Django admin
- **Service Categories & Filtering**: Dynamic service categorization with filtering
- **Responsive Design**: Modern UI with Tailwind CSS and Shadcn components
- **Interactive Components**: Animated sections, modals, and carousels
- **SEO Optimized**: Dynamic meta tags and structured content

### Backend (Django 5.2 + DRF)
- **RESTful API**: Complete API for all content types
- **Admin Panel**: Comprehensive content management interface
- **Dynamic Configuration**: Site settings, contact info, and branding
- **Email Integration**: Contact form submissions with configurable destinations
- **Media Management**: Image uploads and optimization

### Content Management
- **Services**: Categorized services with detailed descriptions
- **Projects**: Project portfolio with filtering and categories
- **Sectors**: Industry sectors with detailed pages
- **Team**: Team member profiles and leadership
- **Testimonials**: Client feedback and reviews
- **CMS**: Pages, sections, and dynamic content blocks

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.16
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework
- **Database**: SQLite (dev) / PostgreSQL (production)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Documentation**: drf-spectacular (Swagger UI)
- **CORS**: django-cors-headers
- **Admin**: Jazzmin (enhanced admin interface)

## 📁 Project Structure

```
consultency/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and configurations
│   └── public/              # Static assets
├── backend/                 # Django application
│   ├── config/              # Django settings
│   ├── cms/                 # Content management app
│   ├── services/            # Services app
│   ├── projects/            # Projects app
│   ├── sectors/             # Sectors app
│   ├── team/                # Team app
│   ├── testimonials/        # Testimonials app
│   └── venv/                # Virtual environment
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin
- **API Documentation**: http://localhost:8000/api/docs

## 📊 Admin Panel Features

### Content Management
- **Site Settings**: Branding, contact info, social links
- **Services**: Service categories and individual services
- **Projects**: Project portfolio with categories and images
- **Sectors**: Industry sectors with detailed content
- **Team**: Team members and leadership profiles
- **Testimonials**: Client feedback and reviews
- **Pages**: Dynamic page content and sections

### Contact Management
- **Submissions**: View and manage contact form submissions
- **Email Configuration**: Set destination email for notifications
- **Office Hours**: Manage business hours display

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
```

#### Backend (config/settings.py)
```python
# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'your-smtp-host'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email'
EMAIL_HOST_PASSWORD = 'your-password'
DEFAULT_FROM_EMAIL = 'noreply@yourdomain.com'

# Database (Production)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 🚀 Deployment

### Backend (Django)
1. **Set production settings**
2. **Configure database (PostgreSQL recommended)**
3. **Set up static file serving**
4. **Configure email settings**
5. **Deploy to your preferred platform (AWS, DigitalOcean, etc.)**

### Frontend (Next.js)
1. **Build the application**
   ```bash
   npm run build
   ```
2. **Deploy to Vercel, Netlify, or your preferred platform**

## 📝 API Endpoints

### Core Endpoints
- `GET /api/settings/` - Site settings
- `GET /api/services/` - Services list
- `GET /api/service-categories/` - Service categories
- `GET /api/projects/` - Projects list
- `GET /api/sectors/` - Sectors list
- `GET /api/team/` - Team members
- `GET /api/testimonials/` - Client testimonials

### Contact
- `POST /api/contact-submissions/` - Submit contact form

### Filtering & Search
- Services: `?category__slug=category-name&is_active=true`
- Projects: `?category__slug=category-name&is_active=true`
- All endpoints support search and ordering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@yourdomain.com or create an issue in the repository.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Django](https://djangoproject.com/) for the robust backend framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
