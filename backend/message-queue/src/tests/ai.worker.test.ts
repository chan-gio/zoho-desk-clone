import { aiQueue } from '../workers/ai.worker';
import redis from '../config/redis';

async function testAIWorker() {
  const resultKey = 'test:ai:result:' + Date.now();
  const prompt = 'Ticket: Khách hàng báo không đăng nhập được tài khoản.';

  // Thêm job vào queue
  await aiQueue.add('classify', {
    prompt,
    model: 'mistral', // <-- chỉ để 'mistral'
    resultKey
  });
  console.log('Đã enqueue job AI, chờ kết quả...');

  // Poll Redis để lấy kết quả (timeout 30s)
  let result: string | null = null;
  for (let i = 0; i < 300; i++) {
    result = await redis.get(resultKey);
    if (result) break;
    await new Promise(r => setTimeout(r, 10000));
  }

  if (result) {
    console.log('Kết quả AI trả về:', JSON.parse(result));
  } else {
    console.error('Không nhận được kết quả từ AI worker trong 30s.');
  }
  process.exit(0);
}

testAIWorker(); 