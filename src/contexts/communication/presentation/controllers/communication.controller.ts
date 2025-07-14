import { Controller, Get, Post, Delete, Param, Body, Put, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CommunicationService } from "../../application/services/communication.service";
import { CreateCommunicationDto } from "../dtos/create.dto";
import { UpdateCommunicationDto } from "../dtos/update.dto";
import { CommunicationFilterDto } from "../dtos/get.dto";
import { CommunicationEntity } from "../../commom/entities/communication.entities";

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
  async findAll(@Query() filter: CommunicationFilterDto): Promise<{ data: CommunicationEntity[]; total: number }> {
    return this.communicationService.findAll(filter);
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