import { ITranslate } from "../../../application/translate.interface";
import { LibretranslateAPIResponse } from "./libretranslate-API-response.interface";

export class LibreTranslateOrg implements ITranslate {
    async translate(text: Buffer, to: string, from?: string): Promise<Buffer> {
        const format = "text";
        const target = to;
        const source = from ?? "auto";
        const headers = new Headers();
        const q = text.toString("utf8");
        headers.append("Content-Type", "application/json");
        const response = await fetch("https://libretranslate.org/translate", {
            headers,
            body: JSON.stringify({ target, source, format, q }),
            method: "POST",
        });
        if (response.status > 299 || response.status < 200) {
            const { error } = (await response.json()) as { error: string };
            if (!error) throw new Error("");
            throw new Error(error);
        }
        const { translatedText } =
            await (response.json() as Promise<LibretranslateAPIResponse>);
        return Buffer.from(translatedText);
    }
}
