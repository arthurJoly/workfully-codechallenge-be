import { Model, DataTypes } from "sequelize";
import { sequelize } from "../persistence/SequelizeDb";

export class Account extends Model {
    declare id: number;
    declare amount: number;
}

Account.init({
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.NUMBER,
        validate: {
            min: 0
        }
    }
}, { sequelize, modelName: 'account' });