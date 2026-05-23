import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't load the requested data. Please try again later.",
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-destructive/20 bg-destructive/5 rounded-xl">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  title = "No results found", 
  message = "We couldn't find anything matching your criteria.",
  actionText,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-border bg-card rounded-xl">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground mt-2 max-w-sm mb-4">{message}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="default">
          {actionText}
        </Button>
      )}
    </div>
  );
}
