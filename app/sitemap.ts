import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://slushiq.com";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/labs`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/recipes-and-library`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/brixley`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/learn/fix-my-slush`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/learn/what-is-brix`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/alcohol-and-slush`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/slush-machine-calculator`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/learn/frozen-drink-recipes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/learn/sugar-free-ninja-slushi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/learn/ninja-slushi-foamy`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/ninja-slushi-errors`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/how-to-scale-slush-recipes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/ninja-slushi-noise-leaking`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/support`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
