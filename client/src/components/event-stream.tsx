"use client"
import { useEffect, useState } from 'react';

interface MessageEvent {
    data: string;
}

const EventStream = () => {
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

    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen flex justify-center items-center gap-2">
            <h2 className="text-3xl text-red-300">Server-Sent Events</h2>
            <div className="overflow-y-auto h-60 border-2 border-amber-50 rounded-2xl p-4">
                <ul>
                    {messages.map((message, index) => (
                        <li className="font-bold text-green-500" key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default EventStream;
