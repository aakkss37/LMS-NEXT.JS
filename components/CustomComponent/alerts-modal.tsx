"use client"
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AlertModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "destructive" | "default"
}

const AlertModal: React.FC<AlertModalProps> = ({ children, onConfirm, onCancel, title, description, confirmText, cancelText, confirmVariant }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText ?? "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction
                        className={confirmVariant === "destructive" ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                        onClick={onConfirm}
                    >
                        {confirmText ?? "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default AlertModal