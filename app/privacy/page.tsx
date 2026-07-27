import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SlushIQ privacy policy for the website and mobile applications.",
  alternates: { canonical: "https://slushiq.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <header>
          <p className="section-kicker">LEGAL</p>
          <h1>Privacy Policy</h1>
          <p>Effective July 26, 2026</p>
        </header>

        <article>
          <p>
            This policy explains how SlushIQ handles information when you use
            the SlushIQ website and mobile applications, contact support, or
            participate in our online communities. SlushIQ is designed to
            collect as little personal information as reasonably possible. We
            do not sell personal information or use it for cross-app tracking.
          </p>

          <h2>Information you provide</h2>
          <p>
            We may receive information you choose to provide through support,
            feedback, recipe-submission, or similar forms. This can include
            your name, email address, message, recipe information, device
            details, attachments, and text entered into Brixley or another
            AI-assisted feature.
          </p>

          <h2>Accounts and information stored on your device</h2>
          <p>
            SlushIQ does not require a user account and does not maintain
            personal user profiles on its own servers. Saved recipes,
            favorites, custom ingredients, app preferences, and similar app
            data are generally stored locally on your device. This information
            may be backed up or restored through Apple iCloud or Android backup
            services when those services are enabled on your device.
          </p>

          <h2>App and usage information</h2>
          <p>
            SlushIQ may receive limited app-interaction and diagnostic
            information, such as device model, operating-system version, app
            version, referral-source selections, anonymous feature usage, and
            crash or performance data. This information is used to operate the
            app, understand usage, diagnose problems, and improve reliability.
          </p>

          <h2>Brixley and AI features</h2>
          <p>
            Text and ingredient information you submit to Brixley may be sent
            to the OpenAI API to generate a response. SlushIQ does not
            intentionally send your saved recipe library, payment information,
            advertising identifier, or account information to OpenAI. Do not
            submit passwords, payment information, health information, or
            other sensitive personal data. AI responses may be inaccurate and
            should be reviewed before use.
          </p>

          <h2>Recipes and downloaded content</h2>
          <p>
            The app may contact SlushIQ services to retrieve recipes,
            categories, images, configuration, and other content. Recipes or
            preferences you create remain on your device unless a feature
            clearly tells you otherwise.
          </p>

          <h2>Age-related features</h2>
          <p>
            On Android, SlushIQ may use Google Play Age Signals in regions
            where Google provides them or where age-related handling is
            required. Signals may include an age range, verification,
            supervision or approval status, and a Play-generated install ID.
            SlushIQ uses these signals only to provide age-appropriate access
            to alcohol-related features—not for advertising, tracking,
            analytics, or personalization.
          </p>

          <h2>Service providers</h2>
          <p>
            We use service providers to operate features such as app
            distribution, AI responses, diagnostics, analytics, hosting,
            backups, email, and form processing. These providers may include
            Apple, Google Play, Google Firebase, OpenAI, Formspree, and
            website-hosting providers. They process information under their
            own terms and privacy policies.
          </p>

          <h2>Advertising and information we do not seek</h2>
          <p>
            SlushIQ does not display advertisements, perform ad targeting, use
            advertising identifiers for tracking, or sell personal
            information. We do not intentionally collect payment-card
            information, precise location, contacts, photos, or physical
            addresses through the app.
          </p>

          <h2>How information is used</h2>
          <ul>
            <li>Provide and maintain SlushIQ features</li>
            <li>Respond to support, feedback, and data requests</li>
            <li>Provide AI-assisted help through Brixley</li>
            <li>Understand app performance and feature usage</li>
            <li>Diagnose crashes and technical problems</li>
            <li>Provide age-appropriate access where required</li>
            <li>Prevent abuse, improve security, and meet legal obligations</li>
          </ul>

          <h2>Retention and your choices</h2>
          <p>
            Information is kept only as long as reasonably needed for the
            purpose for which it was collected, operational requirements,
            dispute resolution, or legal obligations. Support correspondence
            may be retained as needed to respond or maintain appropriate
            records. Apple, Google, and other providers retain diagnostics
            according to their policies. Locally stored recipes, favorites,
            ingredients, and preferences remain until you delete them or remove
            them through app or device settings.
          </p>
          <p>
            You can limit the information you submit, manage device
            permissions, and use platform privacy controls. Because SlushIQ
            does not maintain user accounts, requests concerning information
            you voluntarily submitted should identify the relevant
            correspondence so we can locate it.
          </p>

          <h2>Children and alcohol-related features</h2>
          <p>
            SlushIQ is not directed to children under 13. Alcohol-related
            features are intended only for adults of legal drinking age in
            their location and may be limited using applicable platform age
            signals.
          </p>

          <h2>Security and policy changes</h2>
          <p>
            No storage or transmission system is completely secure. We use
            reasonable safeguards appropriate to the information involved.
            This policy may be updated as SlushIQ changes; the effective date
            will be revised when updates are published.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions and deletion requests can be submitted through
            the <a href="/support">SlushIQ support page</a> or emailed to{" "}
            <a href="mailto:slushiqapp@gmail.com">slushiqapp@gmail.com</a>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
