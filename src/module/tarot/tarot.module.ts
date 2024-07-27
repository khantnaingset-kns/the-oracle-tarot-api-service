import { Module } from '@nestjs/common';
import { TarotController } from './tarot.controller';
import { TarotHelperService } from './tarot.helper.service';
import { TarotService } from './tarot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTarotRecord } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTarotRecord])],
  controllers: [TarotController],
  providers: [TarotHelperService, TarotService],
})
export class TarotModule {}
