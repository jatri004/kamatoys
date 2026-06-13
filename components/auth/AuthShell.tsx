import Link from "next/link";

// Centered card used by the login and signup pages.
export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 text-center">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-wine-800"
        >
          Kama<span className="text-gold-600">Desires.com</span>
        </Link>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
      <p className="mt-6 text-center text-xs text-gray-400">
        🔒 Discreet &amp; secure. We never share your details.
      </p>
    </div>
  );
}
