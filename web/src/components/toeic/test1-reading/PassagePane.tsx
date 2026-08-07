import { ReadingPassage } from "@/data/toeic/test1/reading";
import { AdvertisementPassage } from "./AdvertisementPassage";
import { ChatPassage } from "./ChatPassage";
import { DocumentPassage } from "./DocumentPassage";
import { EmailPassage } from "./EmailPassage";
import { WebPagePassage } from "./WebPagePassage";

export function PassagePane({ passage, className = "" }: { passage: ReadingPassage; className?: string }) {
  const frame = (() => {
    switch (passage.type) {
      case "e-mail":
        return <EmailPassage passage={passage} />;
      case "web page":
        return <WebPagePassage passage={passage} />;
      case "text-message":
      case "online chat discussion":
        return <ChatPassage passage={passage} />;
      case "advertisement":
        return <AdvertisementPassage passage={passage} />;
      default:
        return <DocumentPassage passage={passage} />;
    }
  })();

  return <div className={className}>{frame}</div>;
}
