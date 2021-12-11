import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtlModule } from './etl/etl.module';

@Module({
  imports: [EtlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
