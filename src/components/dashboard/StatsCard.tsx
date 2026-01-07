import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    variant?: "blue" | "green" | "orange" | "red";
}

const variants = {
    blue: "bg-primary text-white",
    green: "bg-success text-white",
    orange: "bg-secondary text-white",
    red: "bg-danger text-white",
};

export function StatsCard({
    title,
    value,
    subtitle,
    icon,
    variant = "blue",
}: StatsCardProps) {
    return (
        <Card className={cn("p-6 border-none shadow-md", variants[variant])}>
            <div className="flex items-start justify-between">
                <div className="space-y-4">
                    <p className="text-sm font-medium opacity-90">{title}</p>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-bold">{value}</h3>
                        {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
                    </div>
                </div>
                <div className="rounded-full bg-white/20 p-2 text-white">
                    {icon}
                </div>
            </div>
        </Card>
    );
}
