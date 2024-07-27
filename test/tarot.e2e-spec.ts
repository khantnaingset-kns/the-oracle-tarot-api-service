import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TarotHelperService } from '../src/module/tarot/tarot.helper.service';
import { UserTarotRecord } from '../src/module/tarot/entity';
import { v4 as uuidv4 } from 'uuid';

describe('TarotController (e2e)', () => {
  let app: INestApplication;
  let tarotHelperService: TarotHelperService;

  const userId = uuidv4();
  const id = uuidv4();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TarotHelperService)
      .useValue({
        drawCards: jest.fn().mockReturnValue([
          { name: 'The Fool', number: 0 },
          { name: 'The Magician', number: 1 },
        ]),
      })
      .overrideProvider(getRepositoryToken(UserTarotRecord))
      .useValue({
        save: jest.fn().mockResolvedValue({}),
        find: jest.fn().mockResolvedValue([
          {
            id,
            userId,
            numberOfCards: 2,
            cards: [
              { name: 'The Fool', number: 0 },
              { name: 'The Magician', number: 1 },
            ],
          },
        ]),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tarotHelperService =
      moduleFixture.get<TarotHelperService>(TarotHelperService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tarot/draw (GET)', async () => {
    const query = { userId, cardsCount: 2 };
    const response = await request(app.getHttpServer())
      .get('/tarot/draw')
      .query(query);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      cards: [
        { name: 'The Fool', number: 0 },
        { name: 'The Magician', number: 1 },
      ],
    });
    expect(tarotHelperService.drawCards).toHaveBeenCalledWith('2');
  });

  it('/tarot/records/:userId (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/tarot/records/${userId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      records: [
        {
          id,
          userId,
          numberOfCards: 2,
          cards: [
            { name: 'The Fool', number: 0 },
            { name: 'The Magician', number: 1 },
          ],
        },
      ],
    });
  });
});
