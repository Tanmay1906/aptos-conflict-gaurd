import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { NODE_ENV = 'development', DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const isProduction = NODE_ENV === 'production';
const isSSL = DATABASE_URL.includes('sslmode=require');

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: isSSL ? {
      require: true,
      rejectUnauthorized: false
    } : false,
    // For Neon DB connection pooling
    connection: {
      options: `-c search_path=public`
    }
  },
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

export { sequelize };
