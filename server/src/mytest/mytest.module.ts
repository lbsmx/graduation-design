import { Module } from '@nestjs/common';
import { MytestService } from './mytest.service';
import { MytestController } from './mytest.controller';

@Module({
  controllers: [MytestController],
  providers: [MytestService]
})
export class MytestModule {}
