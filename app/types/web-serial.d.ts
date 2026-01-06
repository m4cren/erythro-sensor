/* Web Serial API minimal typings */

interface Navigator {
  serial: Serial;
}

interface Serial {
  requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>;
}

interface SerialPortRequestOptions {
  filters?: Array<{
    usbVendorId?: number;
    usbProductId?: number;
  }>;
}

interface SerialPort {
  open(options: SerialOptions): Promise<void>;
  readable: ReadableStream<Uint8Array> | null;
  writable: WritableStream<Uint8Array> | null;

  close(): Promise<void>;
  getInfo(): { usbVendorId?: number; usbProductId?: number };
}

interface SerialOptions {
  baudRate: number;
}
