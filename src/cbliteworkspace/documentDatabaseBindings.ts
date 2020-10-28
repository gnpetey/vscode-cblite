import { TextDocument } from "vscode";

interface Bindings {
    [documentId: string]: string
}

export class DocumentDatabaseBindings {
    private bindings: Bindings;

    constructor() {
        this.bindings = {};
    }

    bind(document: TextDocument | undefined, dbPath: string): boolean {
        if(document) {
            this.bindings[document.uri.toString()] = dbPath;
            return true;
        }

        return false;
    }

    get(document: TextDocument | undefined): string | undefined {
        if(document) {
            return this.bindings[document.uri.toString()];
        }

        return undefined;
    }

    unbind(dbPath: string) {
        Object.keys(this.bindings).forEach((docId) => {
            if(this.bindings[docId] === dbPath) {
                delete this.bindings[docId];
            }
        });
    }
}