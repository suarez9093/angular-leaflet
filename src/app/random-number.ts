export interface RandomNumber {
  jsonrpc: string;
  result: {
    random: {
      data: Array<[]>;
      completionTime: string;
    };
    bitsUsed: number;
    bitsLeft: number;
    requestsLeft: number;
    advisoryDelay: number;
  };
  id: number;
}
