export interface BacklinkResult {
  source_url: string;
  anchor_text: string;
  link_type: 'dofollow' | 'nofollow' | 'ugc' | 'sponsored';
  domain_authority: number;
  page_authority: number;
  ranking_keywords?: string[];
  hashtags?: string[];
}

export async function extractBacklinks(url: string): Promise<BacklinkResult[]> {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

  // Generate somewhat random but realistic data based on the input URL
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  
  return [
    {
      source_url: `https://techcrunch.com/2025/02/20/${domain}-review`,
      anchor_text: "best saas tools",
      link_type: 'dofollow',
      domain_authority: 92,
      page_authority: 45,
      ranking_keywords: ['tech', 'startup', 'software'],
      hashtags: ['#technews', '#saas']
    },
    {
      source_url: `https://medium.com/growth-hacking/how-to-use-${domain}`,
      anchor_text: domain,
      link_type: 'dofollow',
      domain_authority: 88,
      page_authority: 32,
      ranking_keywords: ['growth', 'marketing'],
      hashtags: ['#growthhacking']
    },
    {
      source_url: `https://reddit.com/r/SaaS/comments/xyz/${domain}_alternatives`,
      anchor_text: "click here",
      link_type: 'nofollow',
      domain_authority: 95,
      page_authority: 21,
      ranking_keywords: ['discussion', 'forum'],
      hashtags: ['#reddit', '#discussion']
    },
    {
      source_url: `https://indiehackers.com/product/${domain}`,
      anchor_text: "Visit Website",
      link_type: 'dofollow',
      domain_authority: 76,
      page_authority: 38,
      ranking_keywords: ['indie', 'bootstrap'],
      hashtags: ['#buildinpublic']
    },
    {
      source_url: `https://producthunt.com/posts/${domain}`,
      anchor_text: "View on Product Hunt",
      link_type: 'dofollow',
      domain_authority: 90,
      page_authority: 65,
      ranking_keywords: ['launch', 'new'],
      hashtags: ['#producthunt']
    }
  ];
}
