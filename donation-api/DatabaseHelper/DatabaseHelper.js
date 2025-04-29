const { sequelize } = require('../sequelize');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

class DatabaseService {
  constructor() {
    // Define the log file path
    this.errorLogFile = path.resolve(__dirname, '../logs/db_error.log');

    // Ensure the 'logs' directory exists
    this.createLogDirectoryIfNotExist();
  }

  // Helper method to log errors
  logError(message) {
    const formattedMessage = `${new Date().toISOString()} - ${message}\n`;

    try {
      if (typeof this.errorLogFile === 'string' && this.errorLogFile.length > 0) {
        fs.appendFileSync(this.errorLogFile, formattedMessage);
      } else {
        console.error('Invalid log file path:', this.errorLogFile);
      }
    } catch (err) {
      console.error('Failed to write log file:', err);
    }
  }

  // Ensure the 'logs' directory exists
  createLogDirectoryIfNotExist() {
    const logDir = path.dirname(this.errorLogFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  async executeQuery(query, params = []) {
    try {
      if (!sequelize) throw new Error("Sequelize instance is not defined");

      await sequelize.query(query, {
        replacements: params,
        type: QueryTypes.RAW,
      });
    } catch (error) {
      this.logError(`Error executing query: ${error.message}`);
      throw error;
    }
  }

  async executeScalar(query, params = []) {
    try {
      if (!sequelize) throw new Error("Sequelize instance is not defined");

      const result = await sequelize.query(query, {
        replacements: params,
        type: QueryTypes.SELECT,
      });

      return result[0];
    } catch (error) {
      this.logError(`Error executing scalar query: ${error.message}`);
      throw error;
    }
  }

  async beginTransaction() {
    try {
      return await sequelize.transaction();
    } catch (error) {
      this.logError(`Error beginning transaction: ${error.message}`);
      throw error;
    }
  }

  async commitTransaction(transaction) {
    try {
      await transaction.commit();
    } catch (error) {
      this.logError(`Error committing transaction: ${error.message}`);
      throw error;
    }
  }

  async rollbackTransaction(transaction) {
    try {
      await transaction.rollback();
    } catch (error) {
      this.logError(`Error rolling back transaction: ${error.message}`);
      throw error;
    }
  }

  async bulkInsert(tableName, data) {
    try {
      // sequelize.bulkInsert is not a standard method; use queryInterface in migrations or a raw query
      throw new Error('bulkInsert not implemented; use sequelize.query or model.bulkCreate');
    } catch (error) {
      this.logError(`Error executing bulk insert: ${error.message}`);
      throw error;
    }
  }

  async executeStoredProcedure(procName, params = {}) {
    try {
      let query = `EXEC ${procName}`;
      const paramStr = Object.keys(params)
        .map((key) => `@${key} = :${key}`)
        .join(', ');

      if (paramStr) query += ` ${paramStr}`;

      if (!sequelize) throw new Error("Sequelize instance is not defined");

      const result = await sequelize.query(query, {
        replacements: params,
        type: QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      this.logError(`Error executing stored procedure: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new DatabaseService();
