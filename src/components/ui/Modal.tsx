"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={cn(
                "relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200",
                className
            )}>
                <div className="flex items-center justify-between mb-4">
                    {title && <h2 className="text-xl font-semibold text-slate-900">{title}</h2>}
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
