import Bull, { Job, Queue } from 'bull';

export abstract class BaseWorker {
  abstract name: string;
  abstract queue: string;
  abstract concurrency: number;

  // bullQueue must be initialized in the derived class constructor
  protected bullQueue!: Queue;

  // No constructor in base class to avoid accessing abstract properties

  abstract process(job: Job): Promise<void>;

  async start() {
    this.bullQueue.process(this.concurrency, this.process.bind(this));
    console.log(`[Worker] ${this.name} started on queue ${this.queue}`);
  }

  async stop() {
    await this.bullQueue.close();
    console.log(`[Worker] ${this.name} stopped`);
  }

  async addJob(queueName: string, data: any, opts?: any) {
    await this.bullQueue.add(queueName, data, opts);
  }
} 