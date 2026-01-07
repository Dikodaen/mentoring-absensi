import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "success" | "warning" | "danger" | "info";
}

const badgeVariants = {
    default: "bg-slate-100 text-slate-900",
    success: "bg-[#E6F9F3] text-[#00C48C]",
    warning: "bg-[#FFF8E6] text-[#FFB020]",
    danger: "bg-[#FFEBEB] text-[#FF3636]",
    info: "bg-[#E6F4FF] text-[#00A3FF]",
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", badgeVariants[variant], className)} {...props} />
    );
}

export { Badge }
