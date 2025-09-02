import {redis} from '@/lib/redis'

export async function GET(req){
    const stream = new ReadableStream({
        start(controller){
            const encoder=new TextEncoder()
            redis.subscribe("order-updates",(msg)=>{
                const encodedmsg=encoder.encode(`data:${msg}\n\n`)
                controller.enqueue(encodedmsg)
            })




        }
    })
    return new Response(stream,{
        header:{
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        }
    })
}