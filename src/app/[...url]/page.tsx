import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
    params: {
        url: string | string[] | undefined;
    };
}

function reconstructUrl({ url }: { url: string[] }) {
    const decodedComponents = url?.map((component) => decodeURIComponent(component));
    return decodedComponents?.join("/");
}

const Page = async ({ params }: PageProps) => {
    const sessionCookie = cookies().get("sessionId")?.value;
    const formattedUrl = reconstructUrl({ url: params.url as string[] });

    const sessionId = (formattedUrl + "--" + sessionCookie).replace(/\//g, "");

    const isAlreadyIndexed = await redis.sismember("indexedUrls", formattedUrl);

    const initialMessages = await ragChat.history.getMessages({amount:10,sessionId});

    if (!isAlreadyIndexed) {
        await ragChat.context.add({
            type: "html",
            source: formattedUrl,
            config: { chunkOverlap: 50, chunkSize: 200 },
        });

        await redis.sadd("indexed-urls", formattedUrl);
    }
    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;