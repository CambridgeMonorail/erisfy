#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try {
    console.log("Welcome to the Erisfy development setup script!\n");

    // Dynamically import inquirer
    const inquirer = (await import('inquirer')).default;
    const { execSync } = await import('child_process');

    // 1. Prompt for environment variables
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'OPENAI_API_KEY',
        message: 'Enter your OpenAI API key:',
        validate: (input) => input.length > 0 || 'OpenAI API key is required',
      },
      {
        type: 'input',
        name: 'PORT',
        message: 'Enter the server port (default: 3001):',
        default: '3001',
      },
      {
        type: 'input',
        name: 'DATABASE_URL',
        message: 'Enter the database URL (default: postgresql://postgres:postgres@localhost:5432/erisfydb?schema=public):',
        default: 'postgresql://postgres:postgres@localhost:5432/erisfydb?schema=public',
      },
    ]);

    // 2. Create server .env.development file
    const serverEnvPath = path.join(__dirname, '../apps/server/.env.development');
    const envContent = `
PORT=${answers.PORT}
NODE_ENV=development
OPENAI_API_KEY=${answers.OPENAI_API_KEY}
DATABASE_URL=${answers.DATABASE_URL}
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=erisfydb
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
    `.trim();

    fs.writeFileSync(serverEnvPath, envContent);
    console.log('\n✅ Created server .env.development file');

    // 3. Create client .env file
    const clientEnvPath = path.join(__dirname, '../apps/client/.env');
    const clientEnvContent = `
VITE_REACT_APP_USE_MOCKS=false
    `.trim();

    fs.writeFileSync(clientEnvPath, clientEnvContent);
    console.log('✅ Created client .env file');

    // 4. Start Docker containers
    console.log('\n🐳 Starting Docker containers...');
    try {
      execSync('pnpm run serve:docker', { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to start Docker containers. Please ensure Docker is running and try again.');
      process.exit(1);
    }

    // 5. Run database migrations
    console.log('\n🔄 Running database migrations...');
    try {
      execSync('nx run server:prisma-migrate', { stdio: 'inherit' });
      console.log('✅ Database migrations completed');
    } catch (error) {
      console.error('Failed to run database migrations:', error);
      process.exit(1);
    }

    // 6. Final instructions
    console.log(`
--------------------------------------------------------------------------------
🎉 Development Setup Complete!

Your development environment has been configured with:
- Server environment variables
- Client environment configuration
- Database container running
- Initial database migrations

Next steps:
1. Start the server:
   pnpm run serve:server

2. In a new terminal, start the client:
   pnpm run serve:client

Happy coding! 🚀
--------------------------------------------------------------------------------
    `);

  } catch (error) {
    console.error('Setup script failed:', error);
    process.exit(1);
  }
}

main();
