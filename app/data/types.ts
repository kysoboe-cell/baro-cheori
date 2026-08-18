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

  officialActionLabel?: string;

  lastChecked?: string;
};

export type CategoryId = "shopping" | "telecom" | "delivery";

export type Company = {
  slug: string;
  name: string;
  categoryId: CategoryId;
  aliases: string[];
  services: ServiceTask[];
};
