import { Controller, Get, Param, Query } from '@nestjs/common';
import { TarotHelperService } from './tarot.helper.service';
import {
  TarotMultiResponseDto,
  TarotRequestDto,
  UserTarotRecordMultiRecordDto,
} from './dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TarotService } from './tarot.service';

@ApiTags('tarot')
@Controller({ path: 'tarot' })
export class TarotController {
  constructor(
    private readonly helperService: TarotHelperService,
    private readonly service: TarotService,
  ) {}

  @Get('draw')
  @ApiOperation({ summary: 'Return draw tarot cards' })
  @ApiOkResponse({ type: TarotMultiResponseDto })
  async drawCards(
    @Query() request: TarotRequestDto,
  ): Promise<TarotMultiResponseDto> {
    const result = this.helperService.drawCards(request.cardsCount);
    await this.service.create({
      userId: request.userId,
      numberOfCards: request.cardsCount,
      cards: result,
    });

    return { cards: result };
  }

  @Get('records/:userId')
  @ApiOperation({ summary: 'Return user tarot records' })
  @ApiOkResponse({ type: UserTarotRecordMultiRecordDto })
  async getUserTarotRecord(
    @Param('userId') userId: string,
  ): Promise<UserTarotRecordMultiRecordDto> {
    const records = await this.service.findByUserId(userId);

    return { records };
  }
}
