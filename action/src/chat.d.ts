export declare class Chat {
    private ollama;
    constructor(ollamaUrl: string);
    private generatePrompt;
    codeReview: (patch: string) => Promise<string>;
}
