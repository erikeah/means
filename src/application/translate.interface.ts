export interface ITranslate {
    translate(text: Buffer, to: string, from?: string): Buffer | Promise<Buffer>;
}
