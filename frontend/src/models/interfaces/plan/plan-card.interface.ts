import { SubscriptionPlanEnum } from "@/models/enums/subscription/subscription-plan.enum";

export interface PlanCard {
    name: string;
    description: string;
    price?: number;
    priceLabel?: string;
    features: {
        icon: React.ReactNode;
        label: string;
    }[];
    button: {
        text: string;
        link: string;
        className: string;
        icon: React.ReactNode;
    };
    badge?: {
        text: string;
        className?: string;
    };
    isHighlighted?: boolean;
    icon: React.ReactNode;
    className?: string;
    type: SubscriptionPlanEnum;
}
