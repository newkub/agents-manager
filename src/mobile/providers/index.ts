import { createAnthropicProvider } from './anthropic';
import { createCustomProvider } from './custom';
import { createDevinProvider } from './devin';
import { createOpenAIProvider } from './openai';
import type { Provider, ProviderConfig } from './types';

export function createProvider(config: ProviderConfig): Provider {
  switch (config.type) {
    case 'devin':
      return createDevinProvider(config);
    case 'anthropic':
      return createAnthropicProvider(config);
    case 'openai':
      return createOpenAIProvider(config);
    case 'custom':
      return createCustomProvider(config);
  }
}

export * from './types';
