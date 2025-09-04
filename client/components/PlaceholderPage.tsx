import { SafeLink } from "@/components/navigation/SafeLink";

export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="min-h-[60vh] container mx-auto flex flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl md:text-5xl text-espresso mb-4">{title}</h1>
      {description && (
        <p className="text-foreground/80 max-w-2xl mb-6">{description}</p>
      )}
      <SafeLink to="/" className="text-terra underline underline-offset-4 hover:text-rustic">
        Back to Home
      </SafeLink>
    </div>
  );
}
