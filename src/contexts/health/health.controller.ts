import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import packageJson from "../../../package.json";
import { Public } from "./public.jwt";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor() { }

  @Public()
  @Get()
  @ApiOperation({ summary: "Health check endpoint" })
  getHealth() {
    const { name, version } = packageJson;
    return `Application: ${name}, Version: ${version}`;
  }
}