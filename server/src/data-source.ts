import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Engkar.K@12",
    database: "db_circle",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*.ts"], //screw you dirname
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
