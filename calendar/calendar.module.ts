import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { OAuthService } from 'src/auth/services/database/oauth.service';
import { OAuth } from 'src/auth/entities/oauth.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { OAuthGoogleService } from 'src/auth/services/oauth.google.service';
import { GoogleService } from './services/google/google.service';
import { CalendarCommand } from './commands/calendar.command';
import { EventService } from './services/database/event.service';
import { Event } from './entities/event.entity';
import { ResourceCalendar } from './entities/resource.calendar.entity';
import { ResourceCalendarService } from './services/database/resource.calendar.service';
import { Participant } from './entities/participant.entity';
import { Attend } from './entities/attend.entity';
import { ParticipantService } from './services/database/participant.service';
import { AttendService } from './services/database/attend.service';
import { NotificationController } from './controllers/notification.controller';
import { EventHandlerService } from './services/google.handlers/event.handler.service';
import { ResourceCalendarHandlerService } from './services/google.handlers/resource.calendar.handler.service';
import { WebHook } from './entities/web.hook.entity';
import { WebHookService } from './services/database/web.hook.service';
import { ScheduleService } from './services/schedule.service';
import { NestEmitterModule } from 'nest-emitter';
import { EventEmitter } from 'events';
import { CalendarEventHandlerService } from './services/event.handlers/calendar.event.handler.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Event,
            OAuth,
            ResourceCalendar,
            Participant,
            Attend,
            WebHook,
        ]),
        NestEmitterModule.forRoot(new EventEmitter()),
        ConfigModule,
        AuthModule,
        ScheduleModule.forRoot(),
    ],
    providers: [
        GoogleService,
        CalendarCommand,
        EventService,
        OAuthService,
        ResourceCalendarService,
        ParticipantService,
        AttendService,
        EventHandlerService,
        ResourceCalendarHandlerService,
        WebHookService,
        ScheduleService,
        OAuthGoogleService,
        CalendarEventHandlerService,
    ],
    controllers: [NotificationController],
})
export class CalendarModule {}
