import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '@/modules/crm/client/client.controller';
import { ClientService } from '@/modules/crm/client/client.service';

describe('ClientController', () => {
  let clientController: ClientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    clientController = app.get<ClientController>(ClientController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clientController.getHello()).toBe('Hello World!');
    });
  });
});
