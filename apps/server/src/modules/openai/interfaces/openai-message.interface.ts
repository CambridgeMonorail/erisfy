import OpenAI from 'openai';

/**
 * Type for OpenAI Chat Completion message
 * Matches the OpenAI SDK's expected parameter type
 */
export type OpenAIMessage = OpenAI.ChatCompletionMessageParam;
