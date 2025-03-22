# Popular Revelation

A web platform to showcase high-quality responses to questions about the Urantia Book.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **CMS**: Strapi
- **Database**: MongoDB
- **Deployment**: Vercel

## Project Structure

```
poprev/
├── client/                 # React frontend
├── server/                 # Express API
├── cms/                    # Strapi CMS
├── package.json            # Root package.json for scripts
├── .gitignore
├── README.md
└── vercel.json             # Vercel configuration
```

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/emen7/poprev.git
   cd poprev
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start development servers:
   ```
   npm run dev
   ```

### Environment Variables

Create `.env` files in both the `client` and `server` directories with the following:

#### Client (.env)

```
VITE_API_URL=http://localhost:5000/api
```

#### Server (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/poprev
JWT_SECRET=your-secret-key
```

## Deployment

The project is configured for deployment on Vercel.

## License

[MIT](LICENSE)
