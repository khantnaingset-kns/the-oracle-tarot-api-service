import { Module } from '@nestjs/common';
import { TarotModule } from './tarot/tarot.module';

@Module({
  imports: [TarotModule],
})
export class ModuleInitializer {}
