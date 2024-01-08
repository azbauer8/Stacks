export default function Footer() {
  return (
    <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
      <p>
        <a
          href="https://github.com/azbauer8/stacks"
          target="_blank"
          className="hover:underline"
          rel="noreferrer"
        >
          By Zach Bauer, {new Date().getFullYear()}
        </a>
      </p>
    </footer>
  )
}
