#!/usr/bin/env node

import getopts from "getopts";
import { ITranslate } from "./application/translate.interface";
import { config } from "./config";
import { LibreTranslateOrg } from "./infrastructure/translate/libretranslate/libretranslate";

const { to, from } = getopts(process.argv, {
    string: ["from", "to"],
    alias: { from: ["f"], to: ["t"] },
    default: { from: null, to: config.to },
});

const translator: ITranslate = new LibreTranslateOrg();

process.stdin.on("data", async (data: Buffer) => {
    if (data.byteLength > 1) {
        const translation = await translator.translate(data, to, from);
        process.stdout.write(translation);
    }
});
