import OpenAI from 'openai';
import { ContentRequest, MarketingResponse } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateContent = async (request: ContentRequest): Promise<MarketingResponse> => {
  try {
    const prompt = getPromptForType(request.product, request.type);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      status: 'success',
      message: response.choices[0].message.content || 'No content generated'
    };
  } catch (error) {
    console.error('Error generating content:', error);
    return {
      status: 'error',
      message: 'Failed to generate content. Please try again.'
    };
  }
};

const getPromptForType = (product: string, type?: string): string => {
  const prompts: Record<string, string> = {
    research_audience: `Analyze the target audience for ${product}. Consider demographics, interests, and behaviors.`,
    create_content: `Create engaging marketing content for ${product}. Include key features, benefits, and call to action.`,
    analyze_market: `Provide market analysis for ${product}. Include trends, competitors, and opportunities.`,
    email_campaign: `Generate an email marketing campaign template for ${product}. Include subject line and body content.`,
  };

  return type ? prompts[type] : prompts.create_content;
};