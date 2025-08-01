import { useEffect, useState } from 'react';

export default function StreamTest() {
  const [data, setData] = useState('');

  async function fetchData() {
    const response = await fetch('http://localhost:3000/stream');

    if (!response.body) {
      console.error('ReadableStream not supported!');
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream ended.');
        break;
      }
      const chunk = decoder.decode(value);
      console.log(`Received chunk: ${chunk}`);
      setData((prev) => prev + chunk);
    }
  }

  useEffect(() => {
    fetchData();
    console.log('StreamTest mounted');
  }, []);

  return (
    <div>
      <h2>Streaming data:</h2>
      <pre>{data}</pre>
    </div>
  );
}