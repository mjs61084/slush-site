import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the SlushIQ website and mobile applications.",
  alternates: { canonical: "https://www.slushiq.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <header>
          <p className="section-kicker">LEGAL</p>
          <h1>Terms of Service</h1>
          <p>Effective July 26, 2026</p>
        </header>

        <article>
          <p>
            These terms govern your use of the SlushIQ website and mobile
            applications. By downloading, accessing, or using SlushIQ, you
            agree to these terms. If you do not agree, do not use the services.
          </p>

          <h2>License to use SlushIQ</h2>
          <p>
            SlushIQ grants you a limited, non-exclusive, non-transferable,
            revocable license to use the app for personal, non-commercial
            purposes, subject to these terms.
          </p>

          <h2>What SlushIQ provides</h2>
          <p>
            SlushIQ provides frozen-drink calculations, Brix and ABV
            estimates, recipes, machine-mode suggestions, educational
            information, troubleshooting guidance, and AI-assisted tools.
            Features and availability may change as the product develops.
          </p>

          <h2>Your responsibilities</h2>
          <ul>
            <li>Use SlushIQ lawfully and responsibly.</li>
            <li>Verify ingredient information, amounts, units, and measurements.</li>
            <li>
              Confirm that a recipe and batch size are suitable for your
              specific appliance.
            </li>
            <li>
              Follow your machine manufacturer’s instructions, warnings, and
              capacity limits.
            </li>
            <li>Review alcohol content, allergens, and food-safety concerns.</li>
          </ul>

          <h2>Recipe and calculator disclaimer</h2>
          <p>
            Calculations, recipes, and guidance are informational estimates.
            Results vary with ingredient brands, measurement accuracy,
            appliance model, temperature, sugar content, alcohol content, batch
            size, and other real-world conditions. You are responsible for
            verifying the full batch before preparing or serving a beverage.
            SlushIQ is not medical, nutritional, food-safety, or other
            professional advice.
          </p>

          <h2>Brixley and AI-generated information</h2>
          <p>
            Brixley uses AI to interpret ingredient descriptions and provide
            frozen-drink assistance. AI-generated responses may be inaccurate,
            incomplete, or inappropriate for a particular ingredient or
            machine. Independently review recipes, calculations,
            substitutions, alcohol content, allergens, and safety
            considerations before using a response.
          </p>

          <h2>Alcohol and responsible use</h2>
          <p>
            Alcohol-related features are intended only for adults of legal
            drinking age in their location. You are responsible for complying
            with applicable laws, tracking alcohol across the full batch, and
            serving responsibly. Do not provide alcohol to minors, encourage
            excessive consumption, or operate a vehicle while impaired.
            Alcohol-related features may be limited using Google Play Age
            Signals where applicable.
          </p>

          <h2>Equipment and machine compatibility</h2>
          <p>
            You are responsible for deciding whether a recipe, ingredient
            combination, and batch size are suitable for your appliance.
            SlushIQ does not guarantee compatibility or a particular freezing
            result and is not responsible for clogging, mechanical problems,
            overheating, mixing errors, malfunctions, freeze failures,
            ingredient loss, equipment damage, or related property damage to
            the extent permitted by law.
          </p>
          <p>
            SlushIQ is an independent product and is not affiliated with or
            endorsed by Ninja, Iceman, VEVOR, GreenPan, or any other appliance
            manufacturer. Third-party product names and trademarks belong to
            their respective owners.
          </p>

          <h2>Your submissions</h2>
          <p>
            You retain ownership of content you submit. You give SlushIQ
            permission to process, review, modify, format, and use submitted
            feedback, recipes, suggestions, and related content as reasonably
            needed to provide the requested feature, respond to support,
            evaluate a recipe submission, or improve SlushIQ. Do not submit
            content you do not have the right to use.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You may not misuse the service, attempt unauthorized access,
            interfere with its operation, scrape or redistribute protected
            content at scale, reverse engineer restricted features where
            prohibited by law, or use SlushIQ to violate applicable law.
          </p>

          <h2>Intellectual property</h2>
          <p>
            SlushIQ’s name, branding, software, interface, original content,
            code, and associated materials are protected by applicable
            intellectual-property laws. You may not copy, republish, or
            redistribute protected SlushIQ materials without permission. These
            terms do not transfer ownership to you.
          </p>

          <h2>Third-party services</h2>
          <p>
            SlushIQ may rely on third-party services for AI processing, app
            distribution, diagnostics, analytics, age-related signals, hosting,
            backups, email, and form processing. These may include OpenAI,
            Apple, Google, Google Firebase, Formspree, and website-hosting
            providers. Those services are governed by their own terms and
            policies, and SlushIQ is not responsible for services outside its
            control.
          </p>

          <h2>Disclaimers and limitation of liability</h2>
          <p>
            SlushIQ is provided on an “as is” and “as available” basis to the
            extent permitted by law. We do not guarantee uninterrupted
            availability, error-free calculations, successful recipes, or a
            particular freezing result. To the maximum extent permitted by
            law, SlushIQ and its creators will not be liable for indirect,
            incidental, special, consequential, or punitive damages arising
            from use of the service.
          </p>

          <h2>Changes, suspension, and termination</h2>
          <p>
            We may update, modify, remove, or discontinue features, recipes,
            tools, or content. We may suspend or terminate access when these
            terms are violated, misuse is detected, or doing so is reasonably
            necessary to operate or protect the service.
          </p>

          <h2>Updates to these terms</h2>
          <p>
            We may update these terms periodically. The effective date will be
            revised when updates are published. Continued use after revised
            terms become effective constitutes acceptance of the updated
            terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be submitted through the{" "}
            <a href="/support">SlushIQ support page</a> or emailed to{" "}
            <a href="mailto:slushiqapp@gmail.com">slushiqapp@gmail.com</a>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
