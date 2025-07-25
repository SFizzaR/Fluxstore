"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    dotenv.config();
    app.enableCors({
        origin: 'http://localhost:4200',
        credentials: true
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map