import { Log, LoggerTransport } from 'platform'
import { mkdirSync, existsSync } from 'fs'

export class FileTransport implements LoggerTransport {
  private file: any
  private writer: any

  constructor(private folder: string, private filename: string) {
    // Ensure the directory exists
    if (!existsSync(this.folder)) {
      mkdirSync(this.folder, { recursive: true }) // Create the folder if it doesn't exist
    }

    // Open the file in append mode
    this.file = Bun.file(`${this.folder}/${this.filename}`) 
    this.writer = this.file.writer({ append: true }) // Ensure we append to the file
  }

  // Handles logging by writing log data directly to the file
  async onLog(log: Log) {
    const json = JSON.stringify(log, null, 2) + ',\n'; // Convert log object to JSON with a newline
    try {
      await this.writer.write(json); // Write the log immediately
    } catch (error) {
      console.error(`Failed to write log to file ${this.filename}:`, error);
    }
  }

  // Cleanly closes the writer when done
  async close() {
    await this.writer.close(); // Close the writer
  }
}
