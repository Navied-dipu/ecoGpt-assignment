import type { ReactNode } from "react";

export interface SectionHeadingProps {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description?: string;
  readonly labelClassName?: string;
  readonly children?: ReactNode;
}

export function SectionHeading({
  id,
  label,
  title,
  description,
  labelClassName = "from-violet-600 via-blue-600 to-cyan-500",
  children,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-transparent">
        <span
          aria-hidden="true"
          className="h-px w-8 bg-gradient-to-r from-transparent to-foreground/25"
        />
        <span className={`bg-gradient-to-r bg-clip-text ${labelClassName}`}>
          {label}
        </span>
        <span
          aria-hidden="true"
          className="h-px w-8 bg-gradient-to-l from-transparent to-foreground/25"
        />
      </p>

      <h2
        id={`${id}-title`}
        className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}
