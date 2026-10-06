import Link from "next/link";
import {
  Globe,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background mx-4">
      <div className="container mx-auto px-8 py-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-600">Recalit</h3>

            <p className="mt-4 text-sm text-muted-foreground">
              Your personal productivity companion to manage tasks, journals,
              remarks, and track your daily progress.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="rounded-lg border p-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Globe className="h-5 w-5" />
              </Link>

              <Link
                href="mailto:hello@example.com"
                className="rounded-lg border p-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" />
              </Link>

              <Link
                href="tel:+911234567890"
                className="rounded-lg border p-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold">Features</h4>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link href="#">Task Recall</Link></li>
              <li><Link href="#">Journal</Link></li>
              <li><Link href="#">Remarks</Link></li>
              <li><Link href="#">Statistics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold">Company</h4>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Privacy</Link></li>
              <li><Link href="#">Terms</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold">Get Started</h4>

            <p className="mt-4 text-sm text-muted-foreground">
              Organize your work and stay productive every day.
            </p>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-primary-foreground hover:opacity-90"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Recalit. All rights reserved.</p>

          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}