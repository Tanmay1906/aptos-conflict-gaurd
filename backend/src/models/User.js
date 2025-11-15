import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/sequelize.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a name',
        },
        len: {
          args: [2, 50],
          msg: 'Name must be between 2 and 50 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email',
        },
        notEmpty: {
          msg: 'Please provide an email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a password',
        },
        len: {
          args: [6],
          msg: 'Password must be at least 6 characters long',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'law_firm'),
      defaultValue: 'user',
    },
    // Law firm specific fields
    firm_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    firm_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    wallet_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password_changed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password_reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password_reset_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'users',
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
          user.password_changed_at = new Date();
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },
  }
);

User.prototype.isPasswordMatch = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.changedPasswordAfter = function (JWTTimestamp) {
  if (this.password_changed_at) {
    const changedTimestamp = parseInt(
      this.password_changed_at.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export default User;
