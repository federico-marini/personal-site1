export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-zinc-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Federico Marini. All rights reserved.</p>
        <a href="#home" className="hover:underline underline-offset-4">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}


