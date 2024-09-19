import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="space-y-4 text-sm">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Use of the Service
            </h2>
            <p>
              You agree to use the service for lawful purposes only and in a way
              that does not infringe the rights of, restrict or inhibit anyone
              else's use and enjoyment of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Intellectual Property
            </h2>
            <p>
              The content, organization, graphics, design, compilation, magnetic
              translation, digital conversion and other matters related to the
              Site are protected under applicable copyrights, trademarks and
              other proprietary rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Disclaimer of Warranties
            </h2>
            <p>
              The service and its content are provided on an "as is" and "as
              available" basis without any warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall we be liable for any direct, indirect,
              incidental, consequential, special or exemplary damages arising
              from or in connection with your use of the service.
            </p>
          </section>
        </div>

        <Button asChild className="mt-8">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
