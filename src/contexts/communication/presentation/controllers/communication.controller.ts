import { Controller, Get, Post, Delete, Param, Body, Put } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CommunicationService } from "../../application/services/communication.service";
import { CreateCommunicationDto } from "../dtos/create.dto";
import { UpdateCommunicationDto } from "../dtos/update.dto";

@ApiTags("Communication")
@Controller("communication")
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) { }

  @Post()
  @ApiOperation({ summary: "Create a new communication" })
  async create(@Body() dto: CreateCommunicationDto) {
    return this.communicationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Fetch all communications" })
  async findAll() {
    return this.communicationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Fetch a single communication" })
  async findOne(@Param("id") id: string) {
    return this.communicationService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an existing communication" })
  async update(@Param("id") id: string, @Body() dto: UpdateCommunicationDto) {
    return this.communicationService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a communication" })
  async remove(@Param("id") id: string) {
    return this.communicationService.remove(id);
  }
}