const { searchBookWithGPT } = require('./gptBookSearch');

async function runTest() {
  const title = "הארי פוטר ואבן החכמים";

  console.log(`🔎 Searching for book: ${title}`);
  const result = await searchBookWithGPT(title);

  if (result) {
    console.log("\n✅ Parsed book metadata:");
    console.log(result);
  } else {
    console.log("❌ No result returned.");
  }
}

runTest();

