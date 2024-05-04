import {Controller, Get, Sse} from '@nestjs/common';
import {interval, map, Observable} from "rxjs";
interface MessageEvent {
  data: string | object
}
@Controller('api')
export class AppController {
  //The @Sse decorator declares a Server-Sent Events endpoint at the specified path
  // Replace 'any_path_name_you_want' with the actual path you want to use
  @Sse(`any_path_name_you_want`)
  //Define a method that sends an event every second
  sendEvent():Observable<MessageEvent> {
    // The interval function creates an Observable that emits a number every 1000 milliseconds (or 1 second)
    // The pipe method is used to apply the map function to the values emitted by the interval function
    // The map function transforms the emitted number into a MessageEvent
    return interval(1000).pipe(map((num:number):{data:string} => ({
      /// The data of the MessageEvent is a string that says 'Xam is here' followed by a number that increments every second
      data: 'Xam is here ' + num + ' times'
    })))
  }
}
