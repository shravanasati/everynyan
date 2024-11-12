interface OTPEmailProps {
  name: string;
  otp: string;
}

export function OTPEmailTemplate({ name, otp }: OTPEmailProps) {
  const logoURL = "https://i.imgur.com/FKuzonG.png";
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <table
        cellPadding="0"
        cellSpacing="0"
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <tr>
          <td
            style={{
              padding: "40px 20px",
              textAlign: "center",
              backgroundColor: "#FFD1DC",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoURL}
              alt="Everynyan Logo"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: "40px 20px" }}>
            <h1
              style={{
                color: "#333333",
                fontSize: "24px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Hi {name},
            </h1>
            <p
              style={{
                color: "#666666",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Welcome to Everynyan! Here&apos;s your one-time password (OTP) to
              complete your login:
            </p>
            <div
              style={{
                backgroundColor: "#FFD1DC",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                margin: "0 auto",
                maxWidth: "200px",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#333333",
                  letterSpacing: "4px",
                }}
              >
                {otp}
              </span>
            </div>
            <p
              style={{
                color: "#666666",
                fontSize: "14px",
                lineHeight: "1.5",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              This code will expire in 10 minutes. If you didn&apos;t request
              this OTP, please ignore this email.
            </p>
          </td>
        </tr>
        <tr>
          <td
            style={{
              backgroundColor: "#FFD1DC",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#666666", fontSize: "14px", margin: "0" }}>
              &copy; {new Date().getFullYear()} Everynyan. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
}
