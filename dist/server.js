"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
process.on('uncaughtException', error => {
    process.exit(1);
});
let server;
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log('Database connection successful');
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Assignment app listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
}
main();
process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (server) {
        server.close();
    }
});
