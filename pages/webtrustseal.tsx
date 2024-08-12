// components/Webtrustseal.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Webtrustseal = () => {
  const router = useRouter();
  const [sealData, setSealData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [logoSrc, setLogoSrc] = useState("");
  const [sealType, setSealType] = useState("");
  const [attachmentURL, setAttachmentURL] = useState<string>("");
  const handleDownload = () => {
    window.location.href = `/api/download?attachmentId=9e7f2b2c-a673-4fb0-b512-d305a80a4144`;
  };
  useEffect(() => {
    if (!router.isReady) return;

    const { sealid } = router.query;
    const referer = document.referrer;

    if (sealid) {
      fetchSealData(sealid as string, referer);
    } else {
      setError(
        "An issue has occurred and this seal is temporarily unavailable. If you have any questions, please contact the site owner where this link is contained."
      );
      setLoading(false);
    }
  }, [router.isReady, router.query]);

  const fetchSealData = async (sealid: string, referer?: string) => {
    try {
      const response = await fetch(`/api/getSealData?sealid=${sealid}`, {
        headers: {
          "X-Requested-Referer": "https://cpacanada.ca",
        },
      });

      if (response.status === 404) {
        setError(
          "An issue has occurred and this seal is temporarily unavailable. If you have any questions, please contact the site owner where this link is contained."
        );
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          console.log(data);
          setSealData(data.sealData);
          setAttachmentURL(data.attachmentURL);
          setLogoSrc(data.logoSrc);
          setSealType(data.sealType);
        }
        setLoading(false);
      } else {
        const errorText = await response.text();

        setError("An error occurred while fetching the seal data.");
        setLoading(false);
      }
    } catch (err) {
      setError("Not a valid domain for this seal.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="h-screen w-full bg-white">
        <div className="mx-auto max-w-2xl border border-gray-300 bg-white p-4 text-red-600">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className=" w-full bg-white">
      <div className="mx-auto max-w-2xl border border-gray-300 bg-white p-4">
        <header style={{ marginLeft: "15px", textAlign: "center" }}>
          {logoSrc && (
            <img
              src={logoSrc}
              alt={sealType}
              width={150}
              height={150}
              style={{ display: "block", margin: "0 auto" }}
            />
          )}
        </header>

        <h1 className="mb-4 ml-4 text-xl font-bold">Certification Authority</h1>

        <article className="ml-4">
          <p>
            You have arrived here from a SysTrust<sup>SM/TM</sup> or WebTrust
            <sup>SM/TM</sup> certified site. The applicable SysTrust or WebTrust
            Seal of assurance symbolizes that this site has been examined by an
            independent accountant. Further, the Seal represents the
            practitioner&rsquo;s report (see below) on management&rsquo;s
            assertion(s) that the entity&rsquo;s business being relied upon is
            in conformity with the applicable Trust Services Principle(s) and
            Criteria.
          </p>
          <p>
            The Trust Services Principles and Criteria is an international set
            of principles and criteria for systems and electronic commerce
            developed and managed jointly by the American Institute of Certified
            Public Accountants and the Canadian Institute of Chartered
            Accountants. By demonstrating compliance with Trust Services
            criteria through an examination by an independent practitioner,
            entities earn the right to display the seal of assurance.
          </p>
          <p>
            The Seal of assurance combines high standards for identified
            activities with the requirement for an independent
            verification/audit. Together they build trust and confidence among
            consumers and businesses conducting business over the Internet.
          </p>
          <p>
            The entity has earned the right to display the Seal of assurance
            with respect to the Trust Service Principle(s) of:
          </p>

          <h2 className="mb-2 text-lg font-semibold">
            Certification Authorities
          </h2>
          <p>
            The WebTrust Seal of assurance for Certification Authorities (CA)
            symbolizes to potential relying parties that a qualified
            practitioner has evaluated the CA&rsquo;s business practices and
            controls to determine whether they are in conformity with the
            AICPA/CICA WebTrust for Certification Authorities Principles and
            Criteria. An unqualified or a qualified opinion from the
            practitioner indicates that such principles are being followed in
            conformity with the WebTrust for Certification Authorities Criteria.
            These principles and criteria reflect fundamental standards for the
            establishment and on-going operation of a Certification Authority
            organization or function.
          </p>

          <hr className="my-4" />

          <p>
            <a
              href={attachmentURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Click here to view the Audit Report and Management&rsquo;s
              Assertions
            </a>
          </p>
        </article>

        <footer className="ml-4 mt-4">
          <hr className="my-4" />
          <p className="mb-4">
            <a
              href="http://www.webtrust.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              WebTrust Program
            </a>
          </p>
          <p>
            <a
              href="https://www.cpacanada.ca/en/business-and-accounting-resources/audit-and-assurance/overview-of-webtrust-services/principles-and-criteria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Certification Authority Principles / Criteria
            </a>
          </p>
          <button onClick={handleDownload}>Download Report</button>;
        </footer>
      </div>
    </main>
  );
};

export default Webtrustseal;
