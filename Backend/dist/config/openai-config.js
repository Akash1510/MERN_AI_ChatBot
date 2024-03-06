import configuration from "openai";
export const configureOpenAI = () => {
    const config = new configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION,
    });
    return config;
};
//# sourceMappingURL=openai-config.js.map