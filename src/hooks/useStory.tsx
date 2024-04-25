import * as React from 'react';
import OpenAI from 'openai';
import Config from 'react-native-config';

import { ImagesState, defaultState } from '../screens/Story/types';
import { TUseStory, TUseStoryReturn } from './types';

const openai = new OpenAI({
  apiKey: Config.OPENAI_API_KEY, "baseURL": "https://openrouter.ai/api/v1", "defaultHeaders": {
            "HTTP-Referer": YOUR_SITE_URL,
            "X-Title": YOUR_SITE_NAME // Optional. Shows on openrouter.ai
          }
});

export default function useStory({
  content = '',
  prompt = '',
}: TUseStory): TUseStoryReturn {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | undefined>('');
  const [images, setImages] = React.useState<ImagesState[]>([defaultState]);

  const fetchImagesStory = React.useCallback(async () => {
    try {
      const response = await openai.images.generate({
        prompt: `${prompt}, digital art`,
        n: 5,
        size: '256x256',
      });

      setImages(response.data.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log('error:', error);
        console.log('error.message:', error.message);
      }
    }
  }, [prompt]);

  const fetchStory = React.useCallback(async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'openai/gpt-3.5-turbo',
        messages: [{role: 'user', content}],
      });

      const _message = completion.choices[0].message;

      setMessage(_message?.content);
    } catch (error) {
      if (error instanceof Error) {
        console.log('error:', error);
        console.log('error.message:', error.message);
      }
    }
  }, [content]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchStory();
      await fetchImagesStory();
      setIsLoading(false);
    };

    fetchData();
  }, [fetchStory, fetchImagesStory]);

  return {
    isLoading,
    message,
    images,
  };
}
