import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Case = sequelize.define(
  'Case',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    caseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lawyerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opponentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    conflictDetected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blockchainTxHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'cases',
  }
);

export default Case;
