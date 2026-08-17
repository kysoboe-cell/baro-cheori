export type ServiceTask = {
  slug: string;
  title: string;
  keywords: string[];

  quickSummary?: string[];

  phone?: {
    number: string;
    feeNote?: string;
  };

  hours?: string;

  steps?: string[];

  tips?: string[];

  officialUrl?: string;

  lastChecked?: string;
};

export type Company = {
  slug: string;
  name: string;
  categoryId: string;
  aliases: string[];
  services: ServiceTask[];
};