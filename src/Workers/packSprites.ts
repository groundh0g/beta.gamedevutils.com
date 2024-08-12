import {WorkerMessages} from "./_MessageEnums.ts";

self.onmessage = (e: MessageEvent<string>) => {
    if (e.data === WorkerMessages.BEGIN) {

        // TODO: loop thru asset frame(s); placing each
        // TODO: self.postMessage(percent as number)

        self.postMessage(WorkerMessages.COMPLETE);
    }
};

export default {};