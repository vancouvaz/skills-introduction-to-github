import Image from "next/image";

const STEPS = [
  {
    number: "01",
    title: "Attach the pads",
    description:
      "Slip CryoSeat's seat pad and back pad onto your existing chair in under 5 minutes. Universal elastic anchors fit most standard office chairs — no tools required.",
    image: "/images/texture-detail.png",
    imageAlt: "CryoSeat pad being attached to an office chair seat",
    imageCaption: "texture-detail.png",
  },
  {
    number: "02",
    title: "Plug in and connect",
    description:
      "Connect the compact controller unit to USB-C power (laptop, monitor hub, or wall adapter). Open the iOS/Android app and pair via Bluetooth in 30 seconds.",
    image: "/images/app-screen.png",
    imageAlt: "CryoSeat mobile app showing temperature schedule setup",
    imageCaption: "app-screen.png",
  },
  {
    number: "03",
    title: "Set it and forget it",
    description:
      "Choose manual temperatures or let the schedule engine sync with your calendar. CryoSeat handles the rest — warming up before your morning meeting, cooling down for your deep-work block.",
    image: "/images/thermal-diagram.png",
    imageAlt: "Thermal zones diagram showing seat and back temperature distribution",
    imageCaption: "thermal-diagram.png",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section"
      aria-labelledby="how-heading"
    >
      <div className="container-content">
        <div className="max-w-prose mx-auto text-center mb-16">
          <span className="eyebrow mb-4 block">How it works</span>
          <h2
            id="how-heading"
            className="text-display-md text-neutral-50 mb-6"
          >
            Up and running
            <span className="gradient-text-ice"> in 5 minutes.</span>
          </h2>
          <p className="text-body-lg text-neutral-400">
            No drilling. No HVAC modification. No electrician. CryoSeat installs
            in minutes and works with the chair you already love.
          </p>
        </div>

        <ol className="flex flex-col gap-16">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text side */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <span className="text-display-lg font-bold text-bg-border leading-none block mb-4" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="text-display-md text-neutral-50 mb-4">
                  {step.title}
                </h3>
                <p className="text-body-lg text-neutral-400">{step.description}</p>
              </div>

              {/* Image side */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-elevated border border-bg-border">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTEzIi8+PC9zdmc+"
                  />
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-bg-elevated">
                    <p className="text-caption text-neutral-600">{step.imageCaption}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
