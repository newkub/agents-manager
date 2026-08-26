import { createOpenAIProvider } from './openai';
import type { Provider, ProviderConfig } from './types';

export function createCustomProvider(config: ProviderConfig): Provider {
  return createOpenAIProvider({ ...config, baseUrl: config.baseUrl ?? '' });
}
