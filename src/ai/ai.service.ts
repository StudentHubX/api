import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
const openai = new OpenAI();

const AI_prompt = `You are a moderator for an app that aims to make education as addictive as social media, and by doing every post and content created by any user should be of very high quality. 
Your task is to score every post over 10, if the post scores below 7 return a simple value saying false, 
but if not return true. You are to score the content based on these 3 criteria: Does the post encourage meaningful discussion or provide useful insights? 
Posts that foster positive engagement, offer constructive feedback, or contribute to a collaborative environment should score higher. 
Posts that are inflammatory or non-constructive should score lower.
High-quality posts that effectively communicate ideas, provide value, and are easy to understand should score higher. 
Does the post contribute to the academic focus of the app? It should be related to education, skill development, or the student community. Posts that are off-topic or irrelevant should score lower. DO NOT WRITE ANY OTHER TEXT IN YOUR RESPONSES, SIMPLY RETURN EITHER OF THE TWO BOOLEAN VALUES.`;

@Injectable()
export class AiService {
  async validatePost(prompt: string) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: AI_prompt },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    console.log(completion.choices[0].message);
  }
}
