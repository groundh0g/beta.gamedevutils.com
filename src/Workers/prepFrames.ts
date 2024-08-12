import {WorkerMessages} from "./_MessageEnums.ts";

self.onmessage = (e: MessageEvent<string>) => {
    if (e.data === WorkerMessages.BEGIN) {


        // TODO: loop thry assets
        // TODO: loop thru asset frame(s)
        // TODO: self.postMessage(percent as number)

        self.postMessage(WorkerMessages.COMPLETE);
    }
};

export default {};