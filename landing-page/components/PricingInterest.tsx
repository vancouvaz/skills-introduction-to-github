"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

const PRICE_BANDS = [
  {
    id: "under-149",
    label: "Under $149",
    description: "I'd only consider it at an entry price.",
  },
  {
    id: "149-249",
    label: "$149 – $249",
    description: "Makes sense as a considered purchase.",
  },
  {
    id: "249-349",
    label: "$249 – $349",
    description: "I'd pay this for a quality product.",
    popular: true,
  },
  {
    id: "349-499",
    label: "$349 – $499",
    description: "Premium is fine for something this useful.",
  },
  {
    id: "over-499",
    label: "Over $499",
    description: "I buy premium tools — price isn't the barrier.",
  },
];

interface PricingInterestProps {
  onSelect?: (band: string) => void;
  selected?: string;
}

export function PricingInterest({ onSelect, selected: externalSelected }: PricingInterestProps) {
  const [internalSelected, setInternalSelected] = useState<string>("");
  const selected = externalSelected ?? internalSelected;

  function handleSelect(id: string) {
    setInternalSelected(id);
    track("price_band_select", { props: { band: id } });
    onSelect?.(id);
  }

  return (
    <section className="section" aria-labelledby="pricing-interest-heading">
      <div className="container-content">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-10">
            <span className="eyebrow mb-4 block">Price sensitivity check</span>
            <h2
              id="pricing-interest-heading"
              className="text-display-md text-neutral-50 mb-4"
            >
              What would you pay for this?
            </h2>
            <p className="text-body-lg text-neutral-400">
              Help us set the right price. Pick the range that reflects your honest
              willingness to pay for the complete seat + back system.
            </p>
          </div>

          <fieldset aria-label="Price band selection">
            <legend className="sr-only">Select your preferred price range</legend>
            <div className="flex flex-col gap-3">
              {PRICE_BANDS.map((band) => {
                const isSelected = selected === band.id;
                return (
                  <label
                    key={band.id}
                    htmlFor={`band-${band.id}`}
                    className={`relative flex items-center gap-4 cursor-pointer rounded-xl border p-5 transition-all duration-150 ${
                      isSelected
                        ? "border-ice bg-ice/5 shadow-[0_0_20px_rgba(168,216,234,0.08)]"
                        : "border-bg-border bg-bg-elevated hover:border-neutral-600"
                    }`}
                  >
                    <input
                      id={`band-${band.id}`}
                      type="radio"
                      name="price-band"
                      value={band.id}
                      checked={isSelected}
                      onChange={() => handleSelect(band.id)}
                      className="sr-only"
                    />
                    {/* Custom radio */}
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? "border-ice bg-ice" : "border-neutral-600 bg-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-bg block" />
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-body font-semibold ${
                            isSelected ? "text-ice" : "text-neutral-200"
                          }`}
                        >
                          {band.label}
                        </span>
                        {band.popular && (
                          <span className="text-caption font-semibold bg-ice/15 text-ice px-2.5 py-0.5 rounded-full">
                            Most likely
                          </span>
                        )}
                      </div>
                      <p className="text-body-sm text-neutral-500 mt-0.5">
                        {band.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {selected && (
            <p
              className="text-center text-body-sm text-ice mt-6 animate-fade-in"
              role="status"
              aria-live="polite"
            >
              Got it — your input helps us build the right product at the right price.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
