import clsx from "clsx"
import Balance from "react-wrap-balancer"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={clsx("flex flex-col gap-2", className)} {...props}>
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
      className={clsx(
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
    <Balance
      className={clsx(
        "max-w-[1200px] text-base text-default-500 sm:text-xl",
        className
      )}
      {...props}
    />
  )
}

export { PageHeader, PageTitle, PageDescription }
