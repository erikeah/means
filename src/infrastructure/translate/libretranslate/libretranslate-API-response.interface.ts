export interface LibretranslateAPIResponse {
    detectedLanguage: {
        confidence: number;
        language: string;
    };
    translatedText: string;
}
