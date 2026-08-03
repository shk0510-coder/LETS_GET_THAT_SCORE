import { ListeningModule } from "@/data/listening/types";

export function ModuleIntroScreen({ module: mod }: { module: ListeningModule }) {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6 md:p-10">
      <h2 className="text-headline-md text-primary mb-2">{mod.title}</h2>
      <p className="text-body-md text-on-surface-variant mb-8">
        Difficulty: {mod.difficulty}
      </p>
      <div className="flex flex-col gap-2 text-body-md text-on-surface mb-8">
        <p>
          <span className="font-bold">Q1–8:</span> Listen and Choose a Response
        </p>
        <p>
          <span className="font-bold">Q9–12:</span> Listen to Conversations
        </p>
        <p>
          <span className="font-bold">Q13–14:</span> Listen to an Announcement
        </p>
        <p>
          <span className="font-bold">Q15–18:</span> Listen to an Academic Talk
        </p>
      </div>
      <p className="text-body-sm text-on-surface-variant">
        After you start the module, each screen will attempt to play audio
        automatically after a short delay. Conversation, announcement, and talk
        audio plays once, but the related questions appear one at a time.
      </p>
    </div>
  );
}
