export interface IReportService{
    generateAndSend(email: string, n: any): void;
}