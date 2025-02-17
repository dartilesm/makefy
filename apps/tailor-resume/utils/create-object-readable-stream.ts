export function createObjectReadableStream<T extends Record<string, any>>(
  mockData: T,
) {
  const encoder = new TextEncoder();
  const keys = Object.keys(mockData);

  // Helper function to generate random delay between min and max ms
  function getRandomDelay(min: number = 200, max: number = 500): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const chunks: { data: string; delay: number }[] = [];

  // Add opening brace
  chunks.push({
    data: "{",
    delay: getRandomDelay(),
  });

  // Add each key-value pair
  keys.forEach((key, index) => {
    // Add key
    chunks.push({
      data: `${index === 0 ? "" : ","}"${key}":`,
      delay: getRandomDelay(),
    });

    // Add value
    chunks.push({
      data: JSON.stringify(mockData[key]),
      delay: getRandomDelay(),
    });
  });

  // Add closing brace
  chunks.push({
    data: "}",
    delay: getRandomDelay(100, 300),
  });

  return new ReadableStream({
    async start(controller) {
      // Initial delay
      await new Promise((resolve) =>
        setTimeout(resolve, getRandomDelay(400, 600)),
      );

      for (const chunk of chunks) {
        await new Promise((resolve) => setTimeout(resolve, chunk.delay));
        controller.enqueue(encoder.encode(chunk.data));
      }
      controller.close();
    },
  });
}
