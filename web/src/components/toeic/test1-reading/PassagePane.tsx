import { ReadingPassage } from "@/data/toeic/test1/reading";
import { AdvertisementPassage } from "./AdvertisementPassage";
import { ChatPassage } from "./ChatPassage";
import { DocumentPassage } from "./DocumentPassage";
import { EmailPassage } from "./EmailPassage";
import { WebPagePassage } from "./WebPagePassage";

export function PassagePane({
  passage,
  className = "",
  blankIds,
}: {
  passage: ReadingPassage;
  className?: string;
  blankIds?: number[];
}) {
  const frame = (() => {
    switch (passage.type) {
      case "e-mail":
        return <EmailPassage passage={passage} blankIds={blankIds} />;
      case "web page":
        return <WebPagePassage passage={passage} />;
      case "text-message":
      case "online chat discussion":
        return <ChatPassage passage={passage} />;
      case "advertisement":
        return <AdvertisementPassage passage={passage} blankIds={blankIds} />;
      default:
        return <DocumentPassage passage={passage} blankIds={blankIds} />;
    }
  })();

  return <div className={className}>{frame}</div>;
}
