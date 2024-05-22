import { useState, useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  useEffect(() => {
    if (prompt) {
      setLoading(true);
      query({ "inputs": prompt })
        .then((response) => {
          const imageUrl = URL.createObjectURL(response);
          console.log(response,image);
          setImage(imageUrl);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [prompt]);

  return (
    <>
      <div className="bg-gray-200">
        <div className="container h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4 font-sans font-bold border-teal-400 dark:text-gray-200">
              Search Image
            </h1>
            <input
              type="text"
              className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
              placeholder="Search anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.toLowerCase())}
            />
            {loading && <div>Loading...</div>}
            {image && (
              <div className="flex justify-center mt-4">
                <img src={image} alt="Generated" className="h-[300px] w-[300px]" />
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
