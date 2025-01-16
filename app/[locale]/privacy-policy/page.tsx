const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
        Privacy Policy
      </h1>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-lg text-gray-700 dark:text-white mb-4">
          We collect two types of information from users:{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            Personal Information
          </strong>{" "}
          and{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            Non-Personal Information
          </strong>
          .
        </p>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h3>
          <p className="text-lg text-gray-700 dark:text-white mb-4">
            When you use our website, you may provide us with personal
            information, including but not limited to:
          </p>
          <ul className="list-disc list-inside pl-6 space-y-2 text-lg text-gray-700 dark:text-white">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Payment information (for transactions)</li>
            <li>IP address</li>
            <li>Browsing behavior</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Non-Personal Information
          </h3>
          <p className="text-lg text-gray-700 dark:text-white mb-4">
            We may automatically collect non-personally identifiable information
            such as:
          </p>
          <ul className="list-disc list-inside pl-6 space-y-2 text-lg text-gray-700 dark:text-white">
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Referring URLs</li>
            <li>Pages visited</li>
            <li>Time spent on the website</li>
            <li>Geolocation (IP address-based)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-lg text-gray-700 dark:text-white mb-4">
          We use the collected information for various purposes, including:
        </p>
        <ul className="list-disc list-inside pl-6 space-y-2 text-lg text-gray-700 dark:text-white">
          <li>
            To improve, personalize, and optimize our website and services
          </li>
          <li>
            To communicate with you, including sending transactional emails or
            newsletters
          </li>
          <li>To process your orders or requests</li>
          <li>
            To analyze trends and user behavior to enhance the user experience
          </li>
          <li>To comply with legal obligations or protect our rights</li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          3. Cookies and Tracking Technologies
        </h2>
        <p className="text-lg text-gray-700 dark:text-white mb-4">
          Our website uses{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            cookies
          </strong>{" "}
          and other tracking technologies to enhance user experience. Cookies
          are small text files stored on your device that help us track and
          analyze user behavior.
        </p>
        <p className="text-lg text-gray-700 dark:text-white mb-4">
          You can control the use of cookies through your browser settings. If
          you choose to disable cookies, some features of our website may not
          function properly.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Third-Party Cookies
        </h3>
        <p className="text-lg text-gray-700 dark:text-white">
          We may allow third-party services (e.g., analytics, advertising) to
          use cookies or similar technologies to collect information about your
          activities on our site. These third parties may use the data for
          tracking and serving targeted advertisements.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          4. Sharing Your Information
        </h2>
        <p className="text-lg text-gray-700 dark:text-white mb-4">
          We will never sell or rent your personal information to third parties.
          However, we may share your information in the following circumstances:
        </p>
        <ul className="list-disc list-inside pl-6 space-y-2 text-lg text-gray-700 dark:text-white">
          <li>
            With service providers, vendors, or contractors that help us operate
            our website or services
          </li>
          <li>
            With legal authorities when required by law or to protect our rights
            and interests
          </li>
          <li>
            In case of a business transfer, merger, or acquisition, your
            information may be transferred as part of the deal
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          5. Data Retention
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          We retain your personal data only for as long as necessary to fulfill
          the purposes for which it was collected or as required by law. Once
          the data is no longer needed, it will be securely deleted or
          anonymized.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          6. Your Data Protection Rights
        </h2>
        <p className="text-lg text-gray-700 dark:text-white mb-4">
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <ul className="list-disc list-inside pl-6 space-y-2 text-lg text-gray-700 dark:text-white">
          <li>
            <strong>Right to Access:</strong> You can request access to the
            personal information we hold about you.
          </li>
          <li>
            <strong>Right to Rectification:</strong> You can request corrections
            to any inaccurate or incomplete data.
          </li>
          <li>
            <strong>Right to Erasure:</strong> You can request deletion of your
            personal data (also known as the "right to be forgotten").
          </li>
          <li>
            <strong>Right to Restriction:</strong> You can request that we limit
            the processing of your personal data in certain cases.
          </li>
          <li>
            <strong>Right to Object:</strong> You can object to the processing
            of your personal data.
          </li>
          <li>
            <strong>Right to Portability:</strong> You can request a copy of
            your personal data in a structured, commonly used, and
            machine-readable format.
          </li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-white">
          To exercise these rights, please contact us using the information
          provided below.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          7. Data Security
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          We take reasonable precautions to protect your personal data from
          unauthorized access, loss, misuse, or disclosure. However, no data
          transmission over the internet or electronic storage method is 100%
          secure, so we cannot guarantee absolute security.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          8. Children’s Privacy
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          Our website is not intended for children under the age of 13. We do
          not knowingly collect or solicit personal information from anyone
          under the age of 13. If we learn that we have collected personal
          information from a child under 13, we will take steps to delete that
          information.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          9. Third-Party Links
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of those websites.
          Please review the privacy policies of third-party websites before
          submitting any personal information.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white border-b-2 pb-3 mb-4">
          10. Changes to This Privacy Policy
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          We may update this Privacy Policy from time to time. When we do, we
          will post the updated version on this page and update the "Effective
          Date" at the top of the page. We encourage you to review this Privacy
          Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          11. Contact Us
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us at:
        </p>
        <p className="text-lg text-gray-700 dark:text-white">
          <strong>Email:</strong> [Your Contact Email] <br />
          <strong>Address:</strong> [Your Company Address] <br />
          <strong>Phone Number:</strong> [Your Phone Number]
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
