import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiry, setExpiry] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [statsCode, setStatsCode] = useState("");
  const [stats, setStats] = useState(null);

  const generateUrl = async () => {
    try {
      setError("");

      const response = await axios.post(
        "http://localhost:8000/api/shorten/",
        {
          url,
          alias,
          expiry_days: expiry,
        }
      );

      setShortUrl(response.data.short_url);
    } catch (err) {
  console.log(err);

  setError(
    JSON.stringify(err.response?.data || err.message)
  );
}
  };

  const getStats = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/stats/${statsCode}/`
    );

    setStats(response.data);
  } catch (err) {
    alert("Alias not found");
    setStats(null);
  }
};

  const copyLink = () => {

  navigator.clipboard.writeText(shortUrl);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          URL Shortener
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="text"
            placeholder="Custom Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="number"
            placeholder="Expiry Days"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button
            onClick={generateUrl}
            className="w-full p-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
          >
            Generate Short URL
          </button>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6">

  <h2 className="text-white text-xl font-semibold mb-4">
    Analytics
  </h2>

  <input
    type="text"
    placeholder="Enter Alias (e.g. github)"
    value={statsCode}
    onChange={(e) => setStatsCode(e.target.value)}
    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
  />

  <button
    onClick={getStats}
    className="w-full mt-4 p-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
  >
    Get Analytics
  </button>

</div>

        {error && (
          <div className="mt-4 text-red-400 text-center">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-8 bg-white/10 p-4 rounded-xl">

            <p className="text-gray-300 mb-2">
              Generated URL
            </p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={copyLink}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl"
            >
              Copy Link
            </button>

            {copied && (
  <p className="text-green-400 text-center mt-3 font-semibold">
    ✓ Copied to clipboard
  </p>
)}

<p className="text-center text-gray-300 mt-4 mb-3">
  Scan QR Code
</p>

<div className="flex justify-center mt-2">
  <QRCodeCanvas
    value={shortUrl}
    size={180}
  />
  </div>

          </div>
        )}

        {stats && (
  <div className="mt-8 bg-white/10 p-5 rounded-xl border border-white/20">

    <h3 className="text-white text-xl font-semibold mb-4">
      Analytics Result
    </h3>

    <div className="space-y-2 text-gray-300">

      <p>
        <span className="font-semibold text-white">
          Alias:
        </span>{" "}
        {stats.short_code}
      </p>

      <p>
        <span className="font-semibold text-white">
          Clicks:
        </span>{" "}
        {stats.clicks}
      </p>

      <p>
        <span className="font-semibold text-white">
          Created:
        </span>{" "}
        {new Date(stats.created_at).toLocaleString()}
      </p>

      <p>
        <span className="font-semibold text-white">
          Expires:
        </span>{" "}
        {
  stats.expires_at
    ? new Date(stats.expires_at).toLocaleString()
    : "Never"
}
      </p>

    </div>

  </div>
)}

      </div>
    </div>
  );
}

export default App;