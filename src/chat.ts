import { Ollama } from 'ollama'

export class Chat {
  private ollama: Ollama;

  constructor(ollamaUrl: string) {
    this.ollama = new Ollama({ host: ollamaUrl })
  }

  private generatePrompt = (patch: string) => {
    const answerLanguage = process.env.LANGUAGE
        ? `Answer me in ${process.env.LANGUAGE},`
        : '';

    const prompt =
        process.env.PROMPT ||
        'Below is a code patch, please help me do a brief code review on it. Any bug risks and/or improvement suggestions are welcome:';

    return `${prompt}, ${answerLanguage}:
  ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.ollama.chat({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: process.env.MODEL || 'llama3.2',
    });

    console.timeEnd('code-review cost');

    return res.message.content;
  };
}
