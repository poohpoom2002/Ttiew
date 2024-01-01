// location/location.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './location.model';
import { LocationsController } from './location.controller';
import { LocationsService } from './location.service';
import { ReviewModule } from '../review/review.module';
import { UsersModule } from 'src/users/users.module';
@Module({ 
  imports: [
    MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }]),
    forwardRef(() => ReviewModule), // Use forwardRef to avoid circular reference
    forwardRef(() => UsersModule)
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService], // Export the service for use in other modules
})
export class LocationModule {}
