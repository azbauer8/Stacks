import cn from "@/utils/cn"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </section>
  )
}

function PageTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function PageDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-[1200px] text-base text-default-500 sm:text-xl",
        className
      )}
      {...props}
    />
  )
}

export { PageHeader, PageTitle, PageDescription }
