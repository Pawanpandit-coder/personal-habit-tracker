import {
  BrainCircuit,
  BookOpenText,
  MessageSquareText,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Task Recall",
    description:
      "Never miss important tasks. Quickly recall pending, completed, and upcoming tasks whenever you need them.",
    icon: BrainCircuit,
  },
  {
    title: "Journal & Find Journal",
    description:
      "Write your daily journal entries and instantly search previous memories with powerful journal lookup.",
    icon: BookOpenText,
  },
  {
    title: "Remarks",
    description:
      "Add remarks and notes to your tasks and journals to keep every important detail organized.",
    icon: MessageSquareText,
  },
  {
    title: "Personal Statistics",
    description:
      "Track your productivity with detailed insights including completed tasks, journal count, and overall activity.",
    icon: BarChart3,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background py-24 mx-4">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Stay Organized
          </h2>

          <p className="mt-4 text-muted-foreground">
            Manage your daily workflow, keep personal notes, and monitor your
            productivity from one place.
          </p>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:-translate-y-2 hover:border-primary hover:shadow-lg"
              >
                <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-l font-semibold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}