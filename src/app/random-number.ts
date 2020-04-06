export interface RandomNumber {
  jsonrpc: string;
  result: {
    random: {
      data: number;
      completionTime: string;
    };
    bitsUsed: number;
    bitsLeft: number;
    requestsLeft: number;
    advisoryDelay: number;
  };
  id: number;
}
