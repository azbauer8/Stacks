export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        <a href="https://github.com/azbauer8/stacks" target="_blank" className="hover:underline" rel="noreferrer">
          By Zach Bauer, {new Date().getFullYear()}
        </a>
      </p>
    </footer>
  );
}
