# SSE (Server-Sent Events)

## Server

```ts
import {Controller, Get, Sse} from '@nestjs/common';
import {interval, map, Observable} from "rxjs";
interface MessageEvent {
    data: string | object
}
@Controller('api')
export class AppController {
    @Sse(`any_path_name_you_want`)
    sendEvent():Observable<MessageEvent> {
        return interval(1000).pipe(map((num:number):{data:string} => ({
            data: 'Xam is here ' + num + ' times'
        })))
    }
}
```


## Client

```tsx
const [messages, setMessages] = useState<string[]>([]);

useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/api/any_path_name_you_want');

    eventSource.onmessage = (event: MessageEvent) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    eventSource.onerror = () => {
        eventSource.close();
    };

    return () => {
        eventSource.close();
    };
}, []);
```
