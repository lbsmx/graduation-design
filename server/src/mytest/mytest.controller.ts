import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MytestService } from './mytest.service';
import { CreateMytestDto } from './dto/create-mytest.dto';
import { UpdateMytestDto } from './dto/update-mytest.dto';

@Controller('mytest')
export class MytestController {
  constructor(private readonly mytestService: MytestService) {}

  @Post()
  create(@Body() createMytestDto: CreateMytestDto) {
    return this.mytestService.create(createMytestDto);
  }

  @Get()
  findAll() {
    return this.mytestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mytestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMytestDto: UpdateMytestDto) {
    return this.mytestService.update(+id, updateMytestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mytestService.remove(+id);
  }
}
