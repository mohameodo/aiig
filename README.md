# nexiloop

The power of AI in a clean, simple interface. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧

Nexiloop is a modern, open-source chat application that provides a seamless and intuitive interface for interacting with multiple AI models. Built with Next.js and shadcn/ui, it offers a clean and responsive user experience, allowing you to switch between powerful language models like OpenAI's GPT-3.5 and Google's Gemini. The application is designed to be deployed on the edge, ensuring fast and reliable performance with Cloudflare Workers.

## Features

- **Multi-Model Support**: Switch between OpenAI and Gemini models on the fly.
- **Clean and Responsive UI**: A polished and intuitive chat interface built with shadcn/ui.
- **Cloudflare Workers Compatibility**: Optimized for deployment on the edge for low-latency interactions.
- **Authentication**: (In progress) Secure user authentication with `better-auth` and PostgreSQL.
- **Persistent Chat History**: (In progress) Save and retrieve your chat history from a PostgreSQL database.

## Getting Started

To get started with Nexiloop, you'll need to have Node.js and npm installed.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nexiloop.git
   cd nexiloop
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**

   Create a `.env.local` file by copying the `.env.example` file:

   ```bash
   cp .env.example .env.local
   ```

   Then, fill in the required API keys and database URL in the `.env.local` file.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is optimized for deployment on Cloudflare Workers. To deploy your own instance, you can use the `wrangler` CLI.

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Workers:**

   ```bash
   npx wrangler deploy
   ```

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [shadcn/ui](https://ui.shadcn.com/) - learn about the UI components used in this project.
- [Cloudflare Workers](https://workers.cloudflare.com/) - learn about deploying applications on the edge.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.