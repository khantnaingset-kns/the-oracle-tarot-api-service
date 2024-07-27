import { ApiProperty } from '@nestjs/swagger';
import { ITarot, IUserTarotRecord } from '../../../common';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class TarotRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  cardsCount: number;
}

export class TarotSingleResponseDto implements ITarot {
  @ApiProperty()
  number: number;

  @ApiProperty()
  name: string;
}

export class TarotMultiResponseDto {
  @ApiProperty()
  cards: TarotSingleResponseDto[];
}

export class UserTarotRecordSingleResponseDto implements IUserTarotRecord {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  drewDate?: string;

  @ApiProperty()
  numberOfCards: number;

  @ApiProperty()
  cards: ITarot[];
}

export class UserTarotRecordMultiRecordDto {
  @ApiProperty()
  records: UserTarotRecordSingleResponseDto[];
}
